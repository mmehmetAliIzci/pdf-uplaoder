'use client';
import { useContext } from 'react';
import { FileUploadFormContext } from './steps/fileUploadFormContext';
import { Button } from '@/components/ui/button';

export const DropzoneHeader = () => {
  const { currentFormState, resetForm } = useContext(FileUploadFormContext);

  return (
    <div className='grid w-full grid-cols-3 grid-rows-1 place-items-center py-2'>
      <Button
        onClick={() => resetForm && resetForm()}
        variant='ghost'
        className={
          currentFormState.step === 0
            ? 'bg-primary text-white'
            : currentFormState.step > 0
            ? `bg-primary-400 text-muted opacity-40`
            : ''
        }
      >
        Upload your PDFs
      </Button>
      <Button
        variant='ghost'
        disabled={currentFormState.step < 1}
        className={
          currentFormState.step === 1
            ? 'bg-primary text-white'
            : currentFormState.step > 0
            ? `bg-primary-400 text-muted opacity-40`
            : ''
        }
      >
        Choose compression
      </Button>
      <Button
        disabled
        variant='ghost'
        className={currentFormState.step === 2 ? 'bg-primary text-white' : ''}
      >
        Done
      </Button>
    </div>
  );
};
