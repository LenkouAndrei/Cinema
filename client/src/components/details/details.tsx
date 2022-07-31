import React from 'react';
import { IMovie } from '../../types/types';
import './details.scss';

const blockName = 'details';

type TDetails = (props: IMovie) => JSX.Element;

export const Details: TDetails = ({
    title,
    poster_path,
    vote_average,
    tagline,
    release_date,
    runtime,
    overview}: IMovie) => {
    return <article className={blockName}>
        <img
            className={`${blockName}__image`}
            src={poster_path}
            alt={title}/>
        <div className={`${blockName}__info`}>
            <h2 className={`${blockName}__headline`}>
                <span className={`${blockName}__title`}>{ title }</span>
                <span className={`${blockName}__rate`}>{ vote_average }</span>
            </h2>
            <div className={`${blockName}__tag`}>{ tagline }</div>
            <div className={`${blockName}__terms-container`}>
                <span className={`${blockName}__release`}>{ new Date(release_date).getFullYear() }</span>
                <span className={`${blockName}__duration`}>{ `${runtime} min` }</span>
            </div>
            <p className={`${blockName}__description`}>{ overview }</p>
        </div>
    </article>;
};