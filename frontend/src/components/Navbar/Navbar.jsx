import { Link } from 'react-router-dom';
import { FaHouseChimney } from "react-icons/fa6";
import "./Navbar.css"

const Navbar = () => {
  return (
      <div className="navbar-container">
        <Link to="/" className="navbar-home-link">
          <FaHouseChimney size={30}/>
          <span className="navbar-site-name">Blacksburg Bar Golf</span>
        </Link>
      </div>
  );
};

export default Navbar;
