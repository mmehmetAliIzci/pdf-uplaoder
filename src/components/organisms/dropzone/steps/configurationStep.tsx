'use client';
import { Fragment, useContext, useState } from 'react';
import { FileUploadFormContext } from './fileUploadFormContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { FilePreviewIcon } from '@/components/ui/filePreviewIcon';
import { Switch } from '@/components/ui/switch';

export const ConfigurationStep = () => {
  const { currentFormState } = useContext(FileUploadFormContext);
  const [config, setConfig] = useState<{
    dpi: number;
    imageQuality: number;
    grayScale: boolean;
  }>({
    dpi: 144,
    imageQuality: 100,
    grayScale: false,
  });
  return (
    <>
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
          onValueChange={(value) => setConfig((prev) => ({ ...prev, dpi: value[0] }))}
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
          onValueChange={(value) => setConfig((prev) => ({ ...prev, imageQuality: value[0] }))}
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
    </>
  );
};
