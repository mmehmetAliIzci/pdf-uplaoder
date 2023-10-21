import { useContext } from 'react';
import { ConfigurationStep } from './steps/configurationStep';
import { FileUploadFormContext } from './steps/fileUploadFormContext';
import { UploadStep } from './steps/uploadStep';

export const DropzoneContent = () => {
  const { currentFormState } = useContext(FileUploadFormContext);
  return (
    <>
      {currentFormState?.step === 0 && <UploadStep />}
      {currentFormState?.step === 1 && <ConfigurationStep />}
      {currentFormState?.step === 2 && <UploadStep />}
    </>
  );
};
