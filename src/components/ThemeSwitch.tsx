import { useEffect, useState } from "react";

function ThemeSwitch() {
  const [theme, setTheme] = useState<undefined | string>(undefined);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme)
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const newTheme = savedTheme ? savedTheme : (theme ?? 'light')
    document?.querySelector("html")?.setAttribute("data-theme", newTheme);
    if (!theme) {
      setTheme(newTheme);
    }
  }, [theme]);
  return (
    <>
      <input
        type="checkbox"
        className="toggle toggle-sm lg:toggle-md"
        checked={!theme || theme === "light"}
        onClick={toggleTheme}
        readOnly
      />
    </>
  );
}

export default ThemeSwitch;
