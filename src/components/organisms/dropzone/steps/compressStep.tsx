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
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleIcon } from 'lucide-react';
import { useUploadFiles } from './useUploadFiles';
import { CompressPayload, useCompressFiles } from './useCompressFiles';
import { useCompressStatus } from '@/components/organisms/dropzone/steps/useCompressStatus';

export const CompressStep = () => {
  const { currentFormState, updateFormState, resetForm } = useContext(
    FileUploadFormContext
  );
  const [config, setConfig] = useState<FileUploadConfig>({
    dpi: 144,
    imageQuality: 100,
    grayScale: false,
  });
  const [progress, setProgress] = useState(0);

  const {
    loading: uploadLoading,
    success: uploadSuccess,
    error: uploadError,
    uploadFiles,
  } = useUploadFiles();

  const {
    loading: compressLoading,
    success: compressSuccess,
    error: compressError,
    compressFiles,
  } = useCompressFiles();

  const {
    loading: compressStatusLoading,
    error: compressStatusError,
    pollCompressStatus,
  } = useCompressStatus();

  async function compressFilesHandler() {
    setProgress(25);
    const uploadResult = await uploadFiles(currentFormState.files ?? []);
    // arbitrary delay to for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    setProgress(50);

    if (uploadResult && uploadResult.length > 0) {
      const payload: CompressPayload = {
        files: uploadResult,
        dpi: config.dpi,
        imageQuality: config.imageQuality,
        colorModel: config.grayScale ? 'grayscale' : 'normal',
        mode: 'normal',
      };

      const compressResult = await compressFiles(payload);
      setProgress(70);
      // arbitrary delay to for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (compressResult && compressResult.jobId) {
        const compressStatus = await pollCompressStatus(compressResult.jobId);
        if (compressStatus) {
          setProgress(100);
          // arbitrary delay to for better UX

          await new Promise((resolve) => setTimeout(resolve, 500));
          if (updateFormState) {
            updateFormState({
              currentFormState: {
                ...currentFormState,
                step: 2,
                jobId: compressResult.jobId,
              },
            });
          }
        }
      }
    }
  }

  return (
    <>
      {progress !== 0 ? (
        <div className='flex h-96 flex-col items-center justify-center gap-2 px-8'>
          <Progress value={progress} />
          {(uploadLoading || uploadSuccess) && (
            <span className={uploadSuccess ? 'text-gray-400' : ''}>
              Uploading your files... (%{progress})
            </span>
          )}
          {(compressLoading || compressSuccess) && (
            <span className={compressSuccess ? 'text-gray' : ''}>
              Compressing your files... (%{progress})
            </span>
          )}
          {compressStatusLoading && <span>Almost there... (%{progress})</span>}

          {(uploadError || compressError || compressStatusError) && (
            <Alert variant='destructive'>
              <TriangleIcon className='h-4 w-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className='flex flex-col gap-2'>
                Something went wrong compressing your files
                <Button
                  variant='ghost'
                  className='max-w-sm'
                  onClick={resetForm}
                >
                  Reset and try again
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <>
          {/*uploaded files*/}
          <div className='flex flex-1 items-center justify-center space-x-4'>
            {currentFormState.files.length > 0 &&
              currentFormState.files.map((file, index) => (
                <Fragment key={index}>
                  <FilePreviewIcon file={file} />
                  {index < currentFormState.files.length - 1 && (
                    <div className='h-12 border-l-2 border-gray-300'></div>
                  )}
                </Fragment>
              ))}
          </div>

          {/*configuration*/}
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
                  setConfig((prev) => ({
                    ...prev,
                    grayScale: !prev.grayScale,
                  }));
                }}
              />
              <span className='pl-3 text-sm text-muted-foreground'>
                GrayScale
              </span>
            </div>
          </div>

          <div className='my-3 flex justify-center'>
            <Button onClick={compressFilesHandler}>Compress</Button>
          </div>
        </>
      )}
    </>
  );
};
