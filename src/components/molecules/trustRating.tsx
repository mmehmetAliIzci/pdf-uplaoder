import {
  TrustRatingResponseType,
  fakeResponse,
} from '@/app/api/trustScore/route';
import Image from 'next/image';

async function fetchTrustRating() {
  const data = await fakeResponse<TrustRatingResponseType>({
    trustRating: '4',
    trustCount: (Math.random() * (9999 - 490) + 490).toFixed(0),
  });
  return data;
}

const Star: React.FC = () => {
  return <Image src='./star.svg' alt='Star' width={14} height={14} />;
};

export const TrustRating = async () => {
  const data = await fetchTrustRating();

  const stars = [];
  try {
    for (let i = 0; i < Number(data.trustRating); i++) {
      stars.push(<Star key={i} />);
    }
  } catch (e) {
    return <>Something went wrong</>;
  }

  return (
    <div className='flex items-center gap-1'>
      <span className='flex items-center gap-1'>{stars}</span>
      <span className='text-sm text-foreground'>
        {data.trustRating} ({data.trustCount} votes)
      </span>
    </div>
  );
};
