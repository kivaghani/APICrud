import { lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Routing } from './Routing';

const Login = lazy(() => import("../Pages/Account/Login"));
const Home = lazy(() => import("../Pages/Home/home"));



const routesConfig = [
    { path: "/", element: <Navigate to={Routing.Login} /> },
    { path: Routing.Login, element: <Login /> },
    {path: Routing.Home, element: <Home/>}
    
];

const routes = createBrowserRouter(routesConfig);

const AppRouting = () => {
    return <RouterProvider router={routes} />;
}

export default AppRouting