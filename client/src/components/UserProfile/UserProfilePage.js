// lets me use react library
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProfileNav from "./UserProfileNav"
import CreateNewEmotion from '../CreateNewEmotion/CreateNewEmotion';

function UserProfilePage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { currentUser } = state;

    const handleCreateNewEmotion = () => {
        navigate('/New-Emotion');
    };

    return (
        <div>
            <UserProfileNav currentUser={currentUser} />
            <button onClick={handleCreateNewEmotion}>Log New Emotion</button>
            <CreateNewEmotion currentUser={currentUser} />
        </div>
    );
}

export default UserProfilePage;