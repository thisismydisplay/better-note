import React from "react";
import "./Footer.css";

function Footer() {
    return (<div className="footer">
        <ul className="footer-ul">
            <li className="footer-li"><a className='footer-link' href='https://github.com/thisismydisplay' target="_blank" rel="noreferrer noopener">Github</a></li>
            <li className="footer-li"><a className='footer-link' href='https://www.linkedin.com/in/markrockwellosman/' target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
            <li className="footer-li"><a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' target="_blank" rel="noreferrer noopener">Javascript</a></li>
            <li className="footer-li"><a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/HTML' target="_blank" rel="noreferrer noopener">HTML5</a></li>
            <li className="footer-li"><a className='footer-link' href='https://developer.mozilla.org/en-US/docs/Web/css' target="_blank" rel="noreferrer noopener">CSS3</a></li>
            <li className="footer-li"><a className='footer-link' href='https://reactjs.org/docs/getting-started.html' target="_blank" rel="noreferrer noopener">React</a></li>
            <li className="footer-li"><a className='footer-link' href='https://redux.js.org/introduction/getting-started' target="_blank" rel="noreferrer noopener">Redux</a></li>
            <li className="footer-li"><a className='footer-link' href='https://expressjs.com/' target="_blank" rel="noreferrer noopener">Express</a></li>
            <li className="footer-li"><a className='footer-link' href='https://sequelize.org/' target="_blank" rel="noreferrer noopener">Sequelize</a></li>
            <li className="footer-li"><a className='footer-link' href='https://www.postgresql.org/docs/' target="_blank" rel="noreferrer noopener">PostgreSQL</a></li>

        </ul>
    </div>)
}

export default Footer;
