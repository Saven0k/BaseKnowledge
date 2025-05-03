import { Link } from 'react-router-dom';
import './style.css'

const Header = () => {
    return (
        <header className="header">
            <Link to={'/'}>
                <img src="" alt="Тут будет иконка" />
            </Link>
            {/* Реализовать поиск по сайту */}
            <Link to={'/login'}  className='header_link'>Преподавателям</Link>
            <Link to={'/teacher'} className='header_link'>Пример</Link>
        </header>
    )
}

export default Header;