'use client';

import { FileUploadFormProvider } from './steps/fileUploadFormContext';
import { DropzoneContent } from './dropzoneContent';
import { DropzoneHeader } from './dropzoneHeader';

export const Dropzone = () => {
  return (
    <FileUploadFormProvider>
      <div className='bg-primary-200 flex w-full flex-col border-2 border-dotted border-black'>
        <DropzoneHeader />
        <DropzoneContent />
      </div>
    </FileUploadFormProvider>
  );
};
