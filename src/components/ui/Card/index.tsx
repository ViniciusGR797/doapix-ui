import styles from './styles.module.scss'
import React from 'react';
import Image from "next/image";

interface CardProps {
    urlImage: string;
    name: string;
    description: string;
    percentage: number;
}

const Card: React.FC<CardProps> = ({ urlImage, name, description, percentage }) => {
    const adjustedTextPercentage = Math.max(percentage, 0);
    const adjustedPercentage = Math.min(Math.max(percentage, 0), 100);
    
    return (
        <div className={styles.card} >
            <div className={styles.image}>
                <Image src={urlImage} alt={name} width={300} height={300} style={{ borderRadius: "2rem", objectFit: "cover" }} />
            </div>

            <div className={styles.cardDetails} >
                <h2>{name}</h2>
                <p>{description}</p>
                <span style={{ display: 'block', textAlign: 'right', marginBottom: '0.3rem' }}>{adjustedTextPercentage}%</span>
                <div className={styles.percentage}>
                    <div className={styles.fillPercentage} style={{ width: `${adjustedPercentage}%` }} ></div>
                </div>
            </div>
        </div>
    );
};

export default Card;
