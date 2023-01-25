// Ref: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import type React from 'react';
import { useEffect } from 'react';

export default function useClickOutside(
  // That's a stupid rule because I can't pass 'null' if it expects 'undefined'
  // eslint-disable-next-line @typescript-eslint/ban-types
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as unknown as Node)
      ) {
        callback();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
