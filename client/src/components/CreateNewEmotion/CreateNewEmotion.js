// lets me use react library
import React, { useState } from 'react';
//import UserProfileNav from '../UserProfile/UserProfileNav';

import { useLocation, useNavigate } from 'react-router-dom';


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
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [updateMessage, setUpdateMessage] = useState(null);

    const [emotionId, setEmotionId] = useState(null);

    // not actually using these atm
    const [errorMessage, setErrorMessage] = useState('');



    // for debugging
    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);

    // first emotion logic if this outer layer emotion then set the second options (inner layer)
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

    // second emotion ^ same logic as above if this second layer emotion then final emotion
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
            // Step 1: fetching all emotions
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

            // Step 2: Create & storing User Emotion using obtained emotionId
            const userEmotionData = {
                user_id: currentUser.id,
                emotion_id: emotionId,
                emotion_intensity: emotionIntensity
            };

            // Step 2: Creating aka posting new emotion 
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

            // frontend submission message
            setSubmissionMessage(`Your emotion ${finalEmotion} with intensity ${emotionIntensity} was submitted successfully!`)

            // Handle success or navigate to another page
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // for updating emotion intensity upon submission 
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

            setUpdateMessage('intensity updated successfully!')

        } catch (error) {
            console.error('Error:', error.message);
            //setErrorMessage('Failed to update intensity');
        }
    }


    // deleting entire logged emotion if for whatever reason user did not mean to submit etc
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
            setDeleteMessage('emotion successfully deleted!');

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
       
            <div className="relative w-full h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url('/border.png')" }}>
                <div className="absolute top-0 right-0 mt-5 mr-5 space-x-4">
                    {/* Buttons for form submission and navigation */}
                    <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full" onClick={handleNavigateToUserProfile}>Home</button>
                    <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full" onClick={handleNavigateToLogin}>Logout</button>
                </div>
                <div className="flex justify-center items-center h-screen">
                    <div>
                        {/* Primary emotion */}
                        <div >
                            <label className="mr-3">Select Primary Emotion:</label>
                            <select onChange={(e) => { setPrimaryEmotion(e.target.value); setSecondEmotion(''); handleFirstEmotion(e); }}
                                className="border border-stone-700 rounded-full px-3 py-2 focus:border-stone-300 w-36 text-s"
                            >

                                {/* hardcoding first drop down options */}
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
                    </div>
                    {/* Logging secondOption and its length  to make sure it it filtering correctly*/}
                    {console.log("Second Options:", secondOption)}
                    {console.log("Second Options Length:", secondOption.length)}

                    {secondOption.length > 0 && (
                        <div>
                            <div className="ml-5">
                                {/* second emotion */}
                                <label className="mr-3">Select Secondary Emotion:</label>
                                <select onChange={(e) => { setSecondEmotion(e.target.value); handleSecondEmotion(e); }}
                                    className="border border-stone-700 rounded-full px-3 py-2 focus:border-stone-300 w-36 text-s"
                                >
                                    <option value="">Select</option>
                                    {secondOption.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Display for final selected emotion */}
                    {finalEmotion && (
                        <div className="ml-5 mb-5 mt-5">
                            <label>Final Selected Emotion:</label>
                            <p className={`border border-stone-700 bg-stone-100 rounded-full px-3 py-2 focus:border-stone-300 w-28 text-m text-center  ml-6 mt-5`}>
                                {finalEmotion}
                            </p>
                        </div>
                    )}

                    {/* included input for emotion intensity */}
                    {finalEmotion.length > 0 && (
                        <div>
                            {/* included input for emotion intensity */}
                            <div>
                                <label className="ml-5 mr-3">Emotion Intensity:</label>
                                <input className={`border border-stone-700 rounded-full px-3 py-2 focus:border-stone-300 w-20 text-s ${submissionMessage ? 'bg-rose-100' : '' // Conditional class based on submissionMessage
                                    }`}
                                    type="text"
                                    placeholder="#"
                                    value={emotionIntensity}
                                    onChange={(e) => setEmotionIntensity(e.target.value)} />
                            </div>

                            {/* Displaying submit button */}
                            <div className="mt-5">
                                {!submissionMessage && (
                                    <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-full ml-20" onClick={handlePostSubmit}>
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    )}


                    {/* Displaying submission message if available */}
                    <div >
                        {submissionMessage && (
                            <div >
                                <div >
                                    <p style={{ position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)" }}>{submissionMessage}</p>
                                    <button style={{ position: "absolute", bottom: "25px", left: "50%", transform: "translateX(-50%)" }} className=" bg-red-200 rounded-full px-6 py-1 mb-5" onClick={handleDelete}>Delete Entire Emotion Log?</button>
                                    <button style={{ position: "absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)" }} className="bg-red-200 rounded-full px-6 py-1 " onClick={handlePatch}>Update Emotion Intensity?</button>
                                </div>
                            </div>

                        )}
                        {/* Displaying deletion message if available */}
                        {deleteMessage && (
                            <div style={{ position: "absolute", bottom: "50px", left: "70%", transform: "translateX(-50%)" }}>
                                <p>{deleteMessage}</p>
                            </div>
                        )}
                        {updateMessage && (
                            <div style={{ position: "absolute", bottom: "10px", left: "70%", transform: "translateX(-50%)" }}>
                                <p>{updateMessage}</p>
                            </div>
                        )}


                    </div>

                </div>

            </div>



       
    );
};

export default CreateNewEmotion;



