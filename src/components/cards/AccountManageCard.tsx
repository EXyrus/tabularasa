import {
    // Image,
    Typography
} from 'antd';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import type { BankAccountResponse } from 'types';

const { Text } = Typography;

type Props = {
    payment: BankAccountResponse;
    onEdit: (accountId: string) => void;
    onDelete: (accountId: string) => void;
};

const AccountManageCard = ({ payment, onEdit, onDelete }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // const imageStyle = {
    //     width: '70px'
    // };

    return (
        <div>
            <div className='mb-10 h-extraTiny w-full rounded-lg bg-lightBlue p-6'>
                <div className='flex items-center justify-between'>
                    {/* <Image
                        src={payment.bankLogo}
                        alt='bank Logo'
                        style={imageStyle}
                    /> */}
                    <BsThreeDotsVertical
                        size={20}
                        color='black'
                        onClick={toggleMenu}
                    />
                </div>
                {isMenuOpen && (
                    <div className='callout-menu mr-5'>
                        <button
                            onClick={() => {
                                onEdit(payment.id.toString());
                                setIsMenuOpen(false);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                onDelete(payment.id.toString());
                                setIsMenuOpen(false);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )}
                <div className='mt-2 font-bold'>{payment.bankName}</div>

                <Text copyable className='mt-2 text-green'>
                    {payment.accountNumber}
                </Text>
            </div>
        </div>
    );
};

export default AccountManageCard;
