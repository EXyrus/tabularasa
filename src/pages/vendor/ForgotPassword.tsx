import { Button, Form, Input, App } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import PATHS from 'pages/vendor/paths.json';
import logo from 'assets/img/logo.svg';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { notification } = App.useApp();
    const { forgotPassword } = useAuth();

    const onFinish = (values: { email: string }) => {
        try {
            setIsLoading(true);
            forgotPassword(values).then(() => {
                {
                    setTimeout(() => {
                        setIsLoading(false);
                        notification.success({
                            message:
                                'Check your email for a password reset link'
                        });
                    }, 1000);

                    setTimeout(() => {
                        navigate(PATHS.home);
                    }, 2000);
                }
            });
        } catch (error) {
            // Handle other errors
            notification.error({ message: 'Reset request Failed' });
        }
    };

    const navigate = useNavigate();

    return (
        <div className='m-majorMargin p-majorPadding'>
            <div className='sm:full flex items-center justify-center'>
                <div className='mt-20 flex h-medium w-mediumNew items-center justify-center rounded-lg bg-white p-2 shadow-md'>
                    <img
                        src={logo}
                        alt='Tabularasa Logo'
                        className='mb-4 h-20 w-20'
                    />
                </div>
            </div>

            <div className='mt-10'>
                <p className='text-base font-bold sm:text-center'>
                    Enter your employee email address
                </p>
            </div>
            <div className='sm:m-10'>
                <Form
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 24 }}
                    autoComplete='off'
                    onFinish={onFinish}
                >
                    <label htmlFor='Admin_ID' className='font-bold'>
                        Email Address:
                    </label>
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please Enter a Valid Email'
                            },
                            { whitespace: true }
                        ]}
                        hasFeedback
                    >
                        <div>
                            <Input
                                placeholder='user@tabularasa.ng'
                                className='mt-2 h-small w-full'
                            />
                        </div>
                    </Form.Item>

                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{
                            backgroundColor: 'Blue',
                            width: '100%',
                            height: '50px'
                        }}
                    >
                        {isLoading ? 'Loading...' : 'Reset Password'}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
