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
  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: 'DELETE'
      });
      const updatedUsers = users.filter(user => user._id !== userId);
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
    <div>
      <h2>Admin Page</h2>

      {/* Form to add a new user */}
      <form onSubmit={(e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const teamname = e.target.teamname.value;
        addUser(username, teamname);
        e.target.reset();
      }}>
        <label>
          Username:
          <input type="text" name="username" />
          Team:
          <input type="text" name="teamname" />
        </label>
        <button type="submit">Add User</button>
      </form>

      {/* List of users */}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Form to change team name */}
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

      <p>Current Team Name: {teamName}</p>
    </div>
  );
};

export default AdminPage;
