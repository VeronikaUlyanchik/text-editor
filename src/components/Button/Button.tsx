import React from 'react';
import css from './Button.module.scss'

type ButtonType = {
    name: string
    callback: Function
}


export const Button = ({name, callback}: ButtonType) => {
    const onClickHandler = () => {
        callback()
    }

    return (
        <button className={css.button} onClick={onClickHandler}>{name}</button>
    )
}