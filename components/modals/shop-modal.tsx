'use client';

import { Modal } from '@/components/ui/modal';
import { useShopModal } from '@/hooks/use-shop-modal';

export const ShopModal = () => {
  const { isOpen, onClose } = useShopModal();
  return (
    <Modal
      title='Create Shop'
      description='Add a new shop to start managing products and categories'
      isOpen={isOpen}
      onClose={onClose}
    >
      Form here later
    </Modal>
  );
};
