// lets me use react library
import React from 'react';
import LoginForm from "./LoginForm";
import '../../styling/MainPage.css'
import MouseEffect from './MouseEffect';

// declares a component - each component is a function 
function MainPage() {
    //returns what I want to see on the page - in this case the login form
    return (
        <div className='main'>
            <LoginForm />
            <MouseEffect />
        </div>
    )
}

// need to export the function aka component if and when other components may want to use
export default MainPage;



