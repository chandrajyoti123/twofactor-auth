import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './view/Home/Home';
import SignUp from './view/SignUp/SignUp';
import Login from './view/Login/Login';
const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    },
    {
        path:'/login',
        element:<Login/>
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider  router={router}/>
);


