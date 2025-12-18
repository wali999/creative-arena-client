import React from "react";
import logoLight from "../../assets/Creative-Arena-light.png";
import logoDark from "../../assets/Creative-Arena-Dark.png";
import useTheme from "../../hooks/useTheme";


const Logo = ({ className = "w-14", alt = "Creative Arena" }) => {
    const { theme } = useTheme();

    return (
        <img
            src={theme === "dark" ? logoDark : logoLight}
            className={className}
            alt={alt}
        />
    );
};

export default Logo;