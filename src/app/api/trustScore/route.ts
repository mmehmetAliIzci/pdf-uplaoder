import { NextResponse } from 'next/server';

export function fakeResponse<T>(data: T, delay = 500): Promise<T> {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

export type TrustRatingResponseType = {
  trustRating: string;
  trustCount: string;
};

export async function GET(): Promise<
  NextResponse<TrustRatingResponseType | { error: any }>
> {
  try {
    const data = await fakeResponse<TrustRatingResponseType>({
      trustRating: '4',
      trustCount: (Math.random() * (9999 - 490) + 490).toFixed(0),
    });

    return NextResponse.json(data); // Pass the resolved JSON data here
  } catch (error) {
    return NextResponse.json({ error });
  }
}