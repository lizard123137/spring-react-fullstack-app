import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";

export default function useTheme() {
    return useContext(ThemeContext);
}