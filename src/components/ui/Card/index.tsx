import styles from './styles.module.scss'
import React from 'react';

interface CardProps {
  urlImage: string;
  name: string;
  description: string;
  percentage: number;
}

const Card: React.FC<CardProps> = ({ urlImage, name, description, percentage }) => {
  return (
    <div className="card">
      <img src={urlImage} alt={name} />
      <div className="card-details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Percentage: {percentage}%</p>
      </div>
    </div>
  );
};

export default Card;
