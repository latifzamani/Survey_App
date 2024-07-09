import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AxiosClient from '../axios';
import PublicQuestionView from '../components/publicQuestionView';

export default function SurveyPublicView() {
  const answers={};
  const [surveyFinished,setSurveyFinished]=useState(false);
  const [survey,setSurvey]=useState({});
  const [loading,setLoading]=useState(false);
  const {slug} =useParams();

  useEffect(()=>{
    setLoading(true);
    AxiosClient.get(`survey/getBySlug/${slug}`).then(({data})=>{
      setLoading(false);
      setSurvey(data.data);
    }).catch(()=>{
      setLoading(false);
    });
  },[]);

  function answerChanged(question,value){
     answers[question.id]=value;
     console.log(question,value);
  }
  function onSubmit(ev){
    ev.preventDefault();
    AxiosClient.post(`/survey/${survey.id}/answer`,{
      answers,
    }).then((response)=>{
      setSurveyFinished(true);
    })

    console.log(answers);
  }
  return (
    <div className=' bg-cyan-300 p-6'>
     {loading && <div className=' flex justify-center'>Loading...</div>}
     {!loading && (
      <form className=' container' onSubmit={ev =>onSubmit(ev)}>
        <div className=' flex flex-row '>
          <div className=' w-72 mr-4'>
            <img src={survey.image_url} className='border rounded-md'/>
          </div>

          <div className=' col-span-5'>
          <h1 className=' text-3xl mb-3'>{survey.title}</h1>
          <p className=' text-gray-500 text-sm'>{survey.expire_date}</p>
          <p className=' text-gray-500 text-sm'>{survey.description}</p>
          </div>
        </div>

         {surveyFinished && (
          <div className='py-8 px-6 bg-green-400 text-white w-[600px] mx-auto'>
            Thank you for participating in the survey
          </div>
         )}
         {!surveyFinished && (
        <div>
           {survey.questions?.map((question,index)=>(
            <PublicQuestionView
             key={question.id}
             question={question}
             answerChanged={val =>answerChanged(question,val)}
             index={index}/>
           ))}
        </div>
          )}


        <button
          type='submit'
          className=' w-36 mb-12 mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
          style={{marginLeft:'70%'}}
        >
          submit
        </button>
      </form>
     )}
     {
      console.log(survey)
     }
    </div>
  )
}
