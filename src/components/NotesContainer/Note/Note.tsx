import React, {memo, useState} from 'react';
import css from './Note.module.scss'
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {Button} from "../../Button/Button";
import {addTag, deleteNote, deleteTag, editNote} from "../../../bll/reducers/notesReducer";
import {NoteCreationForm} from "../../InputField/NoteCreationForm/NoteCreationForm";
import {v1} from "uuid";
import {AddTagContainer} from "../AddTagContainer/AddTagContainer";

type NoteType = {
    text: string
    id: string
    title: string
}

export const Note = memo(({text, id, title}: NoteType) => {
    const notes = useAppSelector(state => state.notes.notes);
    const tags = notes.filter(i => i.id === id)[0].tags;
    const dispatch = useAppDispatch();
    const [openNote, setOpenMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    const [newText, setNewText] = useState<string>(text);

    const editNotes = () => {
        if (text && title) {
            const tags = Array.from(new Set(newText.match(/#[a-zA-Z0-9А-Яа-я]+/g)))?.map(i => ({
                id: v1(),
                tag: i
            })) || []
            dispatch(editNote({id, title: newTitle, text: newText, tags}));
            tags.forEach(i => dispatch(addTag(i)));
            setEditMode(false);
        }
    }
    let textForRender = text.split(' ').map(i => <span style={{margin: 2}}>{i}</span>);
    if (tags) {
        const tagsArray = tags.map(i => i.tag.slice(1, i.tag.length));
        const tagsArrayWithHash = tags.map(i => i.tag);
        textForRender = text.split(' ').map(i => tagsArray.includes(i) || tagsArrayWithHash.includes(i) ?
            <span style={{color: 'red', margin: 2}}>{i}</span> : <span style={{margin: 2}}>{i}</span>)
    }

    return (
        <div className={css.note}>
            {editMode
                ? <NoteCreationForm callback={editNotes} title={newTitle} text={newText} setText={setNewText}
                                    setTitle={setNewTitle}/>
                : <>
                    <div onClick={() => setOpenMode(!openNote)} className={css.title}> {title}</div>
                    <Button name={'Delete'} callback={() => dispatch(deleteNote({id}))}/>
                    <Button name={'Edit'} callback={() => setEditMode(true)}/>
                    {openNote && <div className={css.text}>{textForRender}</div>}</>
            }
            <div> { tags && tags.map(i => <><span key={i.id}>{i.tag} </span> <span className={css.delete} onClick={()=>dispatch(deleteTag({id, tag: i.tag}))}> x </span></>)}</div>
            <AddTagContainer id={id}/>
        </div>
    )
});