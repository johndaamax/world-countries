import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../../context';

import styles from './style.module.scss'

interface SelectProps {
    defaultText: string,
    optionsList: string[],
    selected: string,
    callback: (option: string) => void
}

const Select = ({ defaultText, optionsList, selected, callback }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useThemeContext()

    useEffect(() => {
        //add event listener to handle clicks that happen outside
        //the select container
        document.addEventListener("mousedown", handleClickOutside);
        return (() => document.removeEventListener("mousedown", handleClickOutside))
    })

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
            target.classList.contains("custom-select-option") ||
            target.classList.contains(styles.SelectedText) ||
            target.classList.contains('fa-chevron-down')
        ) return;
        setIsOpen(false);
    };

    const handleListDisplay = () => {
        setIsOpen(prev => !prev)
    };

    const handleOptionClick = (option: string) => {
        setIsOpen(false)
        callback(option)
    };

    return (
        <div className={styles.container}>
            <div
                className={`${styles.SelectedText} ${theme}-secondary`}
                onClick={handleListDisplay}
            >
                {selected || defaultText}
                <i className="fas fa-chevron-down"></i>
            </div>
            {isOpen && (
                <ul className={`${theme}-secondary`}>
                    {optionsList.map(option => {
                        return (
                            <li
                                className={`custom-select-option ${theme}-hover-secondary`}
                                key={option}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );

}


export default Select;