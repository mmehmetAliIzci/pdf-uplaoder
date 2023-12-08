import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export const FullScreenModal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
        <div className='relative h-full w-full rounded bg-white pb-24 shadow-lg'>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default FullScreenModal;
