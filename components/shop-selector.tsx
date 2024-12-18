'use client';

import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useShopModal } from '@/hooks/use-shop-modal';
import { cn } from '@/lib/utils';
import { Shop } from '@prisma/client';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ShopSelectorProps extends PopoverTriggerProps {
  items: Shop[];
}

function ShopSelector({ className, items = [] }: ShopSelectorProps) {
  const shopModal = useShopModal();
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const formattedShops = items.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const currentShop = formattedShops.find(shop => shop.value === params.shopId);

  const onShopChange = (shop: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${shop.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select a shop'
          className={cn('w-[200px] justify-between', className)}
        >
          <Store className='mr-2 h-4 w-4' />
          {currentShop?.label}
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search shop...' />
            <CommandEmpty>No shop found like this</CommandEmpty>
            <CommandGroup heading='Shops'>
              {formattedShops.map(shop => (
                <CommandItem
                  key={shop.value}
                  onSelect={() => onShopChange(shop)}
                  className='text-sm'
                >
                  <Store className='mr-2 h-4 w-4' />
                  {shop.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentShop?.value === shop.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  shopModal.onOpen();
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Shop
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ShopSelector;
