import { NextRequest, NextResponse } from 'next/server';

const URL = 'https://filetools13.pdf24.org/client.php?action=upload' // upload url post
const CompressURL = 'https://filetools13.pdf24.org/client.php?action=compressPDF' // compress url post

const status = 'https://filetools13.pdf24.org/client.php?action=getStatus&jobId=someidwegotfromCompress' // compress url post

export async function POST(req: NextRequest): Promise<
  NextResponse<any | { error: any }>
> {
  try {
    const data = await req.formData()
    let formData = new FormData()
    
    Object.values(data).forEach((file) => {
        formData.append(file.name, file.data);
    });
    data.forEach((value, key) => {
        console.warn('key', key)
    })
    req.headers.forEach((value, key) => {
        console.warn('key', key, 'value', value)
    })


    const response = await fetch('https://filetools13.pdf24.org/client.php?action=upload', {
        method: 'POST',
        body: data,
        // headers: req.headers
    });


    if (!response.ok) {
        throw new Error(`Failed to upload to external API with status: ${response.status}`);
    }

    const responseData = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
