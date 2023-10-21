import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './button';

export const Modal = ({
  isOpen,
  onClose,
  pdfSource,
}: {
  isOpen: boolean;
  onClose: () => void;
  pdfSource: string;
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'>
        <div className='relative h-full w-full rounded bg-white pb-24 shadow-lg'>
          <iframe
            className='h-full w-full'
            src={pdfSource}
            frameBorder='0'
          ></iframe>
          <Button
            size={'xs'}
            onClick={onClose}
            className='float-right mr-2 mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700'
          >
            Close
          </Button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
