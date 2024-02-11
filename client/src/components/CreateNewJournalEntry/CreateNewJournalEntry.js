// lets me use react library
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// declares a component - each component is a function 
function CreateNewJournalEntry() {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state)
    //const { currentUser } = state;

    // Extract currentUser from state, or default to null if it doesn't exist
    const currentUser = state && state.currentUser ? state.currentUser : null;



    const handleNavigateToUserProfile = () => {
        navigate('/User-Profile', {
            state: { currentUser }
        });
    };

    const handleNavigateToLogin = () => {
        navigate('/', {
            state: { currentUser }
        });
    };
    //returns what I want to see on the page - in this case the login form
    return (
        <div className="flex justify-end">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full mt-5 mr-5" onClick={handleNavigateToUserProfile}>Home</button>
                <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full mt-5 mr-5 self-end" onClick={handleNavigateToLogin}>Logout</button>
        </div>
    )
}

// need to export the function aka component if and when other components may want to use
export default CreateNewJournalEntry;

// need to also import Login to App.js
