import react, { useState } from "react";
import "./footerstyle.css";
import fb from './img/fb.png';
import ig from './img/ig.png';
import lin from './img/in.png';
import tw from './img/tw.png';
import ytu from './img/ytu.png';


const Footer = () =>{
    const year = new Date().getFullYear();
    const [isMouseOver, setMouseOver] = useState(false);
    function mouseOverEvent() {
    setMouseOver(true);
  }
  function mouseOutEvent() {
    setMouseOver(false);
  }

    return(
        <footer className="footer">
        <h3 className="follow">Follow Us</h3>
        <ul className="socials">
            <li><a href=""><img src={fb}/></a></li>
            <li><a href=""><img src={ig}/></a></li>
            <li><a href=""><img src={lin}/></a></li>
            <li><a href=""><img src={tw}/></a></li>
            <li><a href=""><img src={ytu}/></a></li>
        </ul>
        <div className="buttons">
        <button className="button" onMouseOver={mouseOverEvent} style={{ backgroundColor: isMouseOver ? "white" : "transparent" }} onMouseOut={mouseOutEvent}>About Us</button>
        <button className="button" onMouseOver={mouseOverEvent} style={{ backgroundColor: isMouseOver ? "white" : "transparent" }} onMouseOut={mouseOutEvent}>Contact Us</button>
        </div>
        <p>Hacker Desk: {year} Copyright</p>
        </footer>
    );
}

export default Footer;