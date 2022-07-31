import React from 'react';
import './search.scss';

const blockName = 'search';

type TSearch = () => JSX.Element;

export const Search: TSearch = () => <section className={blockName}>
        <h1 className={`${blockName}__headline`}>Find your movie</h1>
        <div className={`${blockName}__container`}>
            <input
                className={`${blockName}__input`}
                type='text'
                placeholder='What do you want to watch ?'/>
            <button className={`${blockName}__btn`}>Search</button>
        </div>
</section>;