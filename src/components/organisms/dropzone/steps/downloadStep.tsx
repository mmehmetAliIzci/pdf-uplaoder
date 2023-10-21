import { Button } from "@/components/ui/button";
import Image from 'next/image'

export const DownloadStep = () => {
  return (
      <div className='flex flex-1 flex-col items-center justify-center'>
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
