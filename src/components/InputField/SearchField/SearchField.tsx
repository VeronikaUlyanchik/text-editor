import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import {selectTag} from "../../../bll/reducers/notesReducer";
import {Button} from "../../Button/Button";
import css from "./SearchField.module.scss"


export const SearchField = () => {
    const dispatch = useAppDispatch();
    const notes = useAppSelector(state => state.notes.tags);
    const selectedTag = useAppSelector(state=> state.notes.selectTag);
    const tags = notes.map(i => <div onClick={()=>selectTagHandler(i.tag)}>{i.tag}</div>)

    const selectTagHandler = (value:string) => {
        dispatch(selectTag(value))
    }

    return <div>
        <div className={css.searchContainer}> Filter by tag : {selectedTag} </div>
        <div>{tags}</div>
        <Button name={'Reset filter'} callback={()=> dispatch(selectTag(''))}/>
    </div>
}