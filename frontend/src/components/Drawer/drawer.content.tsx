import React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import CloseIcon from '../../../../assets/close-icon.svg';

import clsx from 'clsx';
import Image from 'next/image';
import { DrawerContentProps } from './drawer.types';

const DrawerContent: React.FC<DrawerContentProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Close asChild>
        <DialogPrimitive.Overlay className={clsx('fixed inset-0 z-20 animate-fadeIn', 'bg-black/50 ')} />
      </DialogPrimitive.Close>
      <DialogPrimitive.Content
        onInteractOutside={(event) => event.preventDefault()}
        className={clsx(
          'fixed top-0 right-0 z-20 h-full w-full flex flex-col pl-5 py-5 sm:pl-10 sm:py-10',
          'md:rounded-lg sm:w-3/4 2xl:w-3/6 transition-[width] outline-none',
          'bg-allintra-gray-300 animate-transformLeft',
          className
        )}
        {...props}
      >
        <DialogPrimitive.Close
          className={clsx('flex items-center rounded-md w-8 h-8 p-2', 'outline-allintra-primary-500')}
        >
          <Image alt='' src={CloseIcon} className="w-5 h-5" />
        </DialogPrimitive.Close>
        <div id="dialog-content" className="mt-3 pr-5 sm:pr-10 scrollbar-track-transparent overflow-y-auto h-full">
          {children}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

export default DrawerContent;
