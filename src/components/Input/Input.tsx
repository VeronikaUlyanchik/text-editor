import React, {ChangeEvent} from 'react';
import css from './Input.module.scss'

type InputType = {
    value: string
    callback: Function
    type: string
    height: number
    placeholder: string
}


export const Input = ({type, height, value, callback, placeholder}: InputType) => {

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        callback(e.currentTarget.value)
    }

    return (
        <>
            {type === "textarea"
                ? <textarea placeholder={placeholder} style={{height: `${height}px`}} value={value} className={css.input} onChange={onChangeHandler}/>
                :  <input placeholder={placeholder} type={type} style={{height: `${height}px`}} value={value} className={css.input} onChange={onChangeHandler}/>}
            </>

    )
}