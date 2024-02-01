import App from "./App"
import MainPage from "./components/Home/MainPage"
import UserProfilePage from "./components/UserProfile/UserProfilePage"



const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <MainPage /> },
            { path: "/UserProfile", element: <UserProfilePage /> },
        ],
    },
];

export default routes;