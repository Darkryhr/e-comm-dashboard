'use client';

import { Modal } from '@/components/ui/modal';

export default function Home() {
  return (
    <div className='p-4'>
      <Modal
        title='Test'
        description='Testing...'
        isOpen
        onClose={() => {}}
      ></Modal>
    </div>
  );
}
