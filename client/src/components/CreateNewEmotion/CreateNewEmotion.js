// lets me use react library
import React, { useState } from 'react';
//import UserProfileNav from '../UserProfile/UserProfileNav';

import { useLocation, useNavigate } from 'react-router-dom';

import '../../styling/NewEmotion.css'

// currentUser = the logged in user which holds all their info such as username email etc
// Refers to the location state provided by React Router, used for passing data between different components as users navigate through the application.
// I don't need to explicitly use useNavigate unless you have specific navigation requirements within this component.
function CreateNewEmotion() {
    // locations and navigations
    const location = useLocation(); // Define location using useLocation hook
    const navigate = useNavigate();
    const { state } = location;
    //const { currentUser } = state;
    const currentUser = state ? state.currentUser : null;


    // states
    const [primaryEmotion, setPrimaryEmotion] = useState('');
    const [secondEmotion, setSecondEmotion] = useState('');
    const [finalEmotion, setFinalEmotion] = useState('');
    const [secondOption, setSecondOption] = useState([]);
    const [emotionIntensity, setEmotionIntensity] = useState('');

    const [submissionMessage, setSubmissionMessage] = useState(null);
    const [emotionId, setEmotionId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [patchMessage, setPatchMessage] = useState(null);


    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);

    // first emotion 
    const handleFirstEmotion = (e) => {
        const selectedPrimaryEmotion = e.target.value;
        setPrimaryEmotion(selectedPrimaryEmotion);
        console.log('Selected Primary Emotion:', selectedPrimaryEmotion);

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
            setSecondOption(["Suffering", "Disappointed", "Shameful", "Neglected", "Despair"]);
        } else if (
            [
                "Shocked",
                "Disillusioned",
                "Perplexed",
                "Astonished",
                "Awe-struck",
                "Speechless",
                "Astounded",
                "Stimulated",
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
            setSecondOption(["Content", "Happy", "Cheerful", "Proud", "Optimistic", "Enthusiastic", "Elation", "Enthralled"]);
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
            ].includes(selectedPrimaryEmotion)
        ) {
            setSecondOption(["Affectionate", "Longing", "Desire", "Tenderness", "Peaceful"]);
        } else if (
            [
                "Frightened",
                "Helpless",
                "Panic",
                "Hysterical",
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
            console.log('Updated Second Option:', secondOption);
        }
    };

    // second emotion
    const handleSecondEmotion = (e) => {
        const selectedSecondEmotion = e.target.value;
        console.log('Selected Second Emotion:', selectedSecondEmotion);

        // Setting the final emotion based on the selected second emotion
        if (["Rage", "Exasperated", "Irritable", "Envy", "Disgust"].includes(selectedSecondEmotion)) {
            setFinalEmotion("Anger");
        } else if (["Suffering", "Disappointed", "Shameful", "Neglected", "Despair"].includes(selectedSecondEmotion)) {
            setFinalEmotion("Sadness");
        } else if (["Stunned", "Confused", "Amazed", "Overcome", "Moved"].includes(selectedSecondEmotion)) {
            setFinalEmotion("Surprise");
        } else if (["Content", "Happy", "Cheerful", "Proud", "Optimistic", "Enthusiastic", "Elation", "Enthralled"].includes(selectedSecondEmotion)) {
            setFinalEmotion("Joy");
        } else if (["Affectionate", "Longing", "Desire", "Tenderness", "Peaceful"].includes(selectedSecondEmotion)) {
            setFinalEmotion("Love");
        } else if (["Scared", "Terror", "Insecure", "Nervous", "Horror"].includes(selectedSecondEmotion)) {
            setFinalEmotion("Fear");
        }
    };

    // form submission
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Create Emotion
            const emotionResponse = await fetch('/emotions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emotion: finalEmotion })
            });

            if (!emotionResponse.ok) {
                throw new Error('Failed to create emotion');
            }

            const emotionData = await emotionResponse.json();
            const emotionId = emotionData.id;

            console.log('Emotion created successfully. Emotion ID:', emotionId); // Log the emotion ID

            // storing id for later use - for patch & delete
            //setEmotionId(emotionId)

            // Step 2: Create User Emotion using obtained emotionId
            const userEmotionData = {
                user_id: currentUser.id,
                emotion_id: emotionId,
                emotion_intensity: emotionIntensity
            };

            const userEmotionResponse = await fetch('/user_emotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userEmotionData)
            });

            if (!userEmotionResponse.ok) {
                throw new Error('Failed to log emotion');
            }

            const userEmotionRecord = await userEmotionResponse.json();
            const userEmotionId = userEmotionRecord.id;

            //storing id for later use - for patch & delete
            setEmotionId(userEmotionId);

            // Log successful submission to the console
            console.log('Emotion submitted successfully:', {
                currentUser: currentUser,
                selectedEmotion: finalEmotion,
                emotionIntensity: emotionIntensity,
                emotionId: userEmotionId
            });

            setSubmissionMessage(`Your emotion ${finalEmotion} with intensity ${emotionIntensity} was submitted successfully.`)

            // Handle success or navigate to another page
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handlePatch = async (e) => {
        e.preventDefault();
        if (!emotionId) {
            console.error('Emotion ID is null');
            return;
        }

        console.log("Emotion id for patch", emotionId);
        try {
            const response = await fetch(`/user_emotion/${emotionId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emotion_intensity: emotionIntensity
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update emotion intensity');
            }
            console.log('Emotion intensity updated successfully', emotionId);

            setPatchMessage('Updated successfully')

        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage('Failed to update intensity');
        }
    }


    const handleDelete = async (e) => {
        e.preventDefault();
        if (!emotionId) {
            console.error('Emotion ID is null');
            return;
        }
        console.log("Emotion id for delete", emotionId);

        try {
            const response = await fetch(`/user_emotion/${emotionId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error('Failed to delete the emotion');
            }

            console.log('Emotion deleted successfully', emotionId);
            // Reset emotionId state after successful deletion
            setEmotionId(null);
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage('Failed to delete the emotion');
        }
    };

    // navigating to back to User-Profile
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





    return (
        <div>
            <div className="flex justify-end items-start mt-5 mr-5 space-x-4">
                    {/* Buttons for form submission and navigation */}
                    <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full" onClick={handleNavigateToUserProfile}>Home</button>
                    <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full" onClick={handleNavigateToLogin}>Logout</button>
            </div>
            <div className="flex justify-center items-center h-screen">
            <div>
                {/* Primary emotion */}
                <label>Select Primary Emotion:</label>
                <select onChange={(e) => { setPrimaryEmotion(e.target.value); setSecondEmotion(''); handleFirstEmotion(e); }}>
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
            {/* Logging secondOption and its length  to make sure it it filtering correctly*/}
            {console.log("Second Options:", secondOption)}
            {console.log("Second Options Length:", secondOption.length)}

            {secondOption.length > 0 && (
                <div>
                    {/* second emotion */}
                    <label>Select Secondary Emotion:</label>
                    <select onChange={(e) => { setSecondEmotion(e.target.value); handleSecondEmotion(e); }}>
                        <option value="">Select</option>
                        {secondOption.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Display for final selected emotion */}
            {finalEmotion && (
                <div>
                    <label>Final Selected Emotion:</label>
                    <p>{finalEmotion}</p>
                </div>
            )}

            {/* included input for emotion intensity */}
            <div>
                <label>Emotion Intensity:</label>
                <input type="text" value={emotionIntensity} onChange={(e) => setEmotionIntensity(e.target.value)} />
            </div>

            {/* Display submission message if available */}
            {submissionMessage ? (
                <div>
                    <p>{submissionMessage}</p>
                    <button className="rounded-full" onClick={handleDelete}>Delete Entire Emotion Log</button>
                    <button className="rounded-full" onClick={handlePatch}>Update Emotion Intensity</button>
                </div>
            ) : (
                <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-full mr-3" onClick={handlePostSubmit}>Submit</button>
            )}

            </div>
    
            

        </div>
    );
};

export default CreateNewEmotion;



