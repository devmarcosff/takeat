import * as DialogPrimitive from '@radix-ui/react-dialog';

import { DrawerCloseProps } from './drawer.types';

const DrawerClose: React.FC<DrawerCloseProps> = ({ children, className, ...props }) => {
  return (
    <DialogPrimitive.Close aria-label="Fechar drawer" {...props}>
      {children}
    </DialogPrimitive.Close>
  );
};

export default DrawerClose;
