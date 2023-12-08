import { FullScreenModal } from '@/components/ui/fullScreenModal';
import { useContext, useState } from 'react';

import Image from 'next/image';
import { FileUploadFormContext } from '../organisms/dropzone/steps/fileUploadFormContext';
import { Button } from './button';

export const FilePreviewIcon = ({ file }: { file: File }) => {
  const { currentFormState, resetForm, deleteFile } = useContext(
    FileUploadFormContext
  );
  const [showPreview, setShowPreview] = useState(false);

  const handleDelete = (file: File) => {
    if (currentFormState.files.length === 1 && resetForm) {
      resetForm();
    } else if (deleteFile) {
      deleteFile(file);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <FullScreenModal isOpen={showPreview}>
        <iframe
          className='h-full w-full'
          src={URL.createObjectURL(file)}
          frameBorder='0'
        ></iframe>
        <Button
          size={'xs'}
          onClick={() => setShowPreview(false)}
          className='float-right mr-2 mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700'
        >
          Close
        </Button>
      </FullScreenModal>

      <div className='flex flex-row justify-between'>
        <Image
          alt='preview button'
          src='./loupe.svg'
          onClick={() => setShowPreview(!showPreview)}
          className='cursor-pointer'
          width={30}
          height={30}
        />
        <Image
          alt='preview button'
          src='./trash.svg'
          className='cursor-pointer'
          onClick={() => handleDelete(file)}
          width={30}
          height={30}
        />
      </div>
      <Image
        src={'./pdf-icon.svg'}
        width={119}
        height={159}
        alt={`${file.name}`}
      />
      <div className='max-w-64 text-ellipsis'>
        <span className='text-gray text-sm'>
          {(file.size / 1024).toFixed(0)} kb
        </span>
        <span className='text-sm text-gray-500'>{file.name}</span>
      </div>
    </div>
  );
};
