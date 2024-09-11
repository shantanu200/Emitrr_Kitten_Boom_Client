import { Spinner } from '@phosphor-icons/react';
import React from 'react';


const PageLoading: React.FC = () => {
  return (
    <main className='h-screen w-full flex items-center justify-center'>
      <Spinner className="animate-spin h-8 w-8" /> </main>
  );
};

export default PageLoading;
