// lets me use react library
import React from 'react';
import UserProfileNav from '../UserProfile/UserProfileNav';

import { useLocation} from 'react-router-dom';

// currentUser = the logged in user which holds all their info such as username email etc
// Refers to the location state provided by React Router, used for passing data between different components as users navigate through the application.
// I don't need to explicitly use useNavigate unless you have specific navigation requirements within this component.
function CreateNewEmotion() {
    const location = useLocation(); // Define location using useLocation hook


    const { state } = location;
    const { currentUser } = state;
    //const currentUser = state ? state.currentUser : null;


    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);

    
    return (
        <div>
            <UserProfileNav currentUser={currentUser} />
        </div>
    );
}

export default CreateNewEmotion;