'use client';

import { useShopModal } from '@/hooks/use-shop-modal';
import { useEffect } from 'react';

export default function Home() {
  const { isOpen, onOpen } = useShopModal();

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
