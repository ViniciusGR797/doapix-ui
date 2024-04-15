import styles from "./styles.module.scss";
import { useState } from "react";
import { InputHTMLAttributes } from "react";

import { PatternFormat } from 'react-number-format';
import { Input } from "../Input";
import React from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string | undefined
  placeholder: string
  value: string
  format: string
  onChange: (e: any) => void
}

export function InputPixKey({ className, placeholder, value, format, onChange, ...rest }: InputProps) {

  return (
    format
      ? <PatternFormat
        className={styles.input}
        placeholder={placeholder}
        format={format}
        value={value}
        allowEmptyFormatting mask="_"
        onChange={onChange}
      />
      : <Input className={styles.inputNoFormat} placeholder={placeholder} type="text" value={value} onChange={onChange} />
  )
}
