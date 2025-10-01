import { Link } from 'react-router-dom';
import './style.css';
import icon from './icon.png';
import { memo } from 'react';

const Header = memo(() => {
    return (
        <header className="header">
            <Link to={'/'}>
                <img className='header__link-img' src={icon} alt="Логотип сайта" />
            </Link>
            <Link to={'/login'} className='header__link header__link--button'>
                Вход
            </Link>
        </header>
    )
});

export default Header;