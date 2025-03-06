import 'App.css';
import { Button, Form, Input, Select, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import payment from 'assets/img/payment.svg';
import { GetStartedCard } from 'components';
import AccountDetailsCard from 'components/cards/AccountDetailsCard';
import SuccessCard from 'components/success/SuccessCard';
import BANKS from 'data/banks.json';
import type { Bank } from 'types';
import { useAddBankAccount } from 'queries';

const { Option } = Select;

type Props = {
    onSubmit: () => void;
};

const AddBankFrame = ({ onSubmit }: Props) => {
    const navigate = useNavigate();
    const {
        mutate: addBankAccount,
        isPending,
        isSuccess
    } = useAddBankAccount();
    const [showMark, setShowMark] = useState(isPending);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const [formData, setFormData] = useState({
        name: '',
        accountNumber: '',
        bank: '',
        accountType: '',
        password: ''
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onNextClick = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const onPrevClick = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };
    const onHandleProfile = () => {
        setShowMark(false);
        navigate('/');
    };

    const onFormSubmit = () => {
        addBankAccount({
            bank: formData.bank,
            accountNumber: formData.accountNumber,
            accountName: formData.name,
            accountType: formData.accountType,
            password: formData.password
        });

        if (isSuccess) {
            setShowMark(true);
            onSubmit();
        }
    };

    if (isPending) {
        return <Spin fullscreen />;
    }

    const totalSteps = 2;

    const getTitle = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <div>
                            <GetStartedCard name='Add new account' />
                        </div>

                        <div className='my-5 flex gap-2'>
                            <div>
                                <div className='w-small rounded-lg bg-lightBlue p-2'>
                                    <img
                                        src={payment}
                                        alt='statistics image'
                                        className='w-thirthy'
                                    />
                                </div>
                            </div>

                            <div>
                                <div className='font-bold'> Account Title</div>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <div>
                            <GetStartedCard name='School fees for Primary One' />
                            <div className='my-5 flex gap-2'>
                                <div>
                                    <div className='w-small rounded-lg bg-lightBlue p-2'>
                                        <img
                                            src={payment}
                                            alt='statistics image'
                                            className='w-thirthy'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className='font-bold'>
                                        {' '}
                                        Payment Structure
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return '';
        }
    };

    return (
        <>
            {!showMark ? (
                <div>
                    <div className='step-title mt-10'>
                        <h2>
                            Step {currentStep}/{totalSteps}
                            {getTitle()}
                        </h2>
                    </div>
                    <div className='progress-bar-container'>
                        <div
                            className='progress-bar'
                            style={{
                                width: `${
                                    ((currentStep - 1) / (totalSteps - 1)) * 100
                                }%`
                            }}
                        ></div>
                    </div>
                    <form>
                        {currentStep === 1 && (
                            <>
                                <div>
                                    <label
                                        htmlFor='Admin_ID'
                                        className='font-bold'
                                    >
                                        Account Name:
                                    </label>
                                    <Form.Item
                                        name='role_title'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please enter Fee title'
                                            },
                                            { whitespace: true }
                                        ]}
                                        hasFeedback
                                    >
                                        <div>
                                            <Input
                                                className='mt-2 h-small w-full'
                                                value={formData.name}
                                                placeholder='School fees for primary one'
                                                onChange={onChange}
                                            />
                                        </div>
                                    </Form.Item>
                                </div>

                                <div>
                                    <label
                                        htmlFor='Admin_ID'
                                        className='font-bold'
                                    >
                                        Account Number:
                                    </label>
                                    <Form.Item
                                        name='amount'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please enter Account Number'
                                            },
                                            { whitespace: true }
                                        ]}
                                        hasFeedback
                                    >
                                        <div>
                                            <Input
                                                className='mt-2 h-small w-full'
                                                value={formData.name}
                                                placeholder='3030791989'
                                                onChange={onChange}
                                            />
                                        </div>
                                    </Form.Item>
                                </div>

                                <div className='mb-20'>
                                    <label
                                        htmlFor='Admin_ID'
                                        className='font-bold'
                                    >
                                        Select Bank:
                                    </label>
                                    <Select
                                        defaultValue='5'
                                        style={{
                                            width: '100%',
                                            padding: 1,
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                            fontSize: 12
                                        }}
                                        // onChange={onSelectChange}
                                        popupClassName='custom-dropdown'
                                    >
                                        {BANKS.map((bank: Bank) => (
                                            <Option
                                                key={bank.code}
                                                value={bank.code}
                                            >
                                                {bank.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <div>
                                <AccountDetailsCard
                                    bankLogo={formData.bank}
                                    institutionName={formData.name}
                                    accountDetails={formData.accountNumber}
                                />

                                <div>
                                    <label
                                        htmlFor='Admin_ID'
                                        className='font-bold'
                                    >
                                        Enter Admin Password to update :
                                    </label>
                                    <Form.Item
                                        name='role_title'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please enter Admin Password'
                                            },
                                            { whitespace: true }
                                        ]}
                                        hasFeedback
                                    >
                                        <div>
                                            <Input.Password
                                                className='mt-2 h-small w-full'
                                                placeholder='School fees for primary one'
                                                onChange={onChange}
                                            />
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                        )}

                        <div className='flex gap-4'>
                            {currentStep > 1 && (
                                <Button
                                    className='h-small w-full bg-green text-white'
                                    onClick={onPrevClick}
                                >
                                    Previous
                                </Button>
                            )}
                            {currentStep < totalSteps ? (
                                <div
                                    className='flex h-small w-full items-center justify-center rounded-lg bg-green text-white'
                                    onClick={onNextClick}
                                >
                                    Next
                                </div>
                            ) : (
                                <div
                                    className='flex h-small w-full items-center justify-center rounded-lg bg-green text-white'
                                    onClick={onFormSubmit}
                                >
                                    {isPending ? 'Loading...' : 'Add Account'}
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <SuccessCard
                    textOne='Success!'
                    textTwo='Your Payment has been updated. You can make changes by clicking Manage Payment'
                    buttonStyle='bg-green w-full h-small mt-20 text-white rounded-lg'
                    onClick={onHandleProfile}
                />
            )}
        </>
    );
};

export default AddBankFrame;
