import { NextRequest, NextResponse } from 'next/server';

const BE_URL =
  'https://filetools13.pdf24.org/client.php?action=getStatus&jobId='; // compress url post

export type CompressStatusResponse = {
  status: string;
  state: string;
};

export async function GET(
  req: NextRequest
): Promise<NextResponse<CompressStatusResponse | { error: any }>> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const jobId = searchParams.get('jobId');

    const response = await fetch(`${BE_URL}${jobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        connection: 'keep-alive',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to upload to external API with status: ${response.status}`
      );
    }

    const responseData = await response.json();

    return NextResponse.json({
      status: responseData.status,
      state: responseData['job'].state,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
