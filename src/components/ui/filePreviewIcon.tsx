import Modal from "@/components/ui/modal";
import { useContext, useState } from "react";

import Image from 'next/image';
import { FileUploadFormContext } from "../organisms/dropzone/steps/fileUploadFormContext";

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
        <Modal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          pdfSource={URL.createObjectURL(file)}
        />
  
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
  }