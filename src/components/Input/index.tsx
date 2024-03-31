import styles from "./styles.module.scss";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string | undefined
}

export function Input({ className, ...rest}: InputProps){
    return(
        <input className={`${styles.input} ${className}`} {...rest} />
    )
}