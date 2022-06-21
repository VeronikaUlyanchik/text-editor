import React, {KeyboardEvent} from 'react';
import {Button} from "../../Button/Button";
import {Input} from "../../Input/Input";
import css from "./NoteCreationForm.module.scss"

type NoteCreationFormType = {
    callback: Function
    setTitle: (value: string)=> void
    setText: (value: string)=> void
    title: string
    text: string
}

export const NoteCreationForm = ({callback, title, text, setTitle, setText}: NoteCreationFormType) => {

    const onKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if(title && text) {
            if (e.key === 'Enter') {
                callback()
            }
        }
    }

    return (
        <div className={css.container} onKeyPress={onKeyPress}>
            <Input placeholder={'Input title of your note'} type={'text'}  height={30} value={title} callback={setTitle}/>
            <Input placeholder={'Input text of your note'} type={'textarea'}  height={300} value={text} callback={setText}/>
            <Button name={'Save'} callback={callback}/>
        </div>

    )
}