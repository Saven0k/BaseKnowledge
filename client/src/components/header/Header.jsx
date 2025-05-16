import { Link } from 'react-router-dom';
import './style.css'

const Header = () => {
    return (
        <header className="header">
            <Link to={'/'}>
                <img height='24px' src="https://ru.hexlet.io/vite/assets/logo_ru_light-BpiEA1LT.svg" alt="Тут будет иконка" />
            </Link>
            {/* Реализовать поиск по сайту */}
            <Link to={'/login'}  className='header_link'>Преподавателям</Link>
            <Link to={'/teacher'} className='header_link'>Пример</Link>
        </header>
    )
}

export default Header;