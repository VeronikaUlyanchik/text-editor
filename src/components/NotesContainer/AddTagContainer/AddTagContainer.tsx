import React, {useState, KeyboardEvent} from 'react';
import {Input} from "../../Input/Input";
import {useAppDispatch} from "../../../bll/store";
import {addTag, addTagToNote} from "../../../bll/reducers/notesReducer";
import {v1} from "uuid";
import {Button} from "../../Button/Button";

type AddTagContainerType = {
    id:string
}

export const AddTagContainer = ({id}:AddTagContainerType )=> {
    const dispatch = useAppDispatch();
    const [tag, setTag] = useState<string>('');

    const addTagHandler = () => {
        if(tag) {
            let trimTag = tag.trim();
            if (!trimTag.includes('#')) {
                trimTag = `#${trimTag}`
            }
            const newTag = {
                id: v1(), tag: trimTag
            }
            dispatch(addTagToNote({id, tag: newTag}))
            dispatch(addTag(newTag))
            setTag('')
        }
    }

    const onKeyPress = (e:KeyboardEvent<HTMLDivElement>) => {
        if(e.key === 'Enter' || e.key === ' '){
            if(tag){
                addTagHandler()
            }
        }
    }

    return (
        <div onKeyPress={onKeyPress}>
            <Input placeholder={'Input new tag'} type={'text'} height={20} value={tag} callback={setTag}/>
            <Button name={'Add Tag'} callback={addTagHandler}/>
        </div>
    )
}