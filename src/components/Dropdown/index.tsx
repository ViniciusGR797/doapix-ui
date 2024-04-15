import React, { useState } from 'react';
import styles from './styles.module.scss';
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void; 
  defaultOption?: string;
  className?: string | undefined
  styleDropdownToggle?: string | undefined
  styledropdownMenu?: string | undefined
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, defaultOption, className, styleDropdownToggle, styledropdownMenu, ...rest }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption || null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdown} ${className}`} {...rest} >
      <button className={`${styles.dropdownToggle} ${styleDropdownToggle}`} onClick={handleToggle}>
        {/* {selectedOption || defaultOption || 'Selecione uma opção'} */}
        <span className={styles.dropdownToggleText}>
          {selectedOption || defaultOption || 'Selecione uma opção'}
        </span>
        {isOpen ? <RiArrowDropUpLine size={35} /> : <RiArrowDropDownLine size={35} />}                     
      </button>
      {isOpen && (
        <div className={`${styles.dropdownMenu} ${styledropdownMenu}`} >
          {options.map(option => (
            <div
              key={option}
              className={styles.dropdownItem}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
