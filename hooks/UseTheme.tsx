'use client';

import { useState } from 'react';

const lightColors = {
  primary: '#101010',
  secondary: '#7f7f7f',
  background: '#efefef',
  border: '#303030',
};

const darkColors = {
  primary: '#efefef',
  secondary: '#7f7f7f',
  background: '#101010',
  border: '#b0b0b0',
};

const UseTheme = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return { colors, currentTheme: theme, toggleTheme };
};

export default UseTheme;
