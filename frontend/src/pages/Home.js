import { useEffect, useState } from 'react'

// components
import IndStandingRow from '../components/IndStandingRow/IndStandingRow';
import TeamStandingRow from '../components/TeamStandingRow/TeamStandingRow';

const Home = () => {
  const [drinkData, setDrinkData] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const response = await fetch('http://128.173.145.197:4000/api/drink');
        console.log(response)
        const jsonData = await response.json();
        console.log(jsonData)

        const rawTeamData = {}

        // Modify drink data with total scores and sort
        jsonData.forEach((user) => {
          // Calculate user score
          const barTags = ["bar0", "bar1", "bar2", "bar3", "bar4", "bar5"]
          let score = 0
          barTags.forEach((tag) => {
            let barScore = user[tag]
            if (barScore !== 2) {
              score += barScore
            }
          })
          user.score = score

          const condensePlayerData = {
            name: user.name,
            score: user.score
          }

          // Update team scores
          if (rawTeamData[user.teamname]) {
            rawTeamData[user.teamname].score += user.score
            rawTeamData[user.teamname].players.push(condensePlayerData)
          } else {
            rawTeamData[user.teamname] = {score: user.score, players:[condensePlayerData]}
          }
        });

        // Sort user data
        const sortedJsonData = jsonData.sort((a,b) => {
          return a.score - b.score
        })

        const rawArrayTeamData = []

        // Modify team data to array format and sort
        for (const team in rawTeamData) {
          rawArrayTeamData.push({
            teamname: team,
            score: rawTeamData[team].score,
            players: rawTeamData[team].players
          })
        }
        const sortedTeamData = rawArrayTeamData.sort((a,b) => {
          return a.score - b.score
        })
        

        setDrinkData(sortedJsonData);
        // setLoading(false);
        setTeamData(sortedTeamData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setLoading(false);
      }
    };

    fetchData();

  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="home">
      <div className="drink_table">
       <h2 style={{marginBottom: '15px' }}>Individual Standings:</h2>
        {drinkData && drinkData.map(drink => (
          <IndStandingRow userProfile={drink}></IndStandingRow>
        ))}

        <h2 style={{ marginTop: '30px', marginBottom: '15px' }}>Team Standings:</h2>
        {teamData && teamData.map(team => (
          <TeamStandingRow teamProfile={team}></TeamStandingRow>
        ))}
      </div>
    </div>
  )
}

export default Home