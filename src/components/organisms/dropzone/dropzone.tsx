'use client';

import { FileUploadFormProvider } from './steps/fileUploadFormContext';
import { DropzoneContent } from './dropzoneContent';
import { DropzoneHeader } from './dropzoneHeader';

export const Dropzone = () => {
  return (
    <FileUploadFormProvider>
      <div className='flex w-full flex-col border-2 border-dotted border-black bg-primary-200'>
        <DropzoneHeader />
        <DropzoneContent />
      </div>
    </FileUploadFormProvider>
  );
};
