import { Dropzone } from '@/components/organisms/dropzone/dropzone';
import { TypographyH1 } from '@/components/ui/typography/h1';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div className='w-full'>
        <div className='flex py-8'>
          <div className='flex flex-col'>
            <div>
              <TypographyH1>Compress PDF</TypographyH1>
            </div>
            <div>
              PDF compressor to reduce the size of PDF files quickly and easily
            </div>
          </div>

          <div className='flex'>
            <Image
              alt='compress-logo'
              width={80}
              height={80}
              src={'./compress-pdf-logo.svg'}
            />
          </div>
        </div>

        {/* dropzone */}
        <Dropzone/>
        
      </div>
    </main>
  );
}
