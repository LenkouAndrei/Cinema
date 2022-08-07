import React from 'react';
import { usePagination, DOTS, IPaginationHookProps } from '../../hooks/usePagination';
import './pagination.scss';

interface IPaginationProps extends IPaginationHookProps {
    onPageChange(pageTpShow: number): void;
}

export function Pagination({ currentPage, totalCount, siblingCount, pageSize, onPageChange }: IPaginationProps): JSX.Element {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className="pagination-container">
          <li onClick={onPrevious}>
            <div className="arrow left" />
          </li>
          {paginationRange.map(pageNumber => {

            if (pageNumber === DOTS) {
              return <li className="pagination-item dots">&#8230;</li>;
            }
            
            return (
              <li
                onClick={() => onPageChange(pageNumber as number)}
              >
                {pageNumber}
              </li>
            );
          })}
          <li
            onClick={onNext}
          >
            <div className="arrow right" />
          </li>
        </ul>
    );
};