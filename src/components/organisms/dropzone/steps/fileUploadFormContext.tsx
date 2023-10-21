import React, { ReactNode, useMemo, useState } from 'react';

export type FileUploadConfig = {
  dpi: number;
  imageQuality: number;
  grayScale: boolean;
};
export type FileUploadFormContextType = {
  currentFormState: {
    step: 0 | 1 | 2;
    files: File[];
    configuration?: FileUploadConfig;
    jobId?: string;
  };
  updateFormState?: (payload: FileUploadFormContextType) => void;
  deleteFile?: (file: File) => void;
  resetForm?: () => void;
};

export const FileUploadFormContext =
  React.createContext<FileUploadFormContextType>(
    {} as FileUploadFormContextType
  );

export function FileUploadFormProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FileUploadFormContextType>({
    currentFormState: {
      step: 0,
      files: [],
      configuration: { dpi: 144, imageQuality: 100, grayScale: false },
    },
    updateFormState: (_: FileUploadFormContextType) => {},
  });

  const contextData = useMemo(
    () => ({
      currentFormState: data.currentFormState,
      updateFormState: (payload: FileUploadFormContextType) =>
        setData((state) => ({ ...state, ...payload })),
      deleteFile: (targetFile: File) => {
        setData((prev) => ({
          ...prev,
          currentFormState: {
            ...prev.currentFormState,
            files: prev.currentFormState.files.filter(
              (file) => file !== targetFile
            ),
          },
        }));
      },
      resetForm: () => {
        setData((prev) => ({
          ...prev,
          currentFormState: {
            step: 0,
            files: [],
            configuration: { dpi: 144, imageQuality: 100, grayScale: false },
          },
        }));
      },
    }),
    [data.currentFormState]
  );

  return (
    <FileUploadFormContext.Provider value={contextData}>
      {children}
    </FileUploadFormContext.Provider>
  );
}
