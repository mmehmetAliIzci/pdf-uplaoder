'use client';
import Image from 'next/image';
import { DragEvent, ChangeEvent, useContext } from 'react';
import { FileUploadFormContext } from './fileUploadFormContext';
import { Progress } from '@/components/ui/progress';

export const FileSelectionStep = () => {
  const { updateFormState, currentFormState } = useContext(
    FileUploadFormContext
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && updateFormState) {
      updateFormState({
        currentFormState: {
          step: 1,
          files: Array.from(files),
        },
      });
    }
  };

  const handleDrop = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files.length && updateFormState) {
      updateFormState({
        currentFormState: {
          step: 1,
          files: Array.from(files),
        },
      });
    }
  };

  return (
    <div className='flex h-96 flex-col items-center justify-center'>
      <form
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className='p-1 text-center'
      >
        <input
          type='file'
          accept='.pdf'
          multiple={true}
          onChange={handleChange}
          style={{ display: 'none' }}
          id='hiddenFileInput'
        />
        <label
          htmlFor='hiddenFileInput'
          className='flex cursor-pointer flex-col items-center'
        >
          <Image
            alt='half cut page'
            src='./half-cut-page.svg'
            width={47}
            height={32}
            className='mb-1'
          />
          <span className='text-sm text-gray-500'>
            or drag and drop files into this area
          </span>
          <Image
            alt='dropbox google image'
            src='./dropbox-google.svg'
            width={121}
            height={18}
            className='mb-1'
          />
        </label>
      </form>
    </div>
  );
};
