import React from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import images from '../../constants/images';
import './Navbar.css';

const Navbar = ({ enableSmoothScroll }) => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const Navigate=useNavigate()
  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.gericht} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
      <li className="p__opensans"><a href="#home" onClick={()=>Navigate('/#home')} >Home</a></li>
        <li className="p__opensans"><a href="#about" onClick={()=>Navigate('/#about')} >About</a></li>
        <li className="p__opensans"><a href="#menu" onClick={()=>Navigate('/#menu')}>Menu</a></li>
        <li className="p__opensans"><a href="#awards" onClick={()=>Navigate('/#awards')}>Awards</a></li>
        <li className="p__opensans"><a href="#contact" onClick={()=>Navigate('/#contact')}>Contact</a></li>
        <Link to="/Rooms" className="p__opensans">Rooms</Link>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__opensans" onClick={()=>Navigate('/#login')}>Registration for ourupdates</a>
        <div />
        <Link to="/booktable" className="p__opensans">Book Table</Link>
        <Link to="/bookroom" className="p__opensans">Book Room</Link>

        
      </div>
      <div className="app__navbar-smallscreen">
      {!toggleMenu && (
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true) } />)
        }
        {toggleMenu && (
          <div className="app_navbar-smallscreen_overlay flex_center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} color='#FFD700' className="overlay__close" onClick={() =>setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
            <li><a href="#home" onClick={() => {Navigate('/#home');setToggleMenu(false)}}>Home</a></li>
            <li><a href="#about" onClick={() => {Navigate('/#about');setToggleMenu(false)}}>About</a></li>
              <li><a href="#menu" onClick={() => {Navigate('/#menu');setToggleMenu(false)}}>Menu</a></li>
              <li><a href="#awards" onClick={() => {Navigate('/#awards');setToggleMenu(false)}}>Awards</a></li>
              <li><a href="#contact" onClick={() => {Navigate('/#contact');setToggleMenu(false)}}>Contact</a></li>
              <Link to="/Rooms" className="p__opensans">Rooms</Link>
              <li> <a href="#login" className="p__opensans" onClick={()=>Navigate('/#login')}>Registration for ourupdates</a></li>

              <li><Link to="/booktable" className="p__opensans">Book Table</Link></li>
              <li><Link to="/bookroom" className="p__opensans">Book Room</Link></li>
            
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;