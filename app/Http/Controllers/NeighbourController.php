<?php

namespace App\Http\Controllers;

use App\Models\Neighbour;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\New_;

class NeighbourController extends Controller
{
    public function index()
    {
       $neighbour=Neighbour::all();
       return response()->json($neighbour);
    }

    public function store(Request $request)
    {
        $neighbour=new Neighbour([
            'name'=>$request->input('name'),
            'lastname'=>$request->input('lastname'),
            'address'=>$request->input('address')
        ]);
        $neighbour->save();
        return response()->json('Created successfully');
    }
    public function edit()
    {

    }
    public function update(Request $request,$id)
    {
        $neighbour=Neighbour::find($id);
        $neighbour->update($request->all());

        return response()->json('Updated successfully');
    }
    public function delete($id)
    {
         $neighbour=Neighbour::find($id);
         $neighbour->delete();
         return response()->json('Deleted Successfully');
    }
}
