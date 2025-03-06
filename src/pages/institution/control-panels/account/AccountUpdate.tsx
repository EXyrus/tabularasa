import { Button, Form, Input, Spin, App } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetStartedCard } from 'components';
import Success from 'components/success/SuccessCard';
import type {
    ErrorResponse,
    UpdatePasswordPayload,
    UserResetPasswordRequest
} from 'types';
import { useAuth } from 'hooks/useAuth';
import PATHS from 'pages/institution/paths.json';

const AccountUpdate = () => {
    const { user, updatePassword } = useAuth();
    const navigate = useNavigate();
    const { notification } = App.useApp();
    const [isActiveSuccess, setIsActiveSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onHandlePassword = async (payload: UpdatePasswordPayload) => {
        setLoading(true);
        try {
            const requestPayload: UserResetPasswordRequest = {
                ...payload,
                token: '',
                password: payload.newPassword,
                confirmed: payload.newPassword,
                email: user?.email ?? ''
            };

            await updatePassword(requestPayload);
            notification.success({ message: 'Password updated successfully' });
            setIsActiveSuccess(true);
        } catch (err) {
            const error = err as ErrorResponse;

            notification.error({
                message: error.message || 'Error updating password'
            });
        } finally {
            setLoading(false);
        }
    };

    // ... the rest of the component

    const onGoBack = () => {
        setIsActiveSuccess(false);
        navigate(PATHS.controlPanel.index);
    };

    return (
        <>
            {loading ? (
                <Spin
                    tip='Updating password...'
                    size='large'
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ) : isActiveSuccess ? (
                <Success
                    textOne='Success!'
                    textTwo='Your password has been updated'
                    mainText='Back to Control Panel'
                    buttonStyle='bg-green w-full h-small mt-20 text-white rounded-lg'
                    onClick={onGoBack}
                />
            ) : (
                <div className='m-5'>
                    <GetStartedCard name='Change Account Password' date='' />
                    <Form
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 24 }}
                        autoComplete='off'
                        onFinish={onHandlePassword}
                    >
                        <div className='mt-10'>
                            <label htmlFor='oldPassword' className='font-bold'>
                                Old password:
                            </label>
                            <Form.Item
                                name='oldPassword'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Old Password'
                                    },
                                    { whitespace: true }
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    className='mt-2 h-small w-full'
                                    placeholder='************'
                                />
                            </Form.Item>
                        </div>

                        <div className='mt-10'>
                            <label htmlFor='newPassword' className='font-bold'>
                                New password:
                            </label>
                            <Form.Item
                                name='newPassword'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter New Password'
                                    },
                                    { whitespace: true },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('oldPassword') !==
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error(
                                                    'The new password is the same as the old one!'
                                                )
                                            );
                                        }
                                    })
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    className='mt-2 h-small w-full'
                                    placeholder='************'
                                />
                            </Form.Item>
                        </div>

                        <div className='mt-10'>
                            <label
                                htmlFor='passwordConfirmation'
                                className='font-bold'
                            >
                                Confirm New Password:
                            </label>
                            <Form.Item
                                name='passwordConfirmation'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter Confirm Password'
                                    },
                                    { whitespace: true },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('newPassword') ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error(
                                                    'The new passwords do not match!'
                                                )
                                            );
                                        }
                                    })
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    className='mt-2 h-small w-full'
                                    placeholder='************'
                                />
                            </Form.Item>
                        </div>

                        <div>
                            <Button
                                type='primary'
                                htmlType='submit'
                                className='mt-10 h-small w-full bg-green text-white'
                            >
                                Update Password
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </>
    );
};

export default AccountUpdate;
