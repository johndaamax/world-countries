import { useEffect, useState } from 'react';
import { useThemeContext } from '../../context';

import styles from './style.module.scss'

interface SelectProps {
    defaultText: string,
    optionsList: string[],
    selected: string,
    getRegion: (option: string) => void
}

const Select = ({ defaultText, optionsList, selected, getRegion }: SelectProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const { theme } = useThemeContext()

    useEffect(() => {
        //add event listener to handle clicks that happen outside
        //the select container
        document.addEventListener("mousedown", handleClickOutside);
        return (() => document.removeEventListener("mousedown", handleClickOutside))
    })

    const handleClickOutside = (e: any) => {
        if (
            !e.target.classList.contains("custom-select-option") &&
            !e.target.classList.contains(styles.SelectedText)
        ) {
            setIsOpen(false)
        }
    };

    const handleListDisplay = () => {
        setIsOpen(prev => !prev)
    };

    const handleOptionClick = (option: string) => {
        setIsOpen(false)
        getRegion(option)
    };

    return (
        <div className={styles.container}>
            <div
                className={isOpen ? `${styles.SelectedText} ${theme}-secondary active` : `${styles.SelectedText} ${theme}-secondary`}
                onClick={handleListDisplay}
            >
                {selected || defaultText}
            </div>
            {isOpen && (
                <ul className={`${theme}-secondary`}>
                    {optionsList.map(option => {
                        return (
                            <li
                                className="custom-select-option"
                                data-name={option}
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