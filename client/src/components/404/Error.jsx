import './style.css'
import { Link } from "react-router-dom"

const Error = ({
    code = "404",
    message = "Ошибочка......",
    linkText = "На главную",
    linkTo = "/"
}) => {
    return (
        <div className='error center'>
            <div className="error__block">
                <span className="error__title">{code}</span>
                <span className='error__text'>{message}</span>
                <Link to={linkTo} className='error__link'>
                    {linkText}
                </Link>
            </div>
        </div>
    )
}

export default Error;