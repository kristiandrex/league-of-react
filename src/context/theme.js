import { createContext, useCallback, useContext, useState } from "react";

const DEFAULT_COLOR = "#ffd369";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_COLOR);

  const setValue = useCallback((color) => {
    setTheme(color || DEFAULT_COLOR);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setValue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
