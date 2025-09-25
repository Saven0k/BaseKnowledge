import { Link } from 'react-router-dom';
import './style.css';
import icon from './icon.png';

const Header = () => {
    return (
        <header className="header">
            <Link to={'/'}>
                <img height='28px' src={icon} alt="Логотип сайта" />
            </Link>
            <Link to={'/worth'} className="header__link">
                Ценности
            </Link>
            <Link to={'/missions'} className="header__link">
                Миссии
            </Link>
            <Link to={'/login'} className='header__link'>
                Вход
            </Link>
        </header>
    )
}

export default Header;