import { useContext } from 'react';
import { CompressStep } from './steps/compressStep';
import { FileUploadFormContext } from './steps/fileUploadFormContext';
import { FileSelectionStep } from './steps/fileSelectionStep';
import { DownloadStep } from './steps/downloadStep';

export const DropzoneContent = () => {
  const { currentFormState } = useContext(FileUploadFormContext);

  return (
    <>
      {currentFormState?.step === 0 && <FileSelectionStep />}
      {currentFormState?.step === 1 && <CompressStep />}
      {currentFormState?.step === 2 && <DownloadStep />}
    </>
  );
};
