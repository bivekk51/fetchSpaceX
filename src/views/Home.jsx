import React, { useEffect, useState } from 'react';

const Home = () => {
    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const response = await fetch('https://api.spacexdata.com/v5/launches');
                const data = await response.json();
                console.log(data);
                setLaunches(data);
            } catch (error) {
                console.error("Data fetch error", error);
            }
        };
        fetchLaunches();
    }, []);


    const formatDate = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">SpaceX Launches</h1>
            {launches.map(launch => (
                <div key={launch.id} className="border rounded-lg p-4 mb-4 shadow-md">
                    <div className="font-bold text-xl mb-2">{launch.name}</div>
                    <div className="text-gray-600 mb-2">{formatDate(launch.date_utc)}</div>
                    {launch.links.patch.small && (
                        <img src={launch.links.patch.small} alt="Patch" className="w-24 h-24 mb-2" />
                    )}
                    <div className="mb-2">Details: {launch.details}</div>
                    <div>
                        Wikipedia: <a href={launch.links.wikipedia} className="text-blue-500" target="_blank" rel="noopener noreferrer">{launch.links.wikipedia}</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
