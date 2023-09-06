"use client"
import React, { useEffect } from "react";
import { Switch } from "antd";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  // Handle theme toggle
  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    // Update the Ant Design switch state based on the current theme
    const isDarkMode = theme === "dark";
    // You can customize the Ant Design Switch defaultChecked value based on your initial theme preference.
    // For example, if your default theme is light, you can set defaultChecked to false.
    const defaultChecked = isDarkMode;

    // Update the switch state when the theme changes
    if (defaultChecked !== undefined && defaultChecked !== isDarkMode) {
      setTheme(defaultChecked ? "dark" : "light");
    }
  }, [theme]);

  const switchStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#00ff00",
    boxShadow: theme === "dark" ? "2px 2px 2px rgba(0, 0, 0, 0.2)" : "2px 2px 2px rgba(0, 0, 0, 0.2)", // Add boxShadow for elevation
  };

  return (
    <div>
      <Switch
        style={switchStyle} // Apply the inline style to the Switch component
        checked={theme === "dark"}
        onChange={handleThemeToggle}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        size="small" // Set the size to "small" to remove hover effect
      />
    </div>
  );
};

export default ThemeSwitcher;
