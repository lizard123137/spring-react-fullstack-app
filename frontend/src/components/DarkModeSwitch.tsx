import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTheme from "../hooks/useTheme"

export default function DarkModeSwitch() {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return(
        <button className="py-8 px-10 text-4xl" onClick={() => toggleDarkMode()}>
            {
                isDarkMode && <FontAwesomeIcon icon={faMoon}/>
            }
            {
                !isDarkMode && <FontAwesomeIcon icon={faSun}/>
            }
        </button>
    )
}