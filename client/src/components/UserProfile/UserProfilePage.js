// lets me use react library
import React from 'react';
import UserProfileNav from "./UserProfileNav"

// declares a component - each component is a function 
function UserProfilePage(){
    //returns what I want to see on the page - in this case the login form
    return(
        <div>
            <UserProfileNav />
        </div>
    )
}

// need to export the fucnction aka component if and when other components may want to use
export default UserProfilePage;

// need to also import Login to App.js