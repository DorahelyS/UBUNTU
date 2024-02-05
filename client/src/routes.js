import App from "./App"
import MainPage from "./components/MainPage/MainPage"
import UserProfilePage from "./components/UserProfile/UserProfilePage"
import CreateNewEmotion from "./components/CreateNewEmotion/CreateNewEmotion";



const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <MainPage /> },
            { path: "/User-Profile", element: <UserProfilePage /> },
            { path: "/New-Emotion", element: <CreateNewEmotion /> }
        ],
    },
];

export default routes;