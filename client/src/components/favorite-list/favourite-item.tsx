
import React, { useEffect, useState } from 'react';
import { IMovie } from '../../types/types';
import './favorite-item.scss';
import { format } from 'date-fns';

export interface IFavoriteMovie {
    movie: IMovie;
    comments: string[];
};

interface IFavoriteItemProps {
    favoriteMovie: IFavoriteMovie;
    onFavoriteEdit(comments: string[]): void;
    onFavoriteDelete(): void;
}

export function FavoriteItem({ favoriteMovie, onFavoriteEdit, onFavoriteDelete }: IFavoriteItemProps): JSX.Element {
    const emptyComment = ' ';
    const [isEdited, setIsEdited] = useState(false);
    const [comments, setComments] = useState([...favoriteMovie.comments, emptyComment]);
    const [clonedComments, setClonedComments] = useState(null);

    const preventAndStop = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleCommentAction = (isEdit: boolean, callback: () => void = () => {}) => (event: any) => {
        preventAndStop(event);
        callback();
        setIsEdited(isEdit);
    }

    const editFavorite = () => {
        const emptylessComment = comments.filter(el => el !== emptyComment);
        onFavoriteEdit(emptylessComment);
    }

    const cloneComments = () => setClonedComments(JSON.parse(JSON.stringify(comments)));
    const resetComments = () => setComments(clonedComments);
    const deleteComment = (idx: number) => (event: any) => {
        preventAndStop(event);
        setComments(comments => {
            return comments.filter((_comment, index) => index !== idx);
        });
        editFavorite();
    }

    const handleEdit = handleCommentAction(true, cloneComments);
    const handleCancel = handleCommentAction(false, resetComments);
    const handleSave = handleCommentAction(false, editFavorite);

    const handleCommentChange = (idx: number) => (event: any) => {
        preventAndStop(event);
        setComments(comments => {
            comments.splice(idx, 1, event.target.value);
            return [...comments];
        });
    }

    const handleDeletefavorite = (event: any) => {
        preventAndStop(event);
        onFavoriteDelete();
    }

    const getComments = () => {
        return comments.filter(el => isEdited ? el : el !== emptyComment)
            .map((comment: string, idx: number) =>
                <li key={idx} className="comments__list-item">
                    {isEdited && <>
                        <textarea
                            className="comments__text"
                            value={comment}
                            onChange={handleCommentChange(idx)} />
                        <button
                            className="search__btn--small"
                            onClick={deleteComment(idx)}>Delete</button>
                    </> || <div>{comment}</div>}
                </li>);
    };

    const getButtons = () => {
        return isEdited ? <>
            <button
                className="search__btn--small"
                onClick={handleSave}>Save</button>
            <button
                className="search__btn--small"
                onClick={handleCancel}>Cancel</button>
        </>
        : <>
            <button
                className="search__btn--small"
                data-edit
                onClick={handleEdit}>Edit Comments</button>
            <button 
                className="search__btn--small"
                onClick={handleDeletefavorite}>Delete Movie From List</button>
        </>
    }

    return <article className="favorite__article">
        <h4 className="favorite__headline">{favoriteMovie.movie.title}</h4>
        <div className="favorite__description">{favoriteMovie.movie.overview}</div>
        <div className="favorite__info info">
            <span className="info__vote">rate: {favoriteMovie.movie.vote_average}</span>
            <span className="info__release">{format(new Date(favoriteMovie.movie.release_date), 'MM/dd/yyyy')}</span>
        </div>
        <div className="favorite__comments-block comments">
            <ul className="comments__list">
                { getComments() }
            </ul>
        </div>
        <div className="favorite__buttons">{ getButtons() }</div>
    </article>;
}