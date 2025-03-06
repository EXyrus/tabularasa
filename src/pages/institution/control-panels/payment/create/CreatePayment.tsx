import { App, Button, Form, Input, List, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { GrStatusWarning } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import deleteUser from 'assets/img/delete-user.svg';
import { GetStartedCard, SearchInput } from 'components';
import ListItem from 'components/lists/ListItem';
import Modal from 'components/modals/Modals';
import SuccessCard from 'components/success/SuccessCard';
import AddPaymentFrame from 'frames/AddPaymentFrame';
import PATHS from 'pages/institution/paths.json';
import { useEditInstitutionFees, useInstitutionFees } from 'queries';
import type { InstitutionFee } from 'types';
const AddPayment = () => {
    const navigate = useNavigate();
    const { notification } = App.useApp();
    const { data: fees } = useInstitutionFees();
    const { editFee, deleteFee } = useEditInstitutionFees();
    const [isLoading] = useState<boolean>(false);
    const [filteredFees, setFilteredFees] = useState<InstitutionFee[]>([]);
    const [selectedFeeId, setSelectedFeeId] = useState<string>();
    const [selectedFeeName, setSelectedFeeName] = useState<string>('');
    const [showMark, setShowMark] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        if (fees) {
            setFilteredFees(fees);
        }
    }, [fees]);

    const onSelect = (id: string) => {
        setSelectedFeeId(id);

        const selectedFee = filteredFees.find(fee => fee.id === id);

        if (selectedFee) {
            setFilteredFees([selectedFee]);
        }
    };

    const onFilterChange = (filteredFees: any) => {
        setFilteredFees(filteredFees);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const onCancel = () => {
        setShowModal(false);
    };

    const onHandleDelete = async () => {
        if (selectedFeeId) {
            try {
                await deleteFee(selectedFeeId);
                // Close delete modal or perform other actions after deleting
                setShowModal(false);
                notification.success({
                    message: 'Payment deleted successfully.'
                });
            } catch (err) {
                notification.error({ message: 'Failed to delete payment.' });
            }
        }
    };

    const onHandleEdit = async () => {
        if (selectedFeeId && selectedFeeName) {
            try {
                await editFee(selectedFeeId, selectedFeeName);
                // Close edit modal or perform other actions after editing
                setShowEditModal(false);
                notification.success({
                    message: 'Payment edited successfully.'
                });
                setShowEditModal(false);
            } catch (err) {
                notification.error({ message: 'Failed to delete payment.' });
            }
        }
    };

    const onEdit = (id: string) => {
        setSelectedFeeId(id);
        setShowEditModal(true);
    };

    const onDelete = (id: string) => {
        setSelectedFeeId(id);
        setShowModal(true);
    };

    const closeDeleteModal = () => {
        setShowModal(false);
    };

    const onGoBack = () => {
        setShowMark(false);
        navigate(PATHS.controlPanel.index);
    };

    return (
        <>
            {!showMark ? (
                <div className='m-majorMargin p-majorPadding'>
                    <Tabs
                        defaultActiveKey='1'
                        items={[
                            {
                                label: 'Create Payment',
                                key: '1',
                                children: <AddPaymentFrame />
                            },
                            {
                                label: 'Manage Payment',
                                key: '2',
                                children: (
                                    <div>
                                        <div className='mt-5'>
                                            <GetStartedCard name='Fees' />
                                        </div>

                                        <SearchInput
                                            placeholder='Search Fees'
                                            options={fees ?? []}
                                            onSelect={onSelect}
                                            onFilterChange={onFilterChange}
                                        />

                                        <List
                                            itemLayout='horizontal'
                                            dataSource={filteredFees}
                                            renderItem={(fee, index) => (
                                                <ListItem
                                                    key={index}
                                                    item={fee}
                                                    onEdit={() =>
                                                        onEdit(fee.id)
                                                    }
                                                    onDelete={() =>
                                                        onDelete(fee.id)
                                                    }
                                                    renderContent={fee =>
                                                        `${fee.paymentTitle}`
                                                    }
                                                    renderAmount={fee =>
                                                        `₦${fee.amount}`
                                                    }
                                                />
                                            )}
                                        />

                                        <div>
                                            <Modal
                                                isOpen={showModal}
                                                onClose={closeDeleteModal}
                                            >
                                                <div className='flex w-full flex-col items-center justify-center'>
                                                    <div className='flex items-center justify-center'>
                                                        <img
                                                            src={deleteUser}
                                                            alt='delete button'
                                                        />
                                                    </div>
                                                    <div className='mt-5 flex w-extraTiny items-center justify-center gap-2 rounded-md bg-lightdanger px-4 py-1 text-12 text-red'>
                                                        <GrStatusWarning
                                                            size={15}
                                                            color='red'
                                                        />
                                                        Delete Payment
                                                    </div>
                                                    <div className='m-10 text-center text-14'>
                                                        Are you sure you want to
                                                        delete this Payment?
                                                    </div>

                                                    <Button
                                                        type='primary'
                                                        onClick={onHandleDelete}
                                                        className='h-small w-full bg-danger'
                                                    >
                                                        {isLoading
                                                            ? 'Loading...'
                                                            : 'Confirm Action'}
                                                    </Button>

                                                    <Button
                                                        type='primary'
                                                        onClick={onCancel}
                                                        className='mt-5 h-small w-full border-2 border-slate-100 bg-white text-black'
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Modal>
                                        </div>

                                        <div>
                                            <Modal
                                                isOpen={showEditModal}
                                                onClose={closeEditModal}
                                            >
                                                <div className='w-full'>
                                                    <div className='flex w-full flex-col items-center justify-center'>
                                                        <div className='mt-5 flex w-extraTiny items-center justify-center gap-2 rounded-md bg-lightBlue px-4 py-1 text-12 text-green'>
                                                            <GrStatusWarning
                                                                size={15}
                                                                color='red'
                                                            />
                                                            Rename
                                                        </div>
                                                        <div className='m-10 text-center text-14'>
                                                            Type the new fee
                                                            title and tap save
                                                        </div>
                                                        <Form.Item
                                                            name='fee_name'
                                                            rules={[
                                                                {
                                                                    required:
                                                                        true,
                                                                    message:
                                                                        'Enter Payment Name'
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
                                                                    value={
                                                                        selectedFeeName
                                                                    }
                                                                    onChange={e =>
                                                                        setSelectedFeeName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder={
                                                                        selectedFeeName
                                                                    }
                                                                    className='mt-2 h-small w-large'
                                                                />
                                                            </div>
                                                        </Form.Item>

                                                        <Button
                                                            type='primary'
                                                            onClick={
                                                                onHandleEdit
                                                            }
                                                            className='h-small w-full bg-green'
                                                        >
                                                            {isLoading
                                                                ? 'Loading...'
                                                                : 'Confirm Action'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>
            ) : (
                <SuccessCard
                    textOne='Success!'
                    textTwo='Your Payment has been updated. You can make changes by clicking Manage Payment'
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

export default AddPayment;
