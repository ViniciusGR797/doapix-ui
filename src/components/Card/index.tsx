import styles from './styles.module.scss'
import React from 'react';
import Image from "next/image";
import LoadingBar from '../LoadingBar';

interface CardProps {
    urlImage: string;
    name: string;
    description: string;
    percentage: number;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ urlImage, name, description, percentage, onClick, ...rest }) => {
    const adjustedTextPercentage = Math.max(percentage, 0);
    const adjustedPercentage = Math.min(Math.max(percentage, 0), 100);
    
    return (
        <div className={styles.card} onClick={onClick} {...rest}>
            <div className={styles.image}>
                <Image src={urlImage} alt={name} width={300} height={300} style={{ objectFit: "cover" }} />
            </div>

            <div className={styles.cardDetails} >
                <h2>{name}</h2>
                <p>{description}</p>
                <LoadingBar percentage={percentage}/>
            </div>
        </div>
    );
};

export default Card;
