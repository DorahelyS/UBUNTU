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

    // State variable to hold journal entries
    const [journalEntries, setJournalEntries] = useState([]);

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

            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    });

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
            <div className="flex justify-end">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-white py-2 px-4 rounded-full mt-5 mr-5" onClick={handleNavigateToUserProfile}>Home</button>
                <button className="bg-cyan-400 hover:bg-pink-300 text-white py-2 px-4 rounded-full mt-5 mr-5 self-end" onClick={handleNavigateToLogin}>Logout</button>
            </div>
            <form onSubmit={formik.handleSubmit} className="form">
                <label> JOURNAL ENTRY</label>
                <input
                    type="text"
                    name="entry"
                    onChange={formik.handleChange}
                    value={formik.values.entry}
                />
                {formik.errors.entry && <div className="error">{formik.errors.entry}</div>}
                <button className="bg-blue-500 hover:bg-blue-300 text-white py-2 px-4 rounded-full mr-3" type="submit">Submit</button>
            </form>

            {/* Optional: Display journal entries */}
            <div>
                <h2>Journal Entries</h2>
                <ul>
                    {journalEntries.map(entry => (
                        <li key={entry.id}>{entry.entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CreateNewJournalEntry;