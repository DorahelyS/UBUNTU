import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



function About() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state)

    const currentUser = state && state.currentUser ? state.currentUser : null;

    // navigating back to User-Profile
    const handleNavigateToUserProfile = () => {
        navigate('/User-Profile', {
            state: { currentUser }
        });
    };

    // navigating back to log in
    const handleNavigateToLogin = () => {
        navigate('/', {
            state: { currentUser }
        });
    };
    //returns what I want to see on the page - in this case the login form
    return (
        <div className='bg-lime-100 flex flex-col '>
            <div className="flex justify-end items-start mt-5 mr-5 space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full " onClick={handleNavigateToUserProfile}>Home</button>
                <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full " onClick={handleNavigateToLogin}>Logout</button>
            </div>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center mt-20"> WHAT IS THE EMOTION WHEEL</h1>
                <p className=" text-center mt-5"> The emotion wheel is a visual tool created by psychologist Robert Plutchik in 1980. The original color wheel classifies 8 primary emotions: anger, fear, sadness, disgust, surprise, anticipation, trust, and joy. Plutchik also suggests that each emotion can be expressed at different times with a mix of intensities. Plutchik's theory provides a framework for understanding the complex nature of emotions and their role in human behavior and adaptation. It emphasizes the interconnectedness of emotions and their adaptive significance in guiding behavior and promoting survival. Below are the ten postulates of Plutchik's psychoevolutionary theory of basic emotions: </p>
                <ol className="list-disc mt-10">
                    <li>Opposites: Each primary emotion has a polar opposite. For example, joy is the opposite of sadness, and trust is the opposite of disgust. </li>
                    <li>Intensity: The intensity of an emotion can vary. Emotions can range from mild to intense.</li>
                    <li>Blending: Emotions can blend together to form other emotions. For example, anticipation and joy can blend to create excitement.</li>
                    <li>Stimulus: Emotions can be triggered by specific stimuli or events in the environment.</li>
                    <li>Appraisal: Emotions involve cognitive appraisal, where individuals evaluate events or situations based on their significance to their well-being.</li>
                    <li>Subjectivity: Emotions are subjective experiences, influenced by individual perceptions, beliefs, and past experiences.</li>
                    <li>Behavioral Response: Emotions are associated with specific behavioral responses. For instance, fear may prompt a fight-or-flight response.</li>
                    <li>Adaptive Function: Emotions serve adaptive functions, helping individuals respond effectively to environmental challenges and opportunities.</li>
                    <li>Hierarchical Structure: Emotions can be organized hierarchically, with primary emotions forming the foundation for more complex emotional experiences.</li>
                    <li>Evolutionary Basis: Emotions have evolved over time and are shared across different cultures and species, reflecting common biological and evolutionary origins.</li>
                </ol>
                <p className="mt-5">There have been many adoptations, below is the adoptation I followed vs Plutchik's original:</p>
            </div>
            <div>
                <img src="/emotionWheel1.png" alt="" className="mt-20 mx-auto" />
                <img src="/emotionWheel2.png" alt="" className="mt-20 mx-auto" />
            </div>

        </div>
    )
}

// need to export the function aka component if and when other components may want to use
export default About;