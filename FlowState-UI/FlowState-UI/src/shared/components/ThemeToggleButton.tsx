import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../app/redux/themeSlice';
import { RootState } from '../../app/redux/store';
import { MoonIcon, SunIcon } from './Icons';

const ThemeToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none"
      aria-label="Toggle theme"
    >
      {mode === 'light' ? (
        <MoonIcon />
      ) : (
        <SunIcon />
      )}
    </button>
  );
};

export default ThemeToggleButton;