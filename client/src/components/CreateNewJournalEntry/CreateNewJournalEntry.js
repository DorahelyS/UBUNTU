// lets me use react library
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import * as yup from "yup"

// declares a component - each component is a function 
function CreateNewJournalEntry() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const currentUser = state && state.currentUser ? state.currentUser : null;

    // State variable to hold journal entries & submission message
    const [journalEntries, setJournalEntries] = useState([]);
    const [submissionMessage, setSubmissionMessage] = useState(null);

    // for debugging
    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);

    const schema = yup.object().shape({
        entry: yup.string().max(150, "Keep it short").required("Entry is required in order to submit")
    });

    const formik = useFormik({
        initialValues: {
            entry: ''
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const user_id = currentUser ? currentUser.id : null;
                const data = {
                    entry: values.entry,
                    user_id: user_id
                };

                const response = await fetch('/journals', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Failed to submit journal entry');
                }

                const journalEntryRecord = await response.json();
                const journalEntryId = journalEntryRecord.id;

                // Update the journal entries state with the new entry
                setJournalEntries([...journalEntries, { id: journalEntryId, ...data }]);

                console.log('Journal entry submitted successfully:', {
                    currentUser: currentUser,
                    journalEntry: data,
                    journalEntryId: journalEntryId
                });
                setSubmissionMessage('submitted!')

            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    });

    // navigationg back to User-Profile
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
            <div className="flex justify-end">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full mt-5 mr-5" onClick={handleNavigateToUserProfile}>Home</button>
                <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full mt-5 mr-5 self-end" onClick={handleNavigateToLogin}>Logout</button>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <form onSubmit={formik.handleSubmit} className="form flex flex-col items-center">
                <label  className="text-xl ">JOURNAL ENTRY:</label>
                    <div>
                        <input
                            type="text"
                            name="entry"
                            placeholder="&quot;I write entirely to find out what I'm thinking... &quot;"
                            onChange={formik.handleChange}
                            value={formik.values.entry}
                            className="border border-stone-700 rounded-full px-3 py-2 focus:border-stone-300 mt-5 ml-5 w-96 text-xs"
                        />
                    </div>
                    {formik.errors.entry && <div className="error">{formik.errors.entry}</div>}
                    <div>
                        <p className="mt-5"> {submissionMessage} </p>
                        <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-full mt-5" type="submit">Submit</button>
                    </div>
                
                </form>
            </div>
    
            {/* Optional: Display journal entries if I want to display all the journal entries - stretch goal - would need a fetch statement 
            would be better on a a new route - otherwise page will look too busy
            <div>
                <h2>Journal Entries</h2>
                <ul>
                    {journalEntries.map(entry => (
                        <li key={entry.id}>{entry.entry}</li>
                    ))}
                </ul>
                    </div> */}
        </div>
    );
}

export default CreateNewJournalEntry;