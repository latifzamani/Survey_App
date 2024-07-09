<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Resources\surveyResource;
use App\Models\Survey;
use App\Models\surveyAnswer;
use App\Models\surveyQuestion;
use App\Models\surveyQuestionAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Enum;

class surveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return surveyResource::collection(Survey::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(6));
    }

    /**
     * Store a newly created resource in storage.
     */


    private function saveImage($image)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('Invalid Image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);
            if ($image === false) {
                throw new \Exception('base64_decode_failed');
            }
        } else {
            throw new \Exception('did not match data URL with image data');
        }


        $dir = 'image/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

            return $relativePath;

    }

    public function createQuestion($data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:Surveys,id'
        ]);

        return surveyQuestion::create($validator->validated());
    }

    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();
        //   return $data;
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        $survey = Survey::create($data);
        //create new Question
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action');
        }
        return new surveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     */

    private function updateQuestion(surveyQuestion $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'id' => 'exists:survey_questions,id',
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'data' => 'present',
        ]);

        return $question->update($validator->validated());
    }
    public function update(Request $request, Survey $survey)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $data = $request->validate([
            'title' => 'required|string|max:1000',
            'image' => 'nullable|string',
            'user_id' => 'exists:users,id',
            'status' => 'required|boolean',
            'description' => 'nullable|string',
            'expire_date' => 'nullable|date|after:today',
            'questions' => 'array',
        ]);
        //image
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if ($survey->image) {
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }
        //update survey in the database
        $survey->update($data);

        $existingIds = $survey->questions()->pluck('id')->toArray();
        $newIds = Arr::pluck($data['questions'], 'id');
        $toDelete = array_diff($existingIds, $newIds);
        $toAdd = array_diff($newIds, $existingIds);

        surveyQuestion::destroy($toDelete);

        //create new questions
        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        //update existing questions
        $questionsMap = collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionsMap[$question->id])) {
                $this->updateQuestion($question, $questionsMap[$question->id]);
            }
        }
        return new surveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Survey $survey)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $survey->delete();
        if ($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response('', 204);
    }


    public function getBySlug(Survey $survey)
    {
       if(!$survey->status){
        return response('',404);
       }
       $currentDate=new \DateTime();
       $expireDate=new \DateTime($survey->expire_date);
       if($currentDate > $expireDate){
        return response('',404);
       }
       return new surveyResource($survey);
    }

    public function storeAnwser(Request $request,Survey $survey)
    {
            $validated=$request->validate([
               'answers'=>'required|array'
            ]);

            $surveyAnswer=surveyAnswer::create([
                'survey_id'=>$survey->id,
                'start_date'=>date('Y-m-d H:i:s'),
                'end_date'=>date('Y-m-d H:i:s'),
            ]);
            foreach($validated['answers'] as $questionId=>$answer){
             $question=surveyQuestion::where(['id'=>$questionId,'survey_id'=>$survey->id])->get();
             if(!$question){
                return response("Invalid Question ID: \"$questionId\" ",400);
             };

             $data=[
                'survey_question_id'=>$questionId,
                'survey_answer_id'=>$surveyAnswer->id,
                'answer'=>is_array($answer) ?json_encode($answer):$answer,

             ];

             $questionAnswer=surveyQuestionAnswer::create($data);
            };
            return response("",201);
    }
}
