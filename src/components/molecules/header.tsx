'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import { TrustRating } from './trustRating';

export const Header = () => {
  return (
    <header className='bg-white'>
      <div className='mx-auto flex h-24 max-w-screen-lg items-center gap-8 bg-primary-200 px-4 sm:px-32 lg:px-8'>
        <Link className='block' href='/'>
          <span className='sr-only'>Home</span>
          <Image alt='logo' width={210} height={50} src='./logo.svg' />
        </Link>

        <div className='flex flex-1 items-center justify-end'>
          <nav aria-label='Global' className='mr-3 hidden md:block'>
            <ul className='flex items-center gap-6 text-sm'>
              <li>
                <Link
                  className='text-gray-500 transition hover:text-gray-500/75'
                  href='/'
                >
                  Desktop version
                </Link>
              </li>

              <li>
                <a
                  className='text-gray-500 transition hover:text-gray-500/75'
                  href='/'
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className='flex items-center gap-4'>
            <div className='sm:flex sm:gap-4'>
              <Button size='xs' className='hidden sm:block'>
                All PDF Tools
              </Button>
            </div>

            <button className='block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden'>
              <span className='sr-only'>Toggle menu</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='mx-auto flex h-14 max-w-screen-lg items-center justify-between gap-8 bg-primary px-4 sm:px-32 lg:px-8'>
        <Suspense fallback={'Loading...'}>
          <TrustRating />
        </Suspense>
        <div className='flex gap-3'>
          <div className='flex items-center gap-1'>
            <span className='flex items-center gap-1'>
              <Image
                alt='check'
                src='./check-white.svg'
                width={17}
                height={17}
              />
            </span>
            <span className='text-sm text-foreground'>Free</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='flex items-center gap-1'>
              <Image
                alt='check'
                src='./check-white.svg'
                width={17}
                height={17}
              />
            </span>
            <span className='text-sm text-foreground'>Online</span>
          </div>
          <div className='flex items-center gap-1'>
            <span className='flex items-center gap-1'>
              <Image
                alt='check'
                src='./check-white.svg'
                width={17}
                height={17}
              />
            </span>
            <span className='text-sm text-foreground'>No limits</span>
          </div>
        </div>
      </div>
    </header>
  );
};
