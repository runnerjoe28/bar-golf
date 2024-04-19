import "./TeamStandingRow.css"

const TeamStandingRow = ({teamProfile}) => {
  
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
      <div className="team_profile_summary">
          <p>{teamProfile.teamname}</p>
          <p>{teamProfile.score}</p>
          <button className="collapsible" onClick={handleCollapse}></button>
      </div>
      <div className="content">
        {teamProfile.players && teamProfile.players.map(user => (
          <div className="inner_content">
            <p>{user.name}</p>
            <p>{user.score}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamStandingRow