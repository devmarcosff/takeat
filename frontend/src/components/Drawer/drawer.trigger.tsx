import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';

import { DrawerTriggerProps } from './drawer.types';

const DrawerTrigger: React.FC<DrawerTriggerProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Trigger
      asChild
      aria-label="Abrir drawer"
      className={clsx('data-[state=open]:pointer-events-none select-none', className)}
      type="button"
      {...props}
    >
      {children}
    </DialogPrimitive.Trigger>
  );
};

export default DrawerTrigger;
