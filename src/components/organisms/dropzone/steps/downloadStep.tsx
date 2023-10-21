'use client'
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import { useContext, useEffect } from "react";
import { FileUploadFormContext } from "./fileUploadFormContext";

export const DownloadStep = () => {
    const { currentFormState } = useContext(FileUploadFormContext);
    

  return (
      <div className='flex flex-1 flex-col items-center justify-center'>
        <div>Uploading your files...</div>
        <div>Processing your files...</div>
        <Image
          alt='half cut page'
          src='./half-cut-page.svg'
          width={47}
          height={32}
          className='mb-1'
        />
        <Button variant='secondary' size='lg'>
          Select files
        </Button>
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
      </div>
  );
};
