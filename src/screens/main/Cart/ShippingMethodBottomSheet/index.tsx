import { BaseBottomSheet } from '../../../../components/molecules';
import React from 'react'

interface IShippingMethodBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShippingMethodBottomSheet: React.FC<IShippingMethodBottomSheetProps> = props => {
    return (
        <>
        {props.isOpen ?  <BaseBottomSheet  /> : null}
        </>
    )
}


export default ShippingMethodBottomSheet