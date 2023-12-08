import { NextRequest, NextResponse } from 'next/server';

const CompressURL =
  'https://filetools13.pdf24.org/client.php?action=compressPdf';

export type CompressResponse = {
  jobId: string;
};

export async function POST(
  req: NextRequest
): Promise<NextResponse<CompressResponse[] | { error: any }>> {
  try {
    const res = await req.json();

    const response = await fetch(CompressURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        charset: 'utf-8',
      },
      body: JSON.stringify(res),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to upload to external API with status: ${response.status}`
      );
    }

    const responseData = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
