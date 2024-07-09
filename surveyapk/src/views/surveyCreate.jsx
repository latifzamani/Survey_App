import React, { useEffect, useState } from 'react'
import PageComponent from '../components/pageComponent'
import { PhotoIcon } from '@heroicons/react/24/outline'
import TButton from '../components/core/tButton'
import AxiosClient from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyQuestions from '../components/surveyQuestions';
import { useStateContext } from '../context/contextProvider';
import { LinkIcon, TrashIcon } from '@heroicons/react/20/solid';


export default function SurveyCreate() {
  const {showToast}=useStateContext();
  const navigate=useNavigate();
  const [error,setError]=useState();
  const {id}=useParams();

  const [loading,setLoading]=useState(false);
  const [survey,setSurvey]=useState({
    title:'',
    slug:'',
    status:false,
    description:'',
    image:null,
    image_url:null,
    expire_date:'',
    questions:[],
  })

  const onImageChoose=(ev)=>{
    const file=ev.target.files[0];
    const reader=new FileReader();
    reader.onload=()=>{
      setSurvey({
        ...survey,
        image:file,
        image_url:reader.result
      });
      ev.target.value='';
    }
    reader.readAsDataURL(file);

  }
  const onSubmit=(ev)=>{
    ev.preventDefault();
    const payload={...survey};
    console.log(payload);

    if(payload.image){
      payload.image=payload.image_url;
    }
    delete payload.image_url;

    let result='';
    if(id){
      result= AxiosClient.put(`/survey/${id}`,payload)
    }else{
      result= AxiosClient.post('/survey',payload)

    }
    result.then((res)=>{
      // console.log(res);
      navigate('/survey');
      if(id){
        showToast('The survey updated Successfully.');
      }else{
        showToast('The survey created Successfully.');
      }
    }).catch((err)=>{
      if(err && err.response){
         setError(err.response.data.message);
      }
    })
  }

  function onQuestionUpdate(questions){
    setSurvey({
      ...survey,questions
    });
  }

  const onDelete=()=>{

  }

  useEffect(()=>{
    setLoading(true);
    if(id){
      AxiosClient.get(`/survey/${id}`)
      .then(({data})=>{
        // debugger;
        setSurvey(data.data);
        setLoading(false);
      })
    }else{
      setLoading(false);
    }
  },[])
  return (
    <div>
      <PageComponent title={!id ? 'Survey Creation':'Update Survey'}
          button={
            <div className=' flex gap-2'>
              <TButton color='green' href={`/survey/public/${survey.slug}`}>
                <h4 style={{color:'white',margin:'0 4px'}}>
                  <div className='flex gap-1'>

                  <LinkIcon className='text-white w-4 h-4'>
                  </LinkIcon>
                  public link
                  </div>

                </h4>
              </TButton>
              <TButton color='red' onClick={onDelete}>
                <TrashIcon className='h-4 w-4 mr-2 text-white'/>
                <h4 className='text-white'>
                  Delete
                  </h4>
              </TButton>
            </div>
          }

      >


        {/* <pre>{JSON.stringify(survey)}</pre> */}

        {loading && <div className=' justify-center text-center text-lg '>
          <h1>Loading...</h1>
          <small>please wait...</small>
        </div>
        }

        {!loading &&
        <form action='#' method='POST' onSubmit={onSubmit}>
          <div className=' shadow sm:overflow-hidden sm-rounded-md'>
            <div className=' space-y-6 bg-white px-4 py-5 sm:p-6'>
              {
                error && (
                  <div className='bg-red-500  text-slate-100 py-3 px-3'>
                    {error}
                  </div>
                )
              }
              {/* image */}
              <div>
                <label className=' block text-sm font-medium text-gray-700'>Photo</label>
                <div className=' mt-1 flex items-center'>
                  {
                    survey.image_url &&(
                      <img src={survey.image_url} className=' w-32 h-32 object-cover'/>
                    )
                  }
                  {
                    !survey.image_url &&(
                      <span className=' flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                        <PhotoIcon className=' w-8 h-8 text-blue-400'/>
                      </span>
                    )
                  }
                  <button type='button' className=' relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                    <input type='file' onChange={onImageChoose} className=' absolute left-0 right-0 top-0 bottom-0 opacity-0'/>
                    Change
                  </button>
                </div>
              </div>
              {/* Title */}
              <div className=' col-span-6 sm:col-span-3'>
                <label
                  htmlFor="title" className='block text-sm font-medium text-gray-700'
                > Survey Title</label>
                <input type='text' name='title' id='title' onChange={(ev)=>setSurvey({...survey,title:ev.target.value})} value={survey.title} placeholder='Survey Title' className='mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'/>
              </div>
              {/* Description */}
              <div className=' col-span-6 sm:col-span-3'>
                <label
                  htmlFor="description" className='block text-sm font-medium text-gray-700'
                > Desscrption</label>
                <textarea type='description' name='description' id='description' onChange={(ev)=>setSurvey({...survey,description:ev.target.value})} value={survey.description} placeholder='description' className='mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'/>
              </div>
              {/* Expire Date */}
              <div className=' col-span-6 sm:col-span-3'>
                <label
                  htmlFor="expire_date" className='block text-sm font-medium text-gray-700'
                > Expire Date</label>
                <input type='date' name='expire_date' id='expire_date' onChange={(ev)=>setSurvey({...survey,expire_date:ev.target.value})} value={survey.expire_date} placeholder='Expire Date' className='mt-1 block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'/>
              </div>
              {/* Active */}
              <div className=' flex flex-start '>
                <div className=' flex h-5 items-center'>
                  <input id='status' name='status' type='checkbox' checked={survey.status} onChange={(ev)=>setSurvey({...survey,status:ev.target.checked})} className='h-4 w-4 rounded border-gray-300 text-indigo-300 focus:ring-indigo-500'/>
                </div>
                <div className='ml-3 text-sm'>
                  <label className=' font-medium text-gray-700' htmlFor='comments'>Active</label>
                  <p className='text-gray-500'>
                    Whether to make survey publicaly available
                  </p>
                </div>
              </div>

                       {/* <pre>{JSON.stringify(survey.questions)}</pre> */}

              <SurveyQuestions questions={survey.questions} onQuestionUpdate={onQuestionUpdate}/>

              <div className=' bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <TButton color='green'><h1 style={{width:'4rem',color:'white',}}>Save</h1></TButton>
              </div>

            </div>
          </div>
        </form>
        }
      </PageComponent>
    </div>
  )
}
