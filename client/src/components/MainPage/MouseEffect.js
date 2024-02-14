import React, { useState, useEffect } from 'react';



const MouseEffect = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const updateMousePosition = (e) => {

            const maxPositions = 50;

            setPositions(prevPositions => [
                ...prevPositions.slice(-maxPositions + 1),
                { x: e.clientX, y: e.clientY },
            ]);
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <>
            {positions.map((position, index) => (
                <div key={index} className="mouse-effect" style={{ left: position.x, top: position.y }} >
                    🔆
                </div>
            ))}
        </>
    );
};

export default MouseEffect;
