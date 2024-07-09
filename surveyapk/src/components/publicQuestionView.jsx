import React from 'react'

export default function PublicQuestionView({question,index,answerChanged}) {

  let selectedOptions=[];
  function onCheckboxChange(option,event){
     if(event.target.checked){
      selectedOptions.push(option.text)
     }else{
      selectedOptions=selectedOptions.filter(op=> op != option.text)
     }
     answerChanged(selectedOptions)
  }
  return (
    <div className=' bg-cyan-200  m-5 pl-2 pr-2 pt-1 rounded-md'>
      <fieldset className='mb-4'>
        <div>
          <legend className='mb-1'>
            {index +1}. {question.question}
          </legend>
          <p className=' text-gray-500 text-sm mb-4'>{question.description}</p>
        </div>
        <div className='  mb-3'>
          {question.type==='select' && (
             <select
             onChange={(ev)=>answerChanged(ev.target.value)}
             className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
             >
              <option value="">Please Select</option>
              {question.data.options.map((option)=>(
                <option key={option.uuid} value={option.text}>
                  {option.text}
                </option>
              ))}
             </select>
          )}
          {question.type==='radio' && (
             <div>
              {question.data.options.map((option,index)=>(
                <div key={option.uuid} className=' flex items-center'>
                  <input
                    id={option.uuid}
                    value={option.text}
                    onChange={(ev)=>answerChanged(ev.target.value)}
                    name={"question" + question.id}
                    type='radio' className='focus:ring-blue-500 h-4 w-4 text-blue-600  border-gray-300'/>
                    <label
                     htmlFor={option.uuid}
                     className='ml-3 block text-sm font-medium text-gray-700'
                    >
                     {option.text}
                    </label>
                </div>

              ))}
             </div>
          )}
          {question.type==='checkbox' && (
             <div>
              {question.data.options.map((option,index)=>(
                <div key={option.uuid} className='flex items-center'>
                  <input
                   id={option.uuid}
                   onChange={ev=>onCheckboxChange(option,ev)}
                   type='checkbox'
                   className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                  />
                  <label
                     htmlFor={option.uuid}
                     className='ml-3 block text-sm font-medium text-gray-700'
                    >
                     {option.text}
                    </label>
                </div>
              ))}
             </div>
          )}
          {question.type==='text' && (
             <div>
              <input
               type='text'
               onChange={(ev)=>answerChanged(ev.target.value)}
               className='mt-1 block shadow-sm  focus:ring-blue-500 h-12 p-1 w-full text-blue-600 border-gray-300 rounded sm:text-sm'
              />
             </div>
          )}
          {question.type==='textarea' && (
             <div>
              <textarea
               onChange={(ev)=>answerChanged(ev.target.value)}
               className='mt-1 block shadow-sm p-1 focus:ring-blue-500 h-12 w-full text-blue-600 border-gray-300 rounded sm:text-sm'

              ></textarea>
             </div>
          )}
        </div>
      </fieldset>
    </div>
  )
}
