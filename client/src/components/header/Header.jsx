import { Link } from 'react-router-dom';
import './style.css';
import hexlet from './hexlet.jpg';

const Header = () => {
    return (
        <header className="header">
            <Link to={'/'}>
                <img height='28px' src={hexlet} alt="icons" />
            </Link>
            <Link to={'/worth'}>
                <p className="header_link">Ценности</p>
            </Link>
            <Link to={'/missions'}>
                <p className="header_link">Миссии</p>
            </Link>
            <Link to={'/login'}  className='header_link'>Вход</Link>
        </header>
    )
}

export default Header;