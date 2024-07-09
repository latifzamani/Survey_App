import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from './views/login';
import Signup from './views/signup';
import Survey from './views/survey';
import GuestLayout from './components/guestLayout';
import DefaultLayout from './components/defaultLayout';
import SurveyCreate from './views/surveyCreate';
import SurveyPublicView from './views/surveyPublicView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children:[
      {
        path: '/',
      element: <Dashboard />
    },
    {
    path: '/survey',
    element: <Survey />
    },
    {
    path: '/survey/create',
    element: <SurveyCreate />
    },
    {
    path: '/survey/:id',
    element: <SurveyCreate />
    },

    ]
  },

  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '/survey/public/:slug',
    element: <SurveyPublicView />
  },

])

export default router;
