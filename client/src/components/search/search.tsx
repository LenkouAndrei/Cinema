import React, { useRef, MouseEventHandler, ChangeEvent } from 'react';
import './search.scss';

const blockName = 'search';
interface ISearchProps {
    handleSearch(inputEl: HTMLInputElement): MouseEventHandler<HTMLButtonElement>;
    handleSearchTextChange(event: ChangeEvent<HTMLInputElement>): void;
}

type TSearch = (props: ISearchProps) => JSX.Element;

export const Search: TSearch = ({ handleSearch, handleSearchTextChange }) => {
    const inputEl = useRef(null);
    return <section className={blockName}>
        <h1 className={`${blockName}__headline`}>Find your movie</h1>
        <div className={`${blockName}__container`}>
            <input
                className={`${blockName}__input`}
                type='text'
                placeholder='What do you want to watch ?'
                onChange={handleSearchTextChange}
                ref={inputEl}/>
            <button
                className={`${blockName}__btn`}
                onClick={handleSearch(inputEl.current)}>Search</button>
        </div>
</section>
};