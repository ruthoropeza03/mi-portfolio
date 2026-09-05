import { useEffect, useState } from "react";

function useTheme(initialTheme = "light") {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useTheme;
