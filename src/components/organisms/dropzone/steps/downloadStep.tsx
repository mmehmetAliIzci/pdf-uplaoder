'use client';
import Image from 'next/image';
import { useContext } from 'react';
import { FileUploadFormContext } from './fileUploadFormContext';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TypographyH6 } from '@/components/ui/typography/h6';

export const DownloadStep = () => {
  const { currentFormState, resetForm } = useContext(FileUploadFormContext);

  return (
    <div className='flex h-96 flex-col items-center justify-center'>
      <Image
        alt='download pdfs'
        src='./download.svg'
        width={47}
        height={32}
        className='mb-1'
      />
      {currentFormState.files.map((file, index) => (
        <div key={index} className='flex items-center space-x-4'>
          {file.name}
        </div>
      ))}

      <TypographyH6>Your files are ready</TypographyH6>
      <Link
        href={`https://filetools13.pdf24.org/client.php?mode=download&action=downloadJobResult&jobId=${currentFormState.jobId}`}
        prefetch={false}
        className='text-secondary-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md rounded-sm bg-secondary px-3 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-secondary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
      >
        Download
      </Link>
      <Separator className='my-4 w-96 bg-gray-400' />
      <Button onClick={resetForm} variant={'ghost'} className={'mb-2'}>
        <Image
          alt='preview button'
          src='./restart.svg'
          className='pr-2'
          width={30}
          height={30}
        />
        Restart
      </Button>
    </div>
  );
};
