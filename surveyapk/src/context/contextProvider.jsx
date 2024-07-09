import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const stateContext=createContext({
  currentUser:{},setCurrentUser:()=>{},
  questionTypes:[],
  surveys:[],
  token:null,setToken:()=>{},
  toast:{
    message:null,
    show:false,
  }
});

// 8:40:00  last whach
/**
 * Notes:
 * 1-Apply the onDelete('cascade) on the tables...
 */
const tempServey=[
  {
    'id':1,
    'image_url':'https://www.kabul.com',
    'title':'Car',
    'slug':'carddfh',
    'status':true,
    'description':'This is a car',
    'created_at':'2020-02-02',
    'updated_at':'2020-02-02',
    'expire_date':'2020-02-02',
    'question':[
      {
        'id':12,
        'type':'text',
        'question':'how are you',
        'description':'Greating'
      },
      {
        'id':13,
        'type':'checkbox',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':14,
        'type':'select',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':15,
        'type':'radio',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':16,
        'type':'textarea',
        'question':'how are you',
        'description':'hello description',
        'data':[]
      },

    ]
  },
  {
    'id':1,
    'image_url':'https://www.kabul.com',
    'title':'Car',
    'slug':'carddfh',
    'status':true,
    'description':'This is a car',
    'created_at':'2020-02-02',
    'updated_at':'2020-02-02',
    'expire_date':'2020-02-02',
    'question':[
      {
        'id':12,
        'type':'text',
        'question':'how are you',
        'description':'Greating'
      },
      {
        'id':13,
        'type':'checkbox',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':14,
        'type':'select',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':15,
        'type':'radio',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':16,
        'type':'textarea',
        'question':'how are you',
        'description':'hello description',
        'data':[]
      },

    ]
  },
  {
    'id':1,
    'image_url':'https://www.kabul.com',
    'title':'Car',
    'slug':'carddfh',
    'status':true,
    'description':'This is a car',
    'created_at':'2020-02-02',
    'updated_at':'2020-02-02',
    'expire_date':'2020-02-02',
    'question':[
      {
        'id':12,
        'type':'text',
        'question':'how are you',
        'description':'Greating'
      },
      {
        'id':13,
        'type':'checkbox',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':14,
        'type':'select',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':15,
        'type':'radio',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':16,
        'type':'textarea',
        'question':'how are you',
        'description':'hello description',
        'data':[]
      },

    ]
  },
  {
    'id':1,
    'image_url':'https://www.kabul.com',
    'title':'Car',
    'slug':'carddfh',
    'status':true,
    'description':'This is a car',
    'created_at':'2020-02-02',
    'updated_at':'2020-02-02',
    'expire_date':'2020-02-02',
    'question':[
      {
        'id':12,
        'type':'text',
        'question':'how are you',
        'description':'Greating'
      },
      {
        'id':13,
        'type':'checkbox',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':14,
        'type':'select',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':15,
        'type':'radio',
        'question':'how are you',
        'description':'hello description',
        'data':{
          'options':[
            {
              'uuid':4875839,
              'text':'one'
            },
            {
              'uuid':4875839,
              'text':'two'
            },
            {
              'uuid':4875839,
              'text':'three'
            },
          ]
        }
      },
      {
        'id':16,
        'type':'textarea',
        'question':'how are you',
        'description':'hello description',
        'data':[]
      },

    ]
  },
]
export default function ContextProvider({children}) {
  const [currentUser,setCurrentUser]=useState({});
  const [token,_setToken]=useState(localStorage.getItem('TOKEN') || '');
  const [surveys,setSurveys]=useState(tempServey);
  const [questionTypes]=useState(['text','select','radio','checkbox','textarea']);
  const [toast,setToast]=useState({message:'',show:false});


  const setToken=(token)=>{
      if(token){
        localStorage.setItem('TOKEN',token);
      }else{
        localStorage.removeItem('TOKEN');
      }
      _setToken(token);
  }
  const showToast=(message)=>{
    console.log(message);
    setToast({message,show:true});
    setTimeout(()=>{
      setToast({message:'',show:false});
    },5000)
  }
  return (
    <stateContext.Provider value={
      {
        currentUser,setCurrentUser,
        questionTypes,
         token,setToken,
         surveys,
         toast,
         showToast,
      }
    }>
      {children}
    </stateContext.Provider>
  )
};

export const useStateContext=()=>useContext(stateContext);
