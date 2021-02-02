import "./footerstyle.css";
import fb from './img/fb.png';
import ig from './img/ig.png';
import lin from './img/in.png';
import tw from './img/tw.png';
import ytu from './img/ytu.png';


const Footer = () =>{
    return(
        <footer className="footer">
        <h1>Follow Us</h1>
        <ul className="socials">
            <li><img src={fb}/></li>
            <li><img src={ig}/></li>
            <li><img src={lin}/></li>
            <li><img src={tw}/></li>
            <li><img src={ytu}/></li>
        </ul>
        
        </footer>
    );
}

export default Footer;