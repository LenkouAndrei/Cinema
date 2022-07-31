import React from 'react';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ISelectConfig, TSortListItem } from '../../types/types';
import './result-sort.scss';

const blockName = 'result-sort';

interface ISelectProps extends ISelectConfig {
    onSortClick: (isOpen: boolean, title?: TSortListItem) => void;
}

type TResultSort = (props: ISelectProps) => JSX.Element;

export const ResultSort: TResultSort = ({
    showOptionList,
    options,
    chosenOption,
    onSortClick}: ISelectProps) => {
    const listItems: JSX.Element[] = options.map(option => {
        return <li
            className={`${blockName}__item`}
            key={option}>
                <button
                    className={`${blockName}__btn`}
                    onClick={() => onSortClick(!showOptionList, option) }>{option}</button>
            </li>;
    });

    return <div className={`${blockName}__container`}>
            <span className={`${blockName}label`}>Sort By:</span>
            <div className={`${blockName}__container--btn`}>
                <button
                    className={`${blockName}__btn untracked`}
                    onClick={() => onSortClick(!showOptionList, chosenOption) }>
                    <span>{ chosenOption }</span>
                    <FontAwesomeIcon
                        className={`${blockName}__icon--bright`}
                        icon={ showOptionList ? faAngleUp : faAngleDown }/>
                </button>
                {showOptionList && (
                    <ul className={`${blockName}__list`}>
                        {listItems}
                    </ul>
                )}
            </div>
        </div>;
};