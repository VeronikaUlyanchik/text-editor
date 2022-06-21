import React, {useState} from 'react';
import {Button} from "../Button/Button";
import {NoteCreationForm} from "./NoteCreationForm/NoteCreationForm";
import css from "./InputField.module.scss"
import {useAppDispatch} from "../../bll/store";
import {v1} from "uuid";
import {addNote, addTag} from "../../bll/reducers/notesReducer";
import {SearchField} from "../InputField/SearchField/SearchField";

export const InputField = () => {
    const dispatch = useAppDispatch();
    const [createNoteMode, setCreateNoteMode] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');

    const sendNotes = () => {
        if (text && title) {
            const tags = Array.from(new Set(text.match(/#[a-zA-Z0-9А-Яа-я]+/g)))?.map(i => ({id: v1(), tag: i})) || []
            dispatch(addNote({title, text, tags}))
            tags.forEach(i=> dispatch(addTag(i)))
            setCreateNoteMode(false)
            setText('')
            setTitle('')
        }
    }
    return (
        <div className={css.container}>
            {createNoteMode ? <NoteCreationForm
                callback={sendNotes}
                setTitle={setTitle}
                setText={setText}
                title={title}
                text={text}
            /> : <Button name={'Create Note'} callback={() => setCreateNoteMode(true)}/>}
            <SearchField/>
        </div>
    )
};