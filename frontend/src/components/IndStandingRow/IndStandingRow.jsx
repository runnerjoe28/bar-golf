import barInfo from "../../assets/barInfo.json";
import "./IndStandingRow.css"

const IndStandingRow = ({userProfile}) => {
  
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
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  }

  return (
    <div>
      <div className="profile_summary">
          <p>{userProfile.name}</p>
          <p>{userProfile.score}</p>
          <button className="collapsible" onClick={handleCollapse}></button>
      </div>
      <div className="content">
        {barData && barData.map(bar => (
          <div className="inner_content">
            <p>{bar.name}</p>
            <p>{bar.drink}</p>
            <p>{bar.score}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndStandingRow