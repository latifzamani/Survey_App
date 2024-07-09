import React, { useEffect, useState } from 'react'
import PageComponent from '../components/pageComponent'
import { useStateContext } from '../context/contextProvider'
import SurveyListItem from '../components/surveyListItem';
import TButton from '../components/core/tButton';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import AxiosClient from '../axios';
import PaginationLinks from '../components/paginationLinks';

export default function Survey() {
  const {showToast}=useStateContext();
  //  const {surveys}=useStateContext();
  const [surveys,setSurveys]=useState([]);
  const [loading,setLoading]=useState(false);
  const [meta,setMeta]=useState({});
  //  console.log(surveys);


   const onDeleteClick=(id)=>{
    // console.log('On Delete Click');
    if(window.confirm('Are you sure you want to delete the survey ?')){
      AxiosClient.delete(`/survey/${id}`)
      .then(()=>{
        getSurveys();
        showToast('The survey deleted successfully.');
      })
    }
   }

   const getSurveys=(url)=>{
    url=url || '/survey'
    setLoading(true);
    AxiosClient.get(url).then(({data})=>{
      setSurveys(data.data);
      setMeta(data.meta);
      setLoading(false);
    })
   }
   useEffect(()=>{
    getSurveys();
   },[])

   const onPageClick=(link)=>{
     getSurveys(link.url);
   }

  return (
    <PageComponent title='Survey' button={
      (
        <TButton color='rgb(49,175,113)' to='/survey/create'>
          <PlusCircleIcon className=' w-6 mr-3 h-6 text-white'/>
          Create Survey
        </TButton>
      )
    }>
      {loading &&
      <div className='text-center text-lg'>
       <h1>Loading....</h1>
       <small>Please wait...</small>
      </div>}
      {!loading &&
      (<div>
        {
          surveys.length===0 && (
            <div className=' py-8 text-center text-gray-700'>You don't have any survey.</div>
          )
        }
      <div className=' grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>


        {
          surveys.map((survey)=>(
            <SurveyListItem survey={survey}
            key={survey.id} onDeleteClick={onDeleteClick}/>
            ))
          }
        </div>
        </div>)}
          {

            surveys.length >0 && (<div className='mt-2'><PaginationLinks meta={meta} onPageClick={onPageClick}/>
          </div>)
          }

    </PageComponent>
  )
}
