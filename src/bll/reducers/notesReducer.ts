import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import Data from "../../data/data.json";

export type NoteType = {
    id: string
    text: string
    title: string
    tags: TagsType[]
}

export type TagsType = {
    id: string
    tag: string
}

export type StateType = {
    notes: NoteType[]
    tags: TagsType[]
    selectTag: string
}

const initialState: StateType = {
    notes: Data.notes,
    tags: Data.tags,
    selectTag: '',
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote(state, action: PayloadAction<{ title: string, text: string, tags: { id: string, tag: string }[] }>) {
            const newNote = {
                id: v1(), ...action.payload,
            };
            state.notes.push(newNote);
        },
        deleteNote(state, action: PayloadAction<{ id: string }>) {
            const found = current(state.notes.filter(i => i.id === action.payload.id)[0]);
            const allTags: string[] = [];
            state.notes.forEach(i => {
                i.tags.forEach(t => {
                    allTags.push(t.tag)
                })
            });
            found.tags.forEach(i => {
                if (allTags.filter(t => t === i.tag).length > 1) {
                    return
                } else {
                    state.tags = state.tags.filter(f => f.tag !== i.tag);
                }
            });
            state.notes = state.notes.filter(i => i.id !== action.payload.id);
        },
        editNote(state, action: PayloadAction<{ id: string, title: string, text: string, tags: { id: string, tag: string }[] }>) {
            const found = current(state.notes.filter(i => i.id === action.payload.id)[0]);
            let tags: TagsType[] = found.tags;
            action.payload.tags.forEach((i, index) => {
                if (found.tags.find(t => t.tag === i.tag)) {
                    tags = found.tags || []
                } else {
                    tags = action.payload.tags || []
                }
            })
            state.notes = state.notes.map(i => i.id === action.payload.id ? ({...i, ...action.payload, tags}) : i);
        },
        addTagToNote(state, action: PayloadAction<{ id: string, tag: TagsType }>) {
            state.notes = state.notes.map(i => i.id === action.payload.id ? ({
                ...i,
                tags: [...i.tags, action.payload.tag]
            }) : i);
        },
        addTag(state, action: PayloadAction<TagsType>) {
            if (!state.tags.find(i => i.tag === action.payload.tag)) {
                state.tags = [action.payload, ...state.tags]
            }
        },
        selectTag(state, action: PayloadAction<string>) {
            state.selectTag = action.payload
        },
        deleteTag(state, action: PayloadAction<{id:string, tag:string}>){
            state.tags = state.tags.filter(i=> i.tag !== action.payload.tag);
            state.notes = state.notes.map(i => i.id === action.payload.id ? ({...i, tags: i.tags.filter(i=> i.tag !== action.payload.tag)}) : i);

        }
    }
});

export const {addNote, deleteNote, editNote, addTag, selectTag, addTagToNote, deleteTag} = notesSlice.actions;

export const notesReducer = notesSlice.reducer;