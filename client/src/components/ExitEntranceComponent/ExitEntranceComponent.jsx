import { Link } from "react-router-dom"
import entrance from './images/entrance_ico.svg'
import exit from './images/exit_ico.svg'
import './style.css'

/**
 * React component, which create button with  entrance img;
 * @returns entrance button
 */
export const EntranceComponent = () => {
    return (
        <div className="icoBox">
            <Link to={'/login'}>
                <img className="imgIco" src={entrance} alt="" />
            </Link>
        </div>
    )
}

/**
 * React component, which create button with  exit img;
 * @returns exit button
 */
export const ExitComponent = () => {
    return (
        <div className="icoBox exit">
            <Link to={'/student'}>
                <img className="imgIco" src={exit} alt="" />
            </Link>
        </div>
    )
}