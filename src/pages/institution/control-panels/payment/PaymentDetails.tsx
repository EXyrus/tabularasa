import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Button, Form, Input, Tabs, Spin } from 'antd';
import { GrStatusWarning } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import PATHS from 'pages/institution/paths.json';
import deleteUser from 'assets/img/delete-user.svg';
import { GetStartedCard } from 'components';
import AddBankFrame from 'frames/AddBankFrame';
import AccountManageCard from 'components/cards/AccountManageCard';
import Modal from 'components/modals/Modals';
import SuccessCard from 'components/success/SuccessCard';
import {
    useGetBankAccounts,
    useDeleteBankAccount,
    useUpdateBankAccount
} from 'queries';

const PaymentDetails = () => {
    const navigate = useNavigate();
    const [bankAccountId, setBankAccountId] = useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showMark, setShowMark] = useState(false);
    const { data, isPending } = useGetBankAccounts();
    const { mutate: deleteBankAccount } = useDeleteBankAccount();
    const { mutate: updateBankAccount, isSuccess } = useUpdateBankAccount();

    const onHandleDelete = () => {
        deleteBankAccount(bankAccountId);
        setIsEditModalOpen(false);
    };

    const [formData, setFormData] = useState({
        bankName: '',
        accountNumber: '',
        accountType: '',
        accountName: ''
    });
    const onInputChange = (name: string, value: unknown) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const onCancel = () => {
        setIsEditModalOpen(false);
    };

    const onSubmit = () => {
        setIsLoading(true);
        updateBankAccount({
            id: bankAccountId,
            bank: formData.bankName,
            accountNumber: formData.accountNumber,
            accountType: formData.accountType,
            accountName: formData.accountName
        });

        if (isSuccess) {
            setShowMark(true);
            setIsLoading(false);
        }

        setTimeout(() => {
            setShowMark(true);
            setIsLoading(false);
        }, 5000);
    };

    const onDelete = (bankAccountId: string) => {
        setBankAccountId(bankAccountId);
        setIsDeleteModalOpen(true);
    };

    const onEdit = (bankAccountId: string) => {
        setBankAccountId(bankAccountId);
        setIsEditModalOpen(true);
    };

    const onGoBack = () => {
        setShowMark(false);
        navigate(PATHS.controlPanel.index);
    };

    if (isPending) {
        return <Spin fullscreen />;
    }

    return (
        <>
            {!showMark ? (
                <div className='m-majorMargin p-majorPadding'>
                    <Tabs
                        items={[
                            {
                                key: '1',
                                label: 'Manage Account',
                                children: (
                                    <div>
                                        <div>
                                            <div className='mt-10'>
                                                <div>
                                                    <div>
                                                        {data &&
                                                            data.map(
                                                                bankAccount => (
                                                                    <AccountManageCard
                                                                        key={
                                                                            bankAccount.id
                                                                        }
                                                                        payment={
                                                                            bankAccount
                                                                        }
                                                                        onEdit={
                                                                            onEdit
                                                                        }
                                                                        onDelete={
                                                                            onDelete
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                    </div>

                                                    <div>
                                                        <Modal
                                                            isOpen={
                                                                isEditModalOpen
                                                            }
                                                            onClose={onCancel}
                                                        >
                                                            <div className='flex w-full flex-col items-center justify-center'>
                                                                <div className='flex items-center justify-center'>
                                                                    <img
                                                                        src={
                                                                            deleteUser
                                                                        }
                                                                        alt='delete button'
                                                                    />
                                                                </div>
                                                                <div className='mt-5 flex w-extraTiny items-center justify-center gap-2 rounded-md bg-lightdanger px-4 py-1 text-12 text-red'>
                                                                    <GrStatusWarning
                                                                        size={
                                                                            15
                                                                        }
                                                                        color='red'
                                                                    />
                                                                    Delete
                                                                    Account
                                                                </div>
                                                                <div className='m-10 text-center text-14'>
                                                                    Are you sure
                                                                    you want to
                                                                    delete this
                                                                    Account?
                                                                </div>

                                                                <Button
                                                                    type='primary'
                                                                    onClick={
                                                                        onHandleDelete
                                                                    }
                                                                    className='h-small w-full bg-danger'
                                                                >
                                                                    {isLoading
                                                                        ? 'Loading...'
                                                                        : 'Confirm Action'}
                                                                </Button>

                                                                <Button
                                                                    type='primary'
                                                                    onClick={
                                                                        onCancel
                                                                    }
                                                                    className='mt-5 h-small w-full border-2 border-slate-100 bg-white text-black'
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </div>
                                                        </Modal>
                                                    </div>

                                                    <div>
                                                        <Modal
                                                            isOpen={
                                                                isDeleteModalOpen
                                                            }
                                                            onClose={onCancel}
                                                        >
                                                            <div className='w-full'>
                                                                <div>
                                                                    <GetStartedCard name='Edit Account' />
                                                                </div>

                                                                <div>
                                                                    <div className='sm:m-10'>
                                                                        <Form
                                                                            labelCol={{
                                                                                span: 10
                                                                            }}
                                                                            wrapperCol={{
                                                                                span: 24
                                                                            }}
                                                                            autoComplete='off'
                                                                            // onFinish={onFinish}
                                                                        >
                                                                            <label
                                                                                htmlFor='reason'
                                                                                className='font-bold'
                                                                            >
                                                                                Bank
                                                                                Name:
                                                                            </label>
                                                                            <Form.Item
                                                                                name='bankName'
                                                                                rules={[
                                                                                    {
                                                                                        required:
                                                                                            true,
                                                                                        message:
                                                                                            'Bank Name is missing'
                                                                                    },
                                                                                    {
                                                                                        whitespace:
                                                                                            true
                                                                                    }
                                                                                ]}
                                                                                hasFeedback
                                                                            >
                                                                                <div>
                                                                                    <Input
                                                                                        placeholder='Bank Name'
                                                                                        className='mt-2 h-small w-full'
                                                                                        onChange={e =>
                                                                                            onInputChange(
                                                                                                'bankName',
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </Form.Item>

                                                                            <label
                                                                                htmlFor=''
                                                                                className='mt-5 sm:font-bold'
                                                                            >
                                                                                Account
                                                                                Number:
                                                                            </label>
                                                                            <Input.TextArea
                                                                                rows={
                                                                                    4
                                                                                }
                                                                                placeholder='Account Number'
                                                                                // value={text}
                                                                                className='mb-5'
                                                                                onChange={e =>
                                                                                    onInputChange(
                                                                                        'accountNumber',
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />

                                                                            <Button
                                                                                type='primary'
                                                                                htmlType='submit'
                                                                                className='h-small w-full bg-green'
                                                                                onClick={
                                                                                    onSubmit
                                                                                }
                                                                            >
                                                                                {isLoading
                                                                                    ? 'Loading...'
                                                                                    : 'Edit'}
                                                                            </Button>
                                                                        </Form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                key: '2',
                                label: 'Create Account',
                                children: (
                                    <div>
                                        <AddBankFrame onSubmit={onSubmit} />
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>
            ) : (
                <SuccessCard
                    textOne='Success!'
                    textTwo='Your Payment has been updated. You can make changes by clickingg Manage Payment'
                    // processingText='Your student has been added'
                    mainText='Back to Control Panel'
                    // isLoading={isLoading}
                    buttonStyle='bg-green w-full h-small mt-20 text-white rounded-lg'
                    onClick={onGoBack}
                />
            )}
        </>
    );
};

export default PaymentDetails;
