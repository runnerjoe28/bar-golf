import barInfo from "../../assets/barInfo.json";
import "./IndStandingRow.css"
import { Link } from 'react-router-dom';

const IndStandingRow = ({ userProfile }) => {

  let barData = []

  const barTags = ["bar0", "bar1", "bar2", "bar3", "bar4", "bar5"]

  barTags.forEach((tag, curBar) => {

    const curBarInfo = barInfo.bar_info[curBar]
    const barScore = userProfile[tag]

    const barDrinks = [
      curBarInfo.eagle,
      curBarInfo.birdie,
      curBarInfo.par,
      curBarInfo.bogey,
      "None"
    ]
    const numbers = [-2, -1, 0, 1, 2]
    // Set up mapping
    const valueMap = {};
    numbers.forEach((val, index) => {
      valueMap[val] = barDrinks[index]
    })

    const barDrink = valueMap[barScore]

    barData.push({
      name: curBarInfo.bar_name,
      drink: barDrink,
      score: barScore
    })
  })

  const handleCollapse = (event) => {
    const button = event.currentTarget; // Get the button element that triggered the event
    button.classList.toggle("active");

    const content = button.parentNode.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  return (
    <div>
      <div className="user_summary">
        <Link to={`/${userProfile.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <p>{userProfile.name}</p>
        </Link>
        <p>{userProfile.score}</p>
        <button className="collapsible" onClick={handleCollapse}></button>
      </div>
      <div className="user_content">
        {barData && barData.map(bar => (
          <div className="user_inner_content">
            <p>{bar.name}</p>
            <div className="user_drink_content">
            <p>{bar.drink}</p>
            </div>
            <div className="user_score_content">
            <p>{bar.score === 2 ? 'N/A' : bar.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndStandingRow