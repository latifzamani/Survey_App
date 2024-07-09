import React, { useEffect, useState } from 'react'
import PageComponent from '../components/pageComponent'
import AxiosClient from '../axios';
import DashboardCard from '../components/dashboardCard';
import TButton from '../components/core/tButton';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
   const [loading,setLoading]=useState(true);
   const [data,setData]=useState({});

   useEffect(()=>{
    setLoading(true);
    AxiosClient.get('/dashboard')
    .then((res)=>{
      setLoading(false);
      setData(res.data);
      console.log(res.data);
      return res;
    })
    .catch((error)=>{
      setLoading(false);
      return error;
    });
   },[]);
  return (
    <PageComponent title='Dashboard'>
      {console.log(data.latestAnswers)}
       {loading && <div className=' flex justify-center'>Loading...</div>}
        {!loading && (
          <div
          className=' h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700'
          >
            <DashboardCard
             title="Total Survey"
             className="order-1 lg:order-2"
             style={{animationDelay:'0.1s'}}
              >
                <div className=' text-8xl pb-4 font-semibold flex-1 flex items-center justify-center'>
                  {data.totalSurveys}
                </div>
            </DashboardCard>
            <DashboardCard
             title="Total Answers"
             className="order-2 lg:order-4"
             style={{animationDelay:'0.2s'}}
             >
                <div className=' text-8xl pb-4 font-semibold flex-1 flex items-center justify-center'>
                  {data.totalAnswers}
                </div>
            </DashboardCard>
            <DashboardCard
             title="Latest Survey"
             className="order-3 lg:order-1 row-span-2 "
             style={{animationDelay:'0.3s'}}
             >
                 {data.latestSurvey && (
                  <div>
                    <img src={data.latestSurvey.image_url}
                    className=' w-[240px] mx-auto border rounded-md m-3' />
                    <h3 className=' font-bold text-xl mb-3'>
                      {data.latestSurvey.title}
                    </h3>
                    <div className=' flex justify-between text-sm mb-1'>
                      <div>Create Date:</div>
                      <div>{data.latestSurvey.created_at}</div>
                    </div>
                    <div className=' flex justify-between text-sm mb-1'>
                      <div>Expire Date:</div>
                      <div>{data.latestSurvey.expire_date}</div>
                    </div>
                    <div className=' flex justify-between text-sm mb-1'>
                      <div>Status:</div>
                      <div>{data.latestSurvey.status ? 'Active' : 'Draft'}</div>
                    </div>
                    <div className=' flex justify-between text-sm mb-1'>
                      <div>Questions:</div>
                      <div>{data.latestSurvey.questions}</div>
                    </div>
                    <div className=' flex justify-between text-sm mb-1'>
                      <div>Answers:</div>
                      <div>{data.latestSurvey.answers}</div>
                    </div>
                    <div className=' flex justify-between'>
                      <TButton to={`/survey/${data.latestSurvey.id}`} link>
                        <PencilIcon className='w-5 h-5 mr-2 text-green-600' />
                        Edit Survey
                      </TButton>

                      <TButton link>
                        <EyeIcon className=' w-5 h-5 mr-2 text-sky-500'/>
                        View Answers
                      </TButton>
                    </div>

                  </div>
                 )}
                 {!data.latestSurvey && (
                  <div className=' text-gray-600 text-center py-16'>
                    You don't have surveys yet
                  </div>
                 )}
            </DashboardCard>
            <DashboardCard
             title="Latest Answers"
             className="order-4 lg:order-3 row-span-2"
             style={{animationDelay:'0.3s'}}
             >
                {data.latestAnswers.length && (
                  <div className='text-left'>
                    {data.latestAnswers.map((answer)=>(
                      <a href='#' key={answer.id} className='block p-2 hover:bg-gray-400'>
                         <div className=' font-semibold'>
                          {answer.survey.title}
                         </div>
                         <small>
                          Answer Made at:
                          <i className=' font-semibold'>
                            {answer.end_date}
                          </i>
                         </small>
                      </a>
                    ))}
                  </div>
                )}
                {!data.latestAnswers.length && (
                  <div className='text-gray-600 text-center py-16'>
                    You don't have answer yet
                  </div>
                )}
            </DashboardCard>
          </div>
        )}
      </PageComponent>
  )
}
