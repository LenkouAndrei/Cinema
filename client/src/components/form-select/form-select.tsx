import React, { ChangeEvent, MouseEvent, useState, useMemo } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './form-select.scss';

interface ISelectFormProps {
    passSelectedItems: (newGenres: (string[] | string)) => void;
    appliedItems: string[];
    allItems: { name: string, id: string }[];
    placeholder: string;
    multiple?: boolean;
}

type TMouseClick = (event: MouseEvent) => void;
type TChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => void;

const blockName = 'form-select';

export function FormSelect({ appliedItems, allItems, placeholder, multiple = true, passSelectedItems }: ISelectFormProps): JSX.Element {
    const [ selectedItems , setSelectedItems ] = useState(appliedItems);
    const [ isOpen , setIsOpen ] = useState(false);

    const toggleSelectDropdown: TMouseClick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if ( !isOpen ) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
        passSelectedItems(selectedItems);
      }
    };

    const updateSelectedItems = (selectedItems: string[], name: string, checked: boolean, multiple: boolean) => {
        if (!multiple) {
            return [name];
        }
        return checked
            ? [ ...selectedItems, name ]
            : selectedItems.filter(item => item !== name);
    }

    const handleCheckboxChange: TChangeEventHandler = (event) => {
        const { checked, name } = event.target as HTMLInputElement;
        setSelectedItems(updateSelectedItems(selectedItems, name, checked, multiple));
    };

    const chosenItemNames = useMemo(() => {
        return selectedItems
            .map(itemId => allItems.find(({ id }) => itemId === id).name)
            .join(', ') || placeholder;
    }, [selectedItems.length, selectedItems[0]])

    const genresList: JSX.Element[] = allItems.map(item => {
        return <li
            className={`${blockName}__item`}
            key={item.id}>
            <label className={`${blockName}__label`}>
                <input
                    className={`${blockName}__checkbox`}
                    type='checkbox'
                    name={item.id}
                    checked={selectedItems.includes(item.id)}
                    onChange={handleCheckboxChange}/>
                {item.name}
            </label>
        </li>;
    });

    return <>
        <button
            className={`${blockName}__btn`}
            onClick={toggleSelectDropdown}>
            <span className={`${blockName}__chosen-items`}>{ chosenItemNames }</span>
            <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faAngleDown}
                size='lg'/>
        </button>
        { isOpen && <ul
            className={`${blockName}__list`}>
            { genresList }
        </ul>}
    </>;
}