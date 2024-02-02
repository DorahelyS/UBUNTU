// lets me use react library
import React from 'react';
import LoginForm from "./LoginForm";
//import MainPageNav from "./MainPageNav"

// declares a component - each component is a function 
function MainPage() {
    //returns what I want to see on the page - in this case the login form
    return (
        <div>
            <div>
                <LoginForm />
            </div>
        </div>
    )
}

// need to export the fucnction aka component if and when other components may want to use
export default MainPage;

// need to also import Login to App.js