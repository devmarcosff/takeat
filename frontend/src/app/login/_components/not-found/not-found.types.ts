import { PropsWithChildren, SetStateAction } from "react"

export type NotFoundLoginProps = PropsWithChildren & {
    isNotFound: boolean,
    openClient: boolean,
    open: boolean,
    handleOpenClient: () => void,
    handleModalClose: () => void,
    setOpen: (value: SetStateAction<boolean>) => void,
}
