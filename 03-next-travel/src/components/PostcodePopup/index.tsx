import { useDaumPostcodePopup } from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';
import Button from '../button/button';

interface IPostcodeProps {
  onAddressComplete: (address: string, zipcode: string) => void;
}

export default function Postcode(props: IPostcodeProps) {
    const open = useDaumPostcodePopup();

    const handleComplete = (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        
        props.onAddressComplete(fullAddress, data.zonecode);
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <Button className="white-button" text="우편번호 검색" onClick={handleClick} />
    );
};