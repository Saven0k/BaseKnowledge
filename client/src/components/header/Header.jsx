import { Link } from 'react-router-dom';
import './style.css';
import hexlet from './hexlet.jpg';

const Header = () => {
    return (
        <header className="header">
            <Link to={'/'}>
                <img height='28px' src={hexlet} alt="Тут будет иконка" />
            </Link>
            {/* Реализовать поиск по сайту */}
            <Link to={'/login'}  className='header_link'>Преподавателям</Link>
        </header>
    )
}

export default Header;