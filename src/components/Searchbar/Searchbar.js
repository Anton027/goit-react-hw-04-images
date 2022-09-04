
import css from './SearchBar.module.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillCaretRight } from "react-icons/ai";
import { useState } from 'react';

function Searchbar({ onSubmit }) {
    const [imageName, setImageName] = useState('');

    const handleNameChange = e => {
        setImageName(e.currentTarget.value)
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (e.currentTarget.input.value.trim() === '') {
            toast('Please write correct picture name');
            return;
        }
        onSubmit(imageName);
        setImageName('');
    };

    return (
            <header className={css.Searchbar} >
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        
                        <AiFillCaretRight size="28" />
                    </button>
                    <input
                        className={css.SearchFormInput}
                        name="input"
                        type="text"
                        value={imageName}
                        onChange={handleNameChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
} 

export default Searchbar;