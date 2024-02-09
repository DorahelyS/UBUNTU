// lets me use react library
import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';


function SeeUserSummaryChart() {
    // locations and navigations
    const location = useLocation(); // Define location using useLocation hook
    const navigate = useNavigate();
    const { state } = location;
    //const { currentUser } = state;
    const currentUser = state ? state.currentUser : null;

    const [emotionData, setEmotionData] = useState([]);

    useEffect(() => {
        // Fetch emotion data for the current user
        // This should be replaced with your actual logic to fetch data from the server
        const fetchData = async () => {
            try {
                // Make a fetch request to get the emotion data for the current user
                const response = await fetch('/user_emotion'); // Update the endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch emotion data');
                }
                const data = await response.json();
                setEmotionData(data);
            } catch (error) {
                console.error('Error fetching emotion data:', error.message);
            }
        };

        fetchData();
    }, []);

    // Function to render the chart cells
    const renderChartCells = () => {
        const chartCells = [];

        // Generate rows for days
        for (let day = 1; day <= 31; day++) {
            const row = [];

            // Generate columns for months
            for (let month = 1; month <= 12; month++) {
                const emotionForDay = emotionData.find((emotion) => {
                    const emotionDate = new Date(emotion.date_stamp);
                    return emotionDate.getMonth() + 1 === month && emotionDate.getDate() === day;
                });

                const emotionColor = emotionForDay ? emotionForDay.color : 'gray';

                // Push each cell into the row
                row.push(
                    <div
                        key={`cell-${month}-${day}`}
                        className={`w-8 h-8 bg-${emotionColor}-500 border border-gray-200`}
                    ></div>
                );
            }

            // Push the row into the chartCells array
            chartCells.push(
                <div key={`row-${day}`} className="flex items-center space-x-1">
                    {row}
                </div>
            );
        }

        return chartCells;
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

    console.log('Current pathname:', location.pathname);
    console.log("current state:", state);


    return (
        <div className="grid grid-cols-14 gap-1">
        {/* Days */}
        <div className="flex flex-col col-start-1 col-span-1">
            {[...Array(31)].map((_, index) => (
                <div key={index + 1}>{index + 1}</div>
            ))}
        </div>
            {/* Month labels */}
            <div className="flex justify-between col-start-2 col-span-3">
                <div style={{ fontSize: '0.8rem' }}>Jan</div>
                <div style={{ fontSize: '0.8rem' }}>Feb</div>
                <div style={{ fontSize: '0.8rem' }}>Mar</div>
                <div style={{ fontSize: '0.8rem' }}>Apr</div>
                <div style={{ fontSize: '0.8rem' }}>May</div>
                <div style={{ fontSize: '0.8rem' }}>Jun</div>
                <div style={{ fontSize: '0.8rem' }}>Jul</div>
                <div style={{ fontSize: '0.8rem' }}>Aug</div>
                <div style={{ fontSize: '0.8rem' }}>Sep</div>
                <div style={{ fontSize: '0.8rem' }}>Oct</div>
                <div style={{ fontSize: '0.8rem' }}>Nov</div>
                <div style={{ fontSize: '0.8rem' }}>Dec</div>
            </div>
            {/* Chart */}
            <div className="col-start-2 col-span-12 grid grid-rows-32 gap-1">
                {renderChartCells()}
            </div>
            {/* Buttons */}
            <div className="col-start-2 col-span-13">
                <button onClick={handleNavigateToUserProfile}>Home</button>
                <button onClick={handleNavigateToLogin}>Logout</button>
            </div>
        </div>
    );

}

export default SeeUserSummaryChart;
