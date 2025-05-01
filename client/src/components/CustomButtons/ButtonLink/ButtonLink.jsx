import { Link } from "react-router-dom";
import './style.css'

const ButtonLink = ({ children, link }) => {
    return (
        <Link to={`${link}`}>
            <button
                className="buttonLink">
                {children}
            </button>

        </Link>
    )
}
export default ButtonLink;