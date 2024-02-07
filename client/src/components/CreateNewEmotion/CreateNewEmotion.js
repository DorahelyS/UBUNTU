// lets me use react library
import React, { useState } from 'react';
//import UserProfileNav from '../UserProfile/UserProfileNav';

import { useLocation, useNavigate } from 'react-router-dom';

// currentUser = the logged in user which holds all their info such as username email etc
// Refers to the location state provided by React Router, used for passing data between different components as users navigate through the application.
// I don't need to explicitly use useNavigate unless you have specific navigation requirements within this component.
function CreateNewEmotion() {
    const location = useLocation(); // Define location using useLocation hook
    const navigate = useNavigate();

    const { state } = location;
    //const { currentUser } = state;
    const currentUser = state ? state.currentUser : null;

    const [emotionIntensity, setEmotionIntensity] = useState('');
    const [secondEmotion, setSecondEmotion] = useState('');
    const [secondOption, setSecondOption] = useState([]);
    //const [emotionId, setEmotionId] = useState(''); // Define emotionId state
    //const [firstEmotion, setFirstEmotion] = useState('');
    //const [thirdEmotion, setThirdEmotion] = useState('');

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);
    /*
        // Function to handle form submission
        const handleEmotion = (e) => {
            const selectedPrimaryEmotion = e.target.value;
            let emotionId;
            if (selectedPrimaryEmotion === "Anger") {
                emotionId = 1; // Assuming 1 is the ID of the "Happy" emotion in your database
            } else if (selectedPrimaryEmotion === "Sadness") {
                emotionId = 2; // Assuming 2 is the ID of the "Sad" emotion in your database
            } else if (selectedPrimaryEmotion === "Suprise") {
                emotionId = 3; // Assuming 3 is the ID of the "Anger" emotion in your database
            } else if (selectedPrimaryEmotion === "Joy") {
                emotionId = 4; // Assuming 3 is the ID of the "Anger" emotion in your database
            } else if (selectedPrimaryEmotion === "Love") {
                emotionId = 5; // Assuming 3 is the ID of the "Anger" emotion in your database
            } else if(selectedPrimaryEmotion === "Fear") {
                emotionId = 6;
            }
            setSecondEmotion(emotionId);
            // Set secondary emotion options based on the primary emotion selected
    
            if (
                [
                    "Hate",
                    "Hostile",
                    "Agitated",
                    "Frustrated",
                    "Annoyed",
                    "Resentful",
                    "Jealous",
                    "Contempt",
                    "Revolted"
                ].includes(selectedPrimaryEmotion)
            ) {
                setSecondOption(["Rage", "Exasperated", "Irritable", "Envy", "Disgust"])
                setSecondEmotion('Anger')
            } else if (
                [
                    "Agony",
                    "Hurt",
                    "Depressed",
                    "Sorrow",
                    "Dismayed",
                    "Displeased",
                    "Regretful",
                    "Guilty",
                    "Isolated",
                    "Lonely",
                    "Grief",
                    "Powerless"
                ].includes(selectedPrimaryEmotion)
            ) {
                setSecondOption(["Suffering", "Sadness", "Disappointed", "Shameful", "Neglected", "Despair"])
                setSecondEmotion('Sadness')
            } else if (
                [
                    "Shocked",
                    "Dismayed",
                    "Disillusioned",
                    "Perplexed",
                    "Astonished",
                    "Awe-struck",
                    "Speechless",
                    "Astounded",
                    "Stimulted",
                    "Touched"
                ].includes(selectedPrimaryEmotion)
            ) {
                setSecondOption(["Stunned", "Confused", "Amazed", "Overcome", "Moved"])
                setSecondEmotion('Surprise')
            } else if (
                [
                    "Pleased",
                    "Satisfied",
                    "Amused",
                    "Delighted",
                    "Jovial",
                    "Blissful",
                    "Triumphant",
                    "Illustrious",
                    "Eager",
                    "Hopeful",
                    "Excited",
                    "Zeal",
                    "Euphoric",
                    "Jubilation",
                    "Enchanted",
                    "Rapture"
                ].includes(selectedPrimaryEmotion)
            ) {
                setSecondOption(["Content", "Happy", "Cheerful", "Proud", "Optimistic", "Enthusiatic", "Elation", "Enthralled"])
                setSecondEmotion('Joy')
            } else if (
                [
                    "Romantic",
                    "Fondness",
                    "Sentimental",
                    "Attracted",
                    "Passion",
                    "Infatuation",
                    "Caring",
                    "Compassionate",
                    "Relieved",
                    "Satisfied"
                ].includes(selectedPrimaryEmotion)
            ) {
                setSecondOption(["Affectionate", "Longing", "Desire", "Tenderness", "Peaceful"])
                setSecondEmotion('Love')
            } else if (
                [
                    "Frightened",
                    "Helpless",
                    "Panic",
                    "Hysertical",
                    "Inferior",
                    "Inadequate",
                    "Worried",
                    "Anxious",
                    "Mortified",
                    "Dread"
                ].includes(selectedPrimaryEmotion)
            ) {
                setSecondOption(["Scared", "Terror", "Insecure", "Nervous", "Horror"])
                setSecondEmotion('Fear')
            }
        };
    

    const handleEmotion = (e) => {
        const selectedPrimaryEmotion = e.target.value;

        // Set secondary emotion options based on the primary emotion selected
        if (selectedPrimaryEmotion === "Happy") {
            setSecondOption(["Content", "Happy", "Cheerful", "Proud", "Optimistic", "Enthusiatic", "Elation", "Enthralled"]);
        } else if (selectedPrimaryEmotion === "Sad") {
            setSecondOption(["Suffering", "Sadness", "Disappointed", "Shameful", "Neglected", "Despair"]);
        } else if (selectedPrimaryEmotion === "Anger") {
            setSecondOption(["Rage", "Exasperated", "Irritable", "Envy", "Disgust"]);
        } else if (selectedPrimaryEmotion === "Surprise") {
            setSecondOption(["Stunned", "Confused", "Amazed", "Overcome", "Moved"]);
        } else if (selectedPrimaryEmotion === "Joy") {
            setSecondOption(["Content", "Happy", "Cheerful", "Proud", "Optimistic", "Enthusiatic", "Elation", "Enthralled"]);
        } else if (selectedPrimaryEmotion === "Love") {
            setSecondOption(["Affectionate", "Longing", "Desire", "Tenderness", "Peaceful"]);
        } else if (selectedPrimaryEmotion === "Fear") {
            setSecondOption(["Scared", "Terror", "Insecure", "Nervous", "Horror"]);
        } else {
            // Handle the case when no emotion is selected
            setSecondOption([]);
        }
    };

    const handleSubmit = async () => {
        try {
            const data = {
                user_id: currentUser.id,
                emotion_id: secondEmotion,
                emotion_intensity: emotionIntensity
            };

            // Make a POST request to your backend with the selected emotions
            const response = await fetch('user_emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to log emotion');
            }

            // Handle success or navigate to another page
        } catch (error) {
            // Handle error
            console.error('Error:', error.message);
        }
    };

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
*/
    const handleEmotion = (e) => {
        const selectedPrimaryEmotion = e.target.value;

        if (
            [
                "Hate",
                "Hostile",
                "Agitated",
                "Frustrated",
                "Annoyed",
                "Resentful",
                "Jealous",
                "Contempt",
                "Revolted"
            ].includes(selectedPrimaryEmotion)
        ) {
            setSecondOption(["Rage", "Exasperated", "Irritable", "Envy", "Disgust"]);
        } else if (
            [
                "Agony",
                "Hurt",
                "Depressed",
                "Sorrow",
                "Dismayed",
                "Displeased",
                "Regretful",
                "Guilty",
                "Isolated",
                "Lonely",
                "Grief",
                "Powerless"
            ].includes(selectedPrimaryEmotion)
        ) {
            setSecondOption(["Suffering", "Sadness", "Disappointed", "Shameful", "Neglected", "Despair"]);
        } else if (
            [
                "Shocked",
                "Dismayed",
                "Disillusioned",
                "Perplexed",
                "Astonished",
                "Awe-struck",
                "Speechless",
                "Astounded",
                "Stimulted",
                "Touched"
            ].includes(selectedPrimaryEmotion)
        ) {
            setSecondOption(["Stunned", "Confused", "Amazed", "Overcome", "Moved"]);
        } else if (
            [
                "Pleased",
                "Satisfied",
                "Amused",
                "Delighted",
                "Jovial",
                "Blissful",
                "Triumphant",
                "Illustrious",
                "Eager",
                "Hopeful",
                "Excited",
                "Zeal",
                "Euphoric",
                "Jubilation",
                "Enchanted",
                "Rapture"
            ].includes(selectedPrimaryEmotion)
        ) {
            setSecondOption(["Content", "Happy", "Cheerful", "Proud", "Optimistic", "Enthusiatic", "Elation", "Enthralled"]);
        } else if (
            [
                "Romantic",
                "Fondness",
                "Sentimental",
                "Attracted",
                "Passion",
                "Infatuation",
                "Caring",
                "Compassionate",
                "Relieved",
                "Satisfied"
            ].includes(selectedPrimaryEmotion)
        ) {
            setSecondOption(["Affectionate", "Longing", "Desire", "Tenderness", "Peaceful"]);
        } else if (
            [
                "Frightened",
                "Helpless",
                "Panic",
                "Hysertical",
                "Inferior",
                "Inadequate",
                "Worried",
                "Anxious",
                "Mortified",
                "Dread"
            ].includes(selectedPrimaryEmotion)
        ) {
            setSecondOption(["Scared", "Terror", "Insecure", "Nervous", "Horror"]);
        } else {
            setSecondOption([]);
        }
    };

    const handleSubmit = async () => {
        try {
            const data = {
                user_id: currentUser.id,
                emotion_id: secondEmotion,
                emotion_intensity: emotionIntensity
            };

            const response = await fetch('user_emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to log emotion');
            }

            // Handle success or navigate to another page
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

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


    return (
        <div>
            <div>
                <label>Select Primary Emotion:</label>
                <select onChange={handleEmotion}>
                    <option value="">Select</option>
                    <option value="Hate">Hate</option>
                    <option value="Hostile">Hostile</option>
                    <option value="Agitated">Agitated</option>
                    <option value="Frustrated">Frustrated</option>
                    <option value="Annoyed">Annoyed</option>
                    <option value="Resentful">Resentful</option>
                    <option value="Jealous">Jealous</option>
                    <option value="Contempt">Contempt</option>
                    <option value="Revolted">Revolted</option>
                    <option value="Agony">Agony</option>
                    <option value="Hurt">Hurt</option>
                    <option value="Depressed">Depressed</option>
                    <option value="Sorrow">Sorrow</option>
                    <option value="Dismayed">Dismayed</option>
                    <option value="Displeased">Displeased</option>
                    <option value="Regretful">Regretful</option>
                    <option value="Guilty">Guilty</option>
                    <option value="Isolated">Isolated</option>
                    <option value="Lonely">Lonely</option>
                    <option value="Grief">Grief</option>
                    <option value="Powerless">Powerless</option>
                    <option value="Shocked">Shocked</option>
                    <option value="Disillusioned">Disillusioned</option>
                    <option value="Perplexed">Perplexed</option>
                    <option value="Astonished">Astonished</option>
                    <option value="Awe-struck">Awe-struck</option>
                    <option value="Speechless">Speechless</option>
                    <option value="Astounded">Astounded</option>
                    <option value="Stimulated">Stimulated</option>
                    <option value="Touched">Touched</option>
                    <option value="Pleased">Pleased</option>
                    <option value="Satisfied">Satisfied</option>
                    <option value="Amused">Amused</option>
                    <option value="Delighted">Delighted</option>
                    <option value="Jovial">Jovial</option>
                    <option value="Blissful">Blissful</option>
                    <option value="Triumphant">Triumphant</option>
                    <option value="Illustrious">Illustrious</option>
                    <option value="Eager">Eager</option>
                    <option value="Hopeful">Hopeful</option>
                    <option value="Excited">Excited</option>
                    <option value="Zeal">Zeal</option>
                    <option value="Euphoric">Euphoric</option>
                    <option value="Jubilation">Jubilation</option>
                    <option value="Enchanted">Enchanted</option>
                    <option value="Rapture">Rapture</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Fondness">Fondness</option>
                    <option value="Sentimental">Sentimental</option>
                    <option value="Attracted">Attracted</option>
                    <option value="Passion">Passion</option>
                    <option value="Infatuation">Infatuation</option>
                    <option value="Caring">Caring</option>
                    <option value="Compassionate">Compassionate</option>
                    <option value="Relieved">Relieved</option>
                    <option value="Frightened">Frightened</option>
                    <option value="Helpless">Helpless</option>
                    <option value="Panic">Panic</option>
                    <option value="Hysterical">Hysterical</option>
                    <option value="Inferior">Inferior</option>
                    <option value="Inadequate">Inadequate</option>
                    <option value="Worried">Worried</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Mortified">Mortified</option>
                    <option value="Dread">Dread</option>
                </select>
            </div>

            {secondOption.length > 0 && (
                <div>
                    <label>Select Secondary Emotion:</label>
                    <select onChange={(e) => setSecondEmotion(e.target.value)}>
                        <option value="">Select</option>
                        {secondOption.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Displayed final selected emotion */}
            {secondEmotion && (
                <div>
                    <label>Final Selected Emotion:</label>
                    <p>{secondEmotion}</p>
                </div>
            )}

            {/* Included input for emotion intensity */}
            <div>
                <label>Emotion Intensity:</label>
                <input type="text" value={emotionIntensity} onChange={(e) => setEmotionIntensity(e.target.value)} />
            </div>

            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleNavigateToUserProfile}>Home</button>
            <button onClick={handleNavigateToLogin}>Logout</button>
        </div>
    );
};

export default CreateNewEmotion;