import React, { useState } from 'react';
import styles from './styles.module.scss';
import { RiArrowDropDownLine, RiArrowDropUpLine  } from "react-icons/ri";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void; 
  defaultOption?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, defaultOption, ...rest }) => {
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
    <div className={styles.dropdown} {...rest} >
      <button className={styles.dropdownToggle} onClick={handleToggle}>
        {selectedOption || defaultOption || 'Selecione uma opção'}
        {isOpen ? <RiArrowDropUpLine size={35} /> : <RiArrowDropDownLine size={35} />}                     
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
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
