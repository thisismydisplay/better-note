import React from "react";
import "./Footer.css";

function Footer() {
    return (<div className="footer">
        <ul className="footer-ul">
            <li className="footer-li"><a className='footer-link' href='https://github.com/thisismydisplay'>Github</a></li>
            <li className="footer-li"><a className='footer-link' href='https://www.linkedin.com/in/markrockwellosman/'>LinkedIn</a></li>
            <li className="footer-li"><a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'>Javascript</a></li>
            <li className="footer-li"><a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/HTML'>HTML5</a></li>
            <li className="footer-li"><a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/css'>CSS3</a></li>
            <li className="footer-li"><a className='footer-link' href='https://reactjs.org/docs/getting-started.html'>React</a></li>
            <li className="footer-li"><a className='footer-link' href='https://redux.js.org/introduction/getting-started'>Redux</a></li>
            <li className="footer-li"><a className='footer-link' href='https://expressjs.com/'>Express</a></li>
            <li className="footer-li"><a className='footer-link' href='https://sequelize.org/'>Sequelize</a></li>
            <li className="footer-li"><a className='footer-link' href='https://www.postgresql.org/docs/'>PostgreSQL</a></li>

        </ul>
        {/* <hr className="footer-spacer"></hr> */}
    </div>)
}

export default Footer;
