import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/contextProvider';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';


export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) {

  const [model, setModel] = useState({ ...question });
  const { questionTypes } = useStateContext();

  useEffect(() => {
    questionChange(model);
  }, [model]);

  function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  function shouldHaveOptions(type=null){
    type=type || model.type;
    return ['select','radio','checkbox'].includes(model.type)
  }

  function onTypeChange(ev){
    const newModel={
      ...model,
      type:ev.target.value,

    }
    console.log(ev.target.value);
    if(!shouldHaveOptions(ev.target.value)&& shouldHaveOptions(ev.target.value) || ev.target.value ){
      if(!model.data.options){

        newModel.data={
          options:[
            {
              uuid:uuidv4(),text:''
            }
          ]
        }
      }
    }
    setModel(newModel)
    console.log(newModel);
  }

  function addOption(){
    model.data.options.push({
      uuid:uuidv4(),text:''
    })
    setModel({...model})
  }

  function deleteOption(op){
    model.data.options=model.data.options.filter(option=>option.uuid !== op.uuid)
    setModel({...model})
  }

  return (
    <div>
      <hr/>
      <div className=' flex justify-between mb-3 pt-4 border-t-2 border-gray-400'>
        <h4>{index + 1}.{model.question}</h4>
        <div className=' flex items-center'>
          <button onClick={()=>addQuestion(index+1)} type='button' className=' flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-green-600 hover:bg-green-700'>
            <PlusIcon className='w-4 text-white' />
            Add
          </button>
          <button onClick={() => deleteQuestion(question)} type='button' className=' flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500 hover:border-red-600'>
            <TrashIcon className='w-4 text-red-600' />
            Delete
          </button>
        </div>
      </div>
      <div className=' flex gap-3 justify-between mb-3'>
        {/* Question Text */}

        {/* <prev>{question}</prev> */}
        <div className='flex-1'>

        <label htmlFor='question' className='text-sm font-medium text-gray-600'>
          Question
        </label>
        <input value={model.question}
          onChange={(ev) => setModel({ ...model, question: ev.target.value })}
          type='text' name='question' id='question' className=' p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm' />
        </div>

      {/* Question Type */}
      <div>

        <label htmlFor='questionType' className=' block text-sm font-medium text-gray-600 w-40'>
          Question Type
        </label>
        <select
          id='questionType'
          name='questionType'
          value={model.type}
          onChange={onTypeChange}
          className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm'
        >
          {
            questionTypes.map((type) => (
              <option value={type} key={type} >
                {upperCaseFirst(type)}
              </option>
            ))
          }

        </select>

      </div>
        </div>
      {/* Description */}
      <div>
        <label
        htmlFor='questionDescription'
        className=' block text-sm font-medium text-gray-500'
        > Description</label>
        <textarea
         name='questionDescription' id='questionDescription'
         value={model.description}
         onChange={(ev)=>setModel({...model,description:ev.target.value})}
         className=' p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
         ></textarea>
      </div>

      {/* Options */}

      {/* {JSON.stringify(model)} */}
      <div className='mt-3'>
        {shouldHaveOptions() && <div>
          <h4 className=' text-sm font-semibold mb-1 flex justify-between items-center'>
            options
            <button onClick={addOption} type='button' className=' flex items-center text-xs py-1 px-2 rounded-sm text-white bg-green-600 hover:bg-green-700'>
              <PlusIcon className=' w-4 h-4 text-white'/>
              Add</button>
          </h4>
            {model.data.options?.length === 0 && (
              <div className=' text-xs text-gray-600 text-center py-3'>
                you don't have any options defined
              </div>
            )}
            {model.data.options.length >0 &&(
                <div>
                  {model.data.options.map((op,ind)=>(
                    <div className=' flex items-center mb-1'>
                      <span className=' w-6 text-sm'>{ind+1}.</span>
                      <input type='text' value={op.text} onInput={ev=>{op.text=ev.target.value; setModel({...model})}}
                      className=' w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-blue-500'/>
                      <button
                       onClick={ev=>deleteOption(op)}
                       type='button' className=' h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100'>
                        <TrashIcon className='w-5 h-5 text-red-600'/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>}
      </div>
      {
        model.type ==='select' && <div></div>
      }

    </div>
  )
}
