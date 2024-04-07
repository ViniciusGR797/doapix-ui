import styles from "./styles.module.scss";
import { useState } from "react";
import { InputHTMLAttributes } from "react";

import { NumericFormat } from 'react-number-format';
import { Input } from "../Input";
import React from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string | undefined
    placeholder: string
    value: string
    onChange: (e: any) => void
}

export function InputMonetary({ className, placeholder, value, onChange, ...rest}: InputProps){

    return(
        <NumericFormat 
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        prefix={'R$  '} 
        decimalScale={2} 
        allowNegative={false} 
        decimalSeparator=","
        thousandSeparator=" "
        fixedDecimalScale={true}
        customInput={Input}
        />
    )
}
