import React from 'react';
import {InputField} from "./components/InputField/InputField";
import {NotesContainer} from "./components/NotesContainer/NotesContainer";
import css from "./App.module.scss";

function App() {
    return (
        <div className={css.app} >
            <InputField/>
            <NotesContainer/>
        </div>
    );
}

export default App;
