import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeContext";

const useTheme = () => {
    return useContext(ThemeContext);
};

export default useTheme;