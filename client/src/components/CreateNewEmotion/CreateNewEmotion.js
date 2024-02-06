// lets me use react library
import React from 'react';
import UserProfileNav from '../UserProfile/UserProfileNav';


function CreateNewEmotion({ currentUser }) {
    return (
        <div>
            <UserProfileNav currentUser={currentUser} />
        </div>
    );
}

export default CreateNewEmotion;