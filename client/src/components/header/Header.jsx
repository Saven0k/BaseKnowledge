import { Link } from 'react-router-dom';
import './style.css'

const Header = () => {
    return (
        <header className="header">
            <Link>
                <img src="" alt="Тут будет иконка" />
            </Link>
            {/* Реализовать поиск по сайту */}
            <Link className='header_link'>Преподавателям</Link>
            <Link className='header_link'>Пример</Link>
        </header>
    )
}

export default Header;