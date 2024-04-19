import { useEffect, useState } from 'react'

// components
import IndStandingRow from '../components/IndStandingRow/IndStandingRow';

const Home = () => {
  const [drinkData, setDrinkData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/drink');
        console.log(response)
        const jsonData = await response.json();
        console.log(jsonData)
        setDrinkData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts


  return (
    <div className="home">
      <div className="drink_table">
        {drinkData && drinkData.map(drink => (
          <IndStandingRow userProfile={drink}></IndStandingRow>
        ))}
        <p>Pee pee</p>
      </div>
    </div>
  )
}

export default Home