import '../styles/footer.css';
import fb from '../img/fb.png';
import ig from '../img/ig.png';
import lin from '../img/in.png';
import tw from '../img/tw.png';
import ytu from '../img/ytu.png';


const Footer = () =>{
    const year = new Date().getFullYear();

    return(
        <footer className="footer">
          <h3 className="follow">Follow Us</h3>
          <div className="socials-container">
            <div className="buttons">
                <button className="button">About Us</button>
                <button className="button">Contact Us</button>
              </div>
              <ul className="socials">
                  <li><img src={fb} alt="icon"/></li>
                  <li><img src={ig} alt="icon"/></li>
                  <li><img src={lin} alt="icon"/></li>
                  <li><img src={tw} alt="icon"/></li>
                  <li><img src={ytu} alt="icon"/></li>
              </ul>
              
            </div>
          <p>The Hacker News: {year} Copyright</p>
        </footer>
    );
}

export default Footer;