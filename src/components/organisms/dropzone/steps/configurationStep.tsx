'use client';
import { Fragment, useContext, useState } from 'react';
import {
  FileUploadConfig,
  FileUploadFormContext,
} from './fileUploadFormContext';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { FilePreviewIcon } from '@/components/ui/filePreviewIcon';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export const ConfigurationStep = () => {
  const { currentFormState, updateFormState } = useContext(
    FileUploadFormContext
  );
  const [config, setConfig] = useState<FileUploadConfig>({
    dpi: 144,
    imageQuality: 100,
    grayScale: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function uploadFilesHandler() {
    setIsLoading(true);
    const results = [];

    try {
      for (const file of currentFormState.files) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        results.push(data);
      }

      // Handle success (e.g. update UI)
    } catch (error) {
      console.error('There was an error uploading the files', error);
      // Handle error (e.g. show error message)
    }
    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <div>Uploading your files...</div>}
      <div className='flex flex-1 flex-col items-center justify-center'>
        {currentFormState.files.length > 0 ? (
          <div className='flex items-center space-x-4'>
            {currentFormState.files.map((file, index) => (
              <Fragment key={index}>
                <FilePreviewIcon file={file} />
                {index < currentFormState.files.length - 1 && (
                  <div className='h-12 border-l-2 border-gray-300'></div>
                )}
              </Fragment>
            ))}
          </div>
        ) : (
          'no files selected'
        )}
      </div>
      <div className='flex w-full flex-col p-8'>
        <span className='max-w-4 text-sm font-bold text-muted-foreground'>
          DPI: {config.dpi}
        </span>
        <Slider
          defaultValue={[config.dpi]}
          max={1000}
          value={[config.dpi]}
          step={5}
          className={cn('w-full py-5', '')}
          onValueChange={(value) =>
            setConfig((prev) => ({ ...prev, dpi: value[0] }))
          }
        />

        <span className='max-w-4 text-sm font-bold text-muted-foreground'>
          Image quality: {config.imageQuality}
        </span>
        <Slider
          defaultValue={[config.imageQuality]}
          max={1000}
          value={[config.imageQuality]}
          step={1}
          className={cn('w-full py-5', '')}
          onValueChange={(value) =>
            setConfig((prev) => ({ ...prev, imageQuality: value[0] }))
          }
        />

        <span className='max-w-4 text-sm font-bold text-muted-foreground'>
          Color Scale
        </span>
        <div className='flex items-center'>
          <span className='pr-3 text-sm text-muted-foreground'>Normal</span>
          <Switch
            checked={config.grayScale}
            onCheckedChange={() => {
              setConfig((prev) => ({ ...prev, grayScale: !prev.grayScale }));
            }}
          />
          <span className='pl-3 text-sm text-muted-foreground'>GrayScale</span>
        </div>
      </div>
      <div className='my-3 flex justify-center'>
        <Button onClick={uploadFilesHandler}>Compress</Button>
      </div>
    </>
  );
};
