import React from "react";

import FindIcon from '../../static/icons/FindIcon.svg'

import './FindCharacter.css'

interface IProps {
  onChange?: (data: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
  placeholder?: string;
}

const FindCharacter: React.FC<IProps> = ({ placeholder, onChange }) => {
  return (
    <div className="input-container">
      <div className="bg-line"></div>
      <img className="find-icon" src={FindIcon} alt="find-icon" />
      <input className="input" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default React.memo(FindCharacter);