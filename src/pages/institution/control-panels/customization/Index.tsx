import { LoadingOutlined } from '@ant-design/icons';
import { Button, Form, Input, App } from 'antd';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import purpleCustomize from 'assets/img/purple-customize.svg';
import {
    GetStartedCard,
    ManageCreateInstitution,
    MediumCard
} from 'components';
import ImageUpload from 'components/global/ImageUpload';
import config from 'config';
import {
    useInstitutionDetails,
    useUpdateInstitutionSettings
} from 'queries/use-institutions';
import PATHS from 'pages/institution/paths.json';

const Customization = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { notification } = App.useApp();
    const { mutate, isPending: loadingSettingsUpdate } =
        useUpdateInstitutionSettings();
    const { data } = JSON.parse(
        localStorage.getItem('institutionTheme') || '{}'
    );
    const {
        data: institution,
        isPending: loadingInstitution,
        isError: errorLoadingInstitution
    } = useInstitutionDetails(data.id);
    const [activeTab, setActiveTab] = useState<string>('');

    const [imageUrl, setImageUrl] = useState<string>(data.logo);

    const [selectedColor, setSelectedColor] = useState<string>(
        institution?.settings?.color || data.color
    );

    const onSettingClick = (setting: string) => {
        // set the active tab to the setting
        setActiveTab(setting);

        // if currently set, reset to empty
        if (activeTab === setting) {
            setActiveTab('');
        }
    };

    const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedColor(event.target.value);
    };

    const onImageUpload = (info: cloudinary.ResultInfoSuccess) => {
        setImageUrl(`${info?.public_id}.${info.format}`);
    };

    const onFinish = () => {
        mutate(
            {
                id: institution?.id,
                color: selectedColor,
                logo: imageUrl,
                slug: form.getFieldValue('slug')
            },
            {
                onSuccess: () => {
                    // Handle success
                    setTimeout(() => {
                        notification.success({ message: 'Successful' });
                    }, 500);
                    navigate(PATHS.controlPanel.structure.index);
                },
                onError: error => {
                    setTimeout(() => {
                        if (error?.response?.data) {
                            notification.error({
                                message: 'Error updating institution settings'
                            });
                        } else {
                            notification.error({
                                message: 'Updating settings failed'
                            });
                        }
                    }, 500);
                }
            }
        );
    };

    useEffect(() => {
        setActiveTab('assets');
    }, []);

    return loadingInstitution ? (
        <h2 className='mt-5 flex h-screen w-screen animate-pulse items-center justify-center text-center text-lg font-semibold'>
            Loading Information <br />
            <LoadingOutlined />
        </h2>
    ) : errorLoadingInstitution ? (
        <h2 className='mt-5 flex h-screen w-screen animate-pulse items-center justify-center text-center text-lg font-semibold'>
            Error Loading Institution Information. Please try again later.
        </h2>
    ) : (
        <div className='m-majorMargin p-majorPadding'>
            <div>
                <GetStartedCard
                    name={`Edit ${institution.name} Settings`}
                    date='Customize, url, upload logo, favicon etc'
                />
            </div>

            <div className='mt-20'>
                <ManageCreateInstitution
                    cardImage={
                        activeTab === 'assets'
                            ? purpleCustomize
                            : purpleCustomize
                    }
                    customClass={`p-5 ${
                        activeTab === 'assets'
                            ? 'bg-lightPurple'
                            : 'bg-lightPurple'
                    }`}
                    manageText={'Customize'}
                    manageContent={'Customize url, upload logo'}
                    secondContent={'favicon, etc'}
                    textClass={`${activeTab === 'assets' ? 'text-black' : 'text-black'}`}
                    manageClass={`${
                        activeTab === 'assets' ? 'text-purple' : 'text-purple'
                    }`}
                    secondClass={`${
                        activeTab === 'assets' ? 'text-purple' : 'text-purple'
                    }`}
                    iconColor={`${activeTab === 'assets' ? 'purple' : 'purple'}`}
                />
            </div>

            <div
                className={`mt-4 rounded-lg pb-2 ${
                    activeTab === 'assets' ? 'expanded' : ''
                }`}
                role='button'
                tabIndex={0}
                onClick={() => onSettingClick('assets')}
            >
                <MediumCard
                    customClass={`p-4 ${activeTab === 'assets' ? 'bg-blue' : 'bg-grey'}`}
                    manageText={'Assets'}
                    manageContent={'Logo, Fav icon '}
                    textClass={`${activeTab === 'assets' ? 'text-white' : 'text-black'}`}
                    manageClass={`${
                        activeTab === 'assets' ? 'text-white' : 'text-black'
                    }`}
                    secondClass={`${
                        activeTab === 'assets' ? 'text-white' : 'text-black'
                    }`}
                    iconColor={`${activeTab === 'assets' ? 'white' : 'black'}`}
                    arrowSetting={`${activeTab === 'assets' ? 'arrow-down' : ''}`}
                />
            </div>

            {activeTab === 'assets' && (
                <div className='mt-5 flex h-40 items-center justify-center bg-grey'>
                    <div>
                        <ImageUpload
                            value={imageUrl ?? ''}
                            onImageChange={onImageUpload}
                            uploadPreset={config.CLOUDINARY_INSTITUTION_PRESET}
                            uploadText='Attach a Logo'
                            editText='Change Logo'
                            maxFileSize={500000}
                            placeholder={
                                institution.settings?.logo ?? undefined
                            }
                        />
                    </div>
                </div>
            )}

            <div
                className='mt-4 rounded-xl'
                role='button'
                tabIndex={0}
                onClick={() => onSettingClick('theme')}
            >
                <MediumCard
                    cardImage={
                        activeTab === 'theme'
                            ? purpleCustomize
                            : purpleCustomize
                    }
                    customClass={`p-5 ${activeTab === 'theme' ? 'bg-blue' : 'bg-grey'}`}
                    manageText={'Theme and Feel'}
                    manageContent={'Font, colour, font Size'}
                    textClass={`${activeTab === 'theme' ? 'text-white' : 'text-black'}`}
                    manageClass={`${
                        activeTab === 'theme' ? 'text-white' : 'text-black'
                    }`}
                    secondClass={`${
                        activeTab === 'theme' ? 'text-white' : 'text-black'
                    }`}
                    iconColor={`${activeTab === 'theme' ? 'white' : 'black'}`}
                    arrowSetting={`${activeTab === 'theme' ? 'arrow-down' : ''}`}
                />
            </div>

            {activeTab === 'theme' && (
                <div className='mt-5 flex h-40 items-center justify-center bg-grey'>
                    <p className='top-4 mx-5 text-12'>Colour theme</p>
                    <div className='mx-2 flex h-medium w-full items-center justify-center'>
                        <div className='mx-5 flex w-full items-center gap-2 p-0'>
                            <input
                                type='color'
                                value={selectedColor}
                                onChange={onColorChange}
                                className='h-extralsmall w-small2 rounded-md bg-inherit'
                            />

                            <div className='m-2 flex h-extralsmall w-extraTiny items-center justify-around gap-2 rounded-lg bg-white p-4'>
                                <span>Hex</span>
                                <span className='w-littleSmall rounded-sm bg-grey px-2'>
                                    {selectedColor}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className='mt-4 rounded-xl'
                role='button'
                tabIndex={0}
                onClick={() => onSettingClick('slug')}
            >
                <MediumCard
                    cardImage={
                        activeTab === 'slug' ? purpleCustomize : purpleCustomize
                    }
                    customClass={`p-5 ${activeTab === 'slug' ? 'bg-blue' : 'bg-grey'}`}
                    manageText={'Slug'}
                    manageContent={'Customize institution Url '}
                    textClass={`${activeTab === 'slug' ? 'text-white' : 'text-black'}`}
                    manageClass={`${
                        activeTab === 'slug' ? 'text-black' : 'text-black'
                    }`}
                    secondClass={`${
                        activeTab === 'slug' ? 'text-black' : 'text-black'
                    }`}
                    iconColor={`${activeTab === 'slug' ? 'white' : 'black'}`}
                    arrowSetting={`${activeTab === 'slug' ? 'arrow-down' : ''}`}
                />
            </div>

            <Form
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 24 }}
                autoComplete='off'
                onFinish={onFinish}
                form={form}
                initialValues={{ slug: institution?.settings?.slug }}
            >
                {activeTab === 'slug' && (
                    <div className='mt-5 flex h-40 items-center justify-center bg-grey'>
                        <p className='mx-5 text-12'>Edit slug</p>
                        <div className='mx-2 mt-5 flex h-small items-center justify-center rounded-lg bg-white p-2'>
                            <Form.Item
                                name='slug'
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please enter a slug name'
                                    }
                                ]}
                                className='flex'
                                hasFeedback
                            >
                                <Input
                                    bordered={false}
                                    size='large'
                                    className='mt-8 h-auto w-large p-10'
                                />
                            </Form.Item>
                        </div>
                    </div>
                )}

                <Button
                    type='primary'
                    htmlType='submit'
                    className='my-5 h-small w-full bg-blue'
                >
                    {loadingSettingsUpdate ? 'Loading...' : 'Update'}
                </Button>
            </Form>
        </div>
    );
};

export default Customization;
