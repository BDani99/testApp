import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.tsx";
import HomePage from "../Pages/HomePage.tsx";
import DetailsPage from "../Pages/DetailsPage.tsx";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/details/:id",
                element: <DetailsPage />,
            },
            {
                path: "*",
                element: <Navigate to="/" />,
            },
        ],
    },
]);
