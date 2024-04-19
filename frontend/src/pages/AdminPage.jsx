import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    // State to store users and team name
    const [users, setUsers] = useState([]);
    const [teamName, setTeamName] = useState('');

    // Fetch initial users and team name from the database
    useEffect(() => {
        fetchUsers();
        fetchTeamName();
    }, []);

    // Function to fetch users from the database
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/drink/');
            const data = await response.json();
            console.log(data)
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to fetch team name from the database
    const fetchTeamName = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/drink/');
            const data = await response.json();
            setTeamName(data.teamName);
        } catch (error) {
            console.error('Error fetching team name:', error);
        }
    };

    // Function to add a new user to the database
    const addUser = async (newUsername, newTeamName) => {

        const newUser = {
            name: newUsername,
            teamname: newTeamName,
            bar0: 2,
            bar1: 2,
            bar2: 2,
            bar3: 2,
            bar4: 2,
            bar5: 2
        }

        try {
            const response = await fetch('http://localhost:4000/api/drink/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            const data = await response.json();
            setUsers([...users, data]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Function to delete a user from the database
    const deleteUser = async (userName) => {
        try {
            await fetch(`http://localhost:4000/api/drink/${userName}`, {
                method: 'DELETE'
            });
            const updatedUsers = users.filter(user => user.name !== userName);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to change the team name in the database
    const changeTeamName = async (newTeamName) => {
        try {
            await fetch('http://localhost:4000/api/teamName', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ teamName: newTeamName })
            });
            setTeamName(newTeamName);
        } catch (error) {
            console.error('Error changing team name:', error);
        }
    };

    return (
        <div className="admin-page">
            <h2>Admin Page</h2>

            <div className="add-user-form">
                <h3>Add User</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const username = e.target.username.value;
                    const teamname = e.target.teamname.value;
                    addUser(username, teamname);
                    e.target.reset();
                }}>
                    <div className="form-field">
                        <label>
                            Username: {' '}
                            <input type="text" name="username" />
                        </label>
                    </div>
                    <div className="form-field">
                        <label>
                            Team: {' '}
                            <input type="text" name="teamname" />
                        </label>
                    </div>
                    <div className="form-field">
                        <button type="submit">Add User</button>
                    </div>
                </form>
            </div>

            <div className="users-list">
                <h3>Users List</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.name}>
                            <span>{user.name}</span>
                            <button onClick={() => deleteUser(user.name)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="change-team-form">
                <h3>Change Team Name</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const newTeamName = e.target.teamName.value;
                    changeTeamName(newTeamName);
                    e.target.reset();
                }}>
                    <label>
                        New Team Name:
                        <input type="text" name="teamName" />
                    </label>
                    <button type="submit">Change Team Name</button>
                </form>
            </div>

            <p className="current-team-name">Current Team Name: {teamName}</p>
        </div>
    );
};

export default AdminPage;
