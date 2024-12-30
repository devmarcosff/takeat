import { HTMLAttributes } from 'react';

import { DialogCloseProps, DialogContentProps, DialogProps, DialogTriggerProps } from '@radix-ui/react-dialog';

export type DrawerRootProps = DialogProps;

export type DrawerContentProps = DialogContentProps & HTMLAttributes<HTMLDivElement>;

export type DrawerTriggerProps = DialogTriggerProps;

export type DrawerCloseProps = DialogCloseProps;
