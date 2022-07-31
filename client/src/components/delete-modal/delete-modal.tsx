import React, { useCallback } from 'react';
import './delete-modal.scss';

const blockName = 'delete-modal';

interface IDeletModalProps {
    title: string;
    onDeleteConfirm(): void;
}

type TDeleteModal = (props: IDeletModalProps) => JSX.Element;

export const DeleteModal: TDeleteModal = ({ title, onDeleteConfirm }: IDeletModalProps): JSX.Element => {
    const confirmDelete = useCallback(() => onDeleteConfirm(), []);

    return <div className={blockName}>
        <h2 className={`${blockName}__headline`}>Delet Movie</h2>
        <span className={`${blockName}__warning`}>
            { `Are you shure, you want to delete '${title}' movie?` }
        </span>
        <button
            className={`${blockName}__btn--confirm`}
            onClick={confirmDelete}>Confirm</button>
    </div>;
};