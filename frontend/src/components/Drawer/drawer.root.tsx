import React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { DrawerRootProps } from './drawer.types';

const DrawerRoot: React.FC<DrawerRootProps> = ({ children, ...props }) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};

export default DrawerRoot;
