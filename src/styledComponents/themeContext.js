import React, { createContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from './theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  //   useEffect(() => {
  //     const savedTheme = localStorage.getItem('theme');
  //     if (savedTheme) {
  //       setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
  //   }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
