import barInfo from "../../assets/barInfo.json";
import "./IndStandingRow.css"

const IndStandingRow = ({userProfile}) => {
  
  let score = 0
  const barTags = ["bar0", "bar1", "bar2", "bar3", "bar4", "bar5"]
  barTags.forEach((tag) => {
    const barScore = userProfile[tag]
    if (barScore != 2) {
      score += barScore
    }
  })

  const handleCollapse = (event) => {
    const button = event.currentTarget; // Get the button element that triggered the event
    button.classList.toggle("active");

    const content = button.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  }

  return (
    <div>
      <button className="collapsible" onClick={handleCollapse}>
        <div className="profile_summary">
          <p>{userProfile.name}</p>
          <p>{score}</p>
        </div>
      </button>
      <div className="content">
        <p>TEMP</p>
      </div>
    </div>
  )
}

export default IndStandingRow