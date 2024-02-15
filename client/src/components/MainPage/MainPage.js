// lets me use react library
import React from 'react';
import LoginForm from "./LoginForm";
import MouseEffect from './MouseEffect';
import '../../styling/MainPage.css'

// declares a component - each component is a function 
function MainPage() {
    return (
        <div className="relative w-full h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/mainnnn.png')" }}>
            <div className="flex flex-col items-center tems-center h-screen">
                {/* Header */}
                <h1 className="text-4xl font-bold text-white mt-5">UBUNTU</h1>
                <h2 className="text-2xl font-bold text-white mt-5">"I am because we are"</h2>
                {/* Login Form */}
                <LoginForm />

                {/* Mouse Effect */}
                <MouseEffect />
            </div>
        </div>
    );
}

// need to export the function aka component if and when other components may want to use
export default MainPage;



