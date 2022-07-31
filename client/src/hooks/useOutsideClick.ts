import { RefObject, useEffect } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = ({ target }: Event) => {
    if (ref.current && !ref.current.contains(target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;