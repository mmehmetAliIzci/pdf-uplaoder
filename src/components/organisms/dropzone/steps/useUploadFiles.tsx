import { UploadResponse } from '@/app/api/upload/route';
import { useState } from 'react';

export const useUploadFiles = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function uploadFiles(files: File[]): Promise<UploadResponse[] | null> {
    setIsLoading(true);

    const formData = new FormData();
    try {
      for (const file of files) {
        formData.append(file.name, file);
      }
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('There was an error uploading the files');
      }

      const data: UploadResponse[] = await response.json();
      setIsLoading(false);
      setSuccess(true);
      return data;
    } catch (error) {
      console.error('There was an error uploading the files', error);
      setError(true);
    }

    setIsLoading(false);
    return null;
  }

  return { loading, error, success, uploadFiles };
};
