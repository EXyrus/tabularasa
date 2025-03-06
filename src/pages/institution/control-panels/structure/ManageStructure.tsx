import { Button, Spin, App } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetStartedCard, MediumCard } from 'components';
import SuccessCard from 'components/success/SuccessCard';
import AddStructureFrame from 'frames/AddStructureFrame';
import PATHS from 'pages/institution/paths.json';
import { useGetInstitutionStructure, useInstitutionDetails } from 'queries';

const ManageStructure = () => {
    const institution = JSON.parse(
        localStorage.getItem('institutionTheme') || '{}'
    );
    const navigate = useNavigate();
    const [successful, setSuccessful] = useState(false);
    const { notification } = App.useApp();
    const { data, isLoading, error, isError } = useGetInstitutionStructure();
    const { data: institutionData, isLoading: institutionLoading } =
        useInstitutionDetails(institution.data.id);

    const [isHandleConfirmed, setIsHandleConfirmed] = useState<boolean>(false);

    if (isError) {
        const e = error as Error;

        notification.error({ message: e?.message });
    }

    if (isLoading || institutionLoading) {
        return <Spin fullscreen />;
    }

    const onGoBack = () => {
        setSuccessful(false);
        navigate(PATHS.controlPanel.index);
    };

    const renderStructure = () => {
        return (
            <>
                <AddStructureFrame
                    onSuccess={() => {
                        setSuccessful(true);
                    }}
                    parentOrg={
                        data && data.length > 0
                            ? data[0]
                            : {
                                  id: 0,
                                  name: institutionData?.type ?? '',
                                  parentId: null,
                                  origin: false,
                                  institutionId: institution.id,
                                  organizations: []
                              }
                    }
                />
                <Button
                    className='h-small w-full bg-green text-white'
                    onClick={() => setIsHandleConfirmed(false)}
                >
                    Previous
                </Button>
            </>
        );
    };

    return (
        <div className='m-majorMargin p-majorPadding'>
            {isHandleConfirmed && !successful && renderStructure()}
            {!isHandleConfirmed && (
                <div className=''>
                    <div className='mb-5'>
                        <GetStartedCard
                            name={`Your Institution type is set to ${institutionData?.type}`}
                        />
                    </div>
                    <div>
                        <div
                            className={`mt-4 rounded-lg pb-2 ${
                                institutionData?.type === 'tertiary'
                                    ? 'expanded'
                                    : ''
                            }`}
                            role='button'
                            tabIndex={0}
                        >
                            <MediumCard
                                customClass='p-4 bg-grey'
                                manageText='Tertiary Institution'
                                manageContent='Faculty, department, others'
                                textClass={
                                    institutionData?.type === 'tertiary'
                                        ? 'text-[#001263]'
                                        : 'text-black'
                                }
                                manageClass='text-black'
                                secondClass='text-black'
                                iconColor='black'
                                arrowSetting={
                                    institutionData?.type === 'tertiary'
                                        ? 'arrow-down'
                                        : ''
                                }
                            />
                        </div>

                        {institutionData?.type === 'tertiary' && (
                            <div className='-mt-5 items-center bg-grey p-2'>
                                <div className='mx-2 flex gap-10'>
                                    <div className='mb-5 mt-5 rounded-md bg-green px-2 py-2 text-14 text-white'>
                                        School
                                    </div>
                                    <div className='mb-5 mt-5 rounded-md bg-green px-2 py-2 text-14 text-white'>
                                        Faculty
                                    </div>
                                    <div className='mb-5 mt-5 rounded-md bg-green px-2 py-2 text-14 text-white'>
                                        Department
                                    </div>
                                </div>
                            </div>
                        )}

                        <div
                            className={`mt-4 rounded-lg pb-2 ${
                                institutionData?.type === 'primary'
                                    ? 'expanded'
                                    : ''
                            }`}
                            role='button'
                            tabIndex={0}
                        >
                            <MediumCard
                                customClass='p-4 bg-grey'
                                manageText='Primary School'
                                manageContent='Select applicable units'
                                textClass={
                                    institutionData?.type === 'primary'
                                        ? 'text-[#001263]'
                                        : 'text-black'
                                }
                                manageClass='text-black'
                                secondClass='text-black'
                                iconColor='black'
                                arrowSetting={
                                    institutionData?.type === 'primary'
                                        ? 'arrow-down'
                                        : ''
                                }
                            />
                        </div>

                        {institutionData?.type === 'primary' && (
                            <div className='-mt-5 items-center bg-grey p-2'>
                                <div className='mx-2 flex gap-10'>
                                    {[
                                        'Primary 1',
                                        'Primary 2',
                                        'Primary 3'
                                    ].map(grade => (
                                        <div
                                            key={grade}
                                            className='mb-5 mt-5 rounded-md bg-green px-2 py-2 text-14 text-white'
                                        >
                                            {grade}
                                        </div>
                                    ))}
                                </div>
                                <div className='mx-2 flex gap-10'>
                                    {[
                                        'Primary 4',
                                        'Primary 5',
                                        'Primary 6'
                                    ].map(grade => (
                                        <div
                                            key={grade}
                                            className='mb-5 mt-5 rounded-md bg-green px-2 py-2 text-14 text-white'
                                        >
                                            {grade}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div
                            className={`mt-4 rounded-lg pb-2 ${
                                institutionData?.type === 'secondary'
                                    ? 'expanded'
                                    : ''
                            }`}
                            role='button'
                            tabIndex={0}
                        >
                            <MediumCard
                                customClass='p-4 bg-grey'
                                manageText='Secondary School'
                                manageContent='Select applicable units'
                                textClass={
                                    institutionData?.type === 'secondary'
                                        ? 'text-[#001263]'
                                        : 'text-black'
                                }
                                manageClass='text-black'
                                secondClass='text-black'
                                iconColor='black'
                                arrowSetting={
                                    institutionData?.type === 'secondary'
                                        ? 'arrow-down'
                                        : ''
                                }
                            />
                        </div>

                        {institutionData?.type === 'secondary' && (
                            <div className='-mt-5 items-center bg-grey p-2'>
                                <div className='mx-2 flex gap-2'>
                                    {[
                                        'JSS 1',
                                        'JSS 2',
                                        'JSS 3',
                                        'SSS 1',
                                        'SSS 2',
                                        'SSS 3'
                                    ].map(grade => (
                                        <div
                                            key={grade}
                                            className='mb-5 mt-5 rounded-md bg-green px-2 py-2 text-14 text-white'
                                        >
                                            {grade}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex gap-4'>
                        <Button
                            className='mt-20 h-small w-full bg-green text-white'
                            onClick={() => setIsHandleConfirmed(true)}
                            disabled={institutionData?.type === undefined}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {successful && (
                <SuccessCard
                    textOne='Success!'
                    textTwo='Your Institution structure has been updated, You can make changes by clicking Manage Structure'
                    mainText='Back to Control Panel'
                    buttonStyle='bg-green w-full h-small mt-20 text-white rounded-lg'
                    onClick={onGoBack}
                />
            )}
        </div>
    );
};

export default ManageStructure;
