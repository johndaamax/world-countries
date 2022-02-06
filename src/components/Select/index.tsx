import { ReactElement, useEffect, useState } from 'react';
import { useThemeContext } from '../../context';

import styles from './style.module.scss';

interface SelectProps {
  defaultText: string;
  optionsList: string[];
  selected: string;
  callback: (option: string) => void;
}

export default function Select({ defaultText, optionsList, selected, callback }: SelectProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useThemeContext();
  const handleClickOutside = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('custom-select-option') ||
      target.classList.contains(styles.SelectedText) ||
      target.classList.contains('fa-chevron-down')
    ) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    //add event listener to handle clicks that happen outside
    //the select container
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleListDisplay = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string): void => {
    setIsOpen(false);
    callback(option);
  };

  const handleListDisplayKeypress = (event: React.KeyboardEvent): void => {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      handleListDisplay();
    }
  };
  const handleListItemKeypress = (event: React.KeyboardEvent, option: string): void => {
    event.preventDefault();
    if (event.key === 'Enter' || event.key === ' ') {
      handleOptionClick(option);
    }
  };

  return (
    <div className={styles.container}>
      <div
        role="menu"
        tabIndex={0}
        className={`${styles.SelectedText} ${theme}-secondary ${theme}-hover-secondary`}
        onClick={handleListDisplay}
        onKeyPress={handleListDisplayKeypress}>
        {selected || defaultText}
        <i className="fas fa-chevron-down" />
      </div>
      {isOpen && (
        <ul className={`${theme}-secondary`}>
          {optionsList.map((option) => {
            return (
              <li
                tabIndex={0}
                role="menuitem"
                className={`custom-select-option ${theme}-hover-secondary`}
                key={option}
                onClick={(): void => handleOptionClick(option)}
                onKeyPress={(event): void => handleListItemKeypress(event, option)}>
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
