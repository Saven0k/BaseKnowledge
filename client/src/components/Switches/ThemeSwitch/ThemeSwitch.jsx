import './style.css'
import moon from './images/moon.png'
import sun from './images/sun.png'
import { useMyThemeContext } from '../../../services/MyThemeProvider/MyThemeProvider';

/**
 * React component, which reacte button to change theme.
 * @returns button to change theme on site 
 */
const ThemeSwitch = () => {
    const { contextThemeState, updateContextThemeState } = useMyThemeContext();
    return (
        <button
            className="button_change_themes"
            style={{
                backgroundImage: contextThemeState === "dark" ? `url(${moon})` : `url(${sun})`,
                backgroundColor: contextThemeState === "dark" ? `rgb(25, 32, 36)` : `rgb(12, 161, 236)`,
            }}
            onClick={() => {updateContextThemeState(contextThemeState === "dark" ? "light" : "dark")}}
        ></button>
    );
};
export default ThemeSwitch;