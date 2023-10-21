import { UploadResponse } from '@/app/api/upload/route';
import { useState } from 'react';
import { CompressStatusResponse } from '@/app/api/compress-status/route';

const MAX_RETRIES = 100; // 50 seconds

export const useCompressStatus = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getCompressStatus(
    jobId: string
  ): Promise<CompressStatusResponse | null> {
    try {
      const response = await fetch(`/api/compress-status?jobId=${jobId}`);

      if (!response.ok) {
        throw new Error('There was an error getting compress status');
      }

      const data: CompressStatusResponse = await response.json();
      return data;
    } catch (error) {
      console.error('There was an error getting compress status', error);
      setError(true);
    }

    return null;
  }

  async function pollCompressStatus(
    jobId: string,
    retries: number = 0
  ): Promise<CompressStatusResponse | null> {
    setIsLoading(true);
    if (retries >= MAX_RETRIES) {
      console.error('Max retries reached');
      setError(true);
      return null;
    }

    try {
      const compressStatus = await getCompressStatus(jobId);
      if (compressStatus && compressStatus.status === 'done') {
        setIsLoading(false);
        return compressStatus;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return pollCompressStatus(jobId, retries + 1);
      }
    } catch (error) {
      console.error('There was an error getting compress status', error);
      setError(true);
    }

    return null;
  }
  return { loading, error, getCompressStatus, pollCompressStatus };
};
