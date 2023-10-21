import React, { ReactNode, useMemo, useState } from 'react';

export type FileUploadFormContextType = {
  currentFormState: {
    step: number;
    files: File[];
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
    currentFormState: { step: 0, files: [] },
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
          },
        }));
      }
    }),
    [data.currentFormState]
  );

  return (
    <FileUploadFormContext.Provider value={contextData}>
      {children}
    </FileUploadFormContext.Provider>
  );
}
