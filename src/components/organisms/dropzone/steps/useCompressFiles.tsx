import { CompressResponse } from '@/app/api/compress/route';
import { UploadResponse } from '@/app/api/upload/route';
import { useState } from 'react';

export type CompressPayload = {
  files: UploadResponse[];
  dpi: number;
  imageQuality: number;
  colorModel: string;
  mode: string;
};
export const useCompressFiles = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function compressFiles(
    payload: CompressPayload
  ): Promise<CompressResponse | null> {
    setIsLoading(true);

    try {
      const response = await fetch('/api/compress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('There was an error compressing  files');
      }
      const data: CompressResponse = await response.json();
      setIsLoading(false);
      setSuccess(true);
      return data;
    } catch (error) {
      console.error('There was an error compressing files', error);
      setError(true);
    }
    setIsLoading(false);
    return null;
  }

  return { loading, error, success, compressFiles };
};
