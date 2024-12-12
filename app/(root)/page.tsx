'use client';

import { useShopModal } from '@/hooks/use-shop-modal';
import { useEffect } from 'react';

export default function Home() {
  const { isOpen, onOpen } = useShopModal();

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return <div className='p-4'>Root</div>;
}
