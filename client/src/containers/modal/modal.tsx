import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal.scss';

interface IModalProps {
    handleClose: () => void;
    isOpen: boolean;
    children: JSX.Element;
}

type TModal = (props: IModalProps) => JSX.Element;
type TStopProppagation = (event: MouseEvent) => void;

const blockName = 'modal';
const stopPropagation: TStopProppagation = (event: MouseEvent) => event.stopPropagation();

export const Modal: TModal = ({ handleClose, isOpen, children }: IModalProps): JSX.Element => {
    const content: JSX.Element = (
      isOpen && <aside
        className={`${blockName}__overlay`}
        onClick={handleClose}>
        <div className={blockName}>
          <button
              className={`${blockName}__btn`}
              onClick={handleClose}>
              <FontAwesomeIcon
                  className={`${blockName}__icon`}
                  icon={faTimes}
                  size='2x'/>
          </button>
          <section
            className={`${blockName}__content`}
            onClick={stopPropagation}>
            {children}
          </section>
        </div>
      </aside>
    );

    return ReactDOM.createPortal(content, document.querySelector('#root'));
  };