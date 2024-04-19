import React, { useState, useEffect } from 'react';
import barInfos from "../assets/barInfo.json";
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { username } = useParams();

    // State to store selected drinks and scores
    const [selectedDrinks, setSelectedDrinks] = useState({});
    const [scores, setScores] = useState({});

    // Mapping object for drink scores
    const drinkScores = {
        eagle: -2,
        birdie: -1,
        par: 0,
        bogey: 1,
        none: 2
    };

    // Fetch scores for the user when component mounts
    useEffect(() => {
        const fetchUserScores = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/drink/${username}`, {
                    method: 'GET',
                }) // Replace with actual URL
                const data = await response.json();
                // setScores(data); // Set scores state with fetched data
                const filteredData = Object.keys(data)
                    .filter(key => key.startsWith('bar')) // Filter only keys starting with 'bar'
                    .reduce((obj, key) => {
                        obj[key] = data[key]; // Assign key-value pair to the new object
                        return obj;
                    }, {});

                setScores(filteredData)
            } catch (error) {
                console.error('Error fetching user scores:', error);
            }
        };

        fetchUserScores(); // Fetch user scores when component mounts
    }, [username]); // Include username as a dependency

    useEffect(() => {
        const scoreDrinks = {
            "-2": "eagle",
            "-1": "birdie",
            "0": "par",
            "1": "bogey",
            "2": "none"
        };

        // Map user scores to drinks at the bar
        const mappedDrinks = {};
        barInfos.bar_info.forEach(barData => {
            const bar_score = scores[barData.bar_number];
            const bar_score_word = scoreDrinks[bar_score];
            mappedDrinks[barData.bar_name] = bar_score_word;
        });
        setSelectedDrinks(mappedDrinks);
    }, [scores])

    // Handle select change for drinks
    const handleSelectChange = (barName, barNumber, event) => {
        setSelectedDrinks({
            ...selectedDrinks,
            [barName]: event.target.value
        });
        setScores({
            ...scores,
            [barNumber]: drinkScores[event.target.value]
        });
    };

    // Function to handle update button click
    const handleUpdateClick = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/drink/${username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scores)
            });
            const data = await response.json();
            console.log('Update successful:', data);
        } catch (error) {
            console.error('Update failed:', error);
        }
        console.log("okay")
    };

    return (
        <div className="user-page">
            <h2>{username}</h2>
            <div className="user-table">
                <table>
                    <thead>
                        <tr>
                            <th>Bar</th>
                            <th>Drink</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barInfos.bar_info.map((barData, index) => (
                            <tr key={index}>
                                <td>{barData.bar_name}</td>
                                <td>
                                    <select
                                        value={selectedDrinks[barData.bar_name] || ''}
                                        onChange={(event) => handleSelectChange(barData.bar_name, barData.bar_number, event)}
                                    >
                                        <option value="none">None</option>
                                        <option value="eagle">{barData.eagle}</option>
                                        <option value="birdie">{barData.birdie}</option>
                                        <option value="par">{barData.par}</option>
                                        <option value="bogey">{barData.bogey}</option>
                                    </select>
                                </td>
                                <td>{scores[barData.bar_number] === 2 ? 'N/A' : scores[barData.bar_number]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={handleUpdateClick}>Update</button>
        </div>
    );
};

export default UserPage;
