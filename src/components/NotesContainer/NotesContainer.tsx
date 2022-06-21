import React from 'react';
import {useAppSelector} from "../../bll/store";
import {Note} from "../NotesContainer/Note/Note";
import css from "./NotesContainer.module.scss"


export const NotesContainer = () => {
    let notes = useAppSelector(state => state.notes.notes);
    const selectedTag = useAppSelector(state=> state.notes.selectTag);

    if (selectedTag) {
        notes = notes.filter(i=> i.tags.map(t=> t.tag).includes(selectedTag))
    }

    const notesMaped = notes.map(note => <Note key={note.id} text={note.text} id={note.id} title={note.title} />)

    return (
            <div className={css.container}> {notesMaped} </div>
    )
};