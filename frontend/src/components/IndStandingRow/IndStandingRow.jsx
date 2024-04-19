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

  return (
    <div>
      <button className="collapsible">
      TEMP
      </button>
      <div className="content">
        <p>TEMP</p>
      </div>
    </div>
  )
}

export default IndStandingRow