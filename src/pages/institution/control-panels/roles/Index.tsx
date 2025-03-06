import { Button, Form, Input, List, Tabs, App } from 'antd';
import { useEffect, useState } from 'react';
import { GrStatusWarning } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import deleteUser from 'assets/img/delete-user.svg';
import { GetStartedCard, MediumCard, SearchInput } from 'components';
import ListItem from 'components/lists/ListItem';
import PermissionCard from 'components/cards/PermissionCard';
import Modal from 'components/modals/Modals';
import SuccessCard from 'components/success/SuccessCard';
import PATHS from 'pages/institution/paths.json';
import {
    useAddRolePermissions,
    useEditInstitutionRoles,
    useInstitutionModules,
    useInstitutionRoles
} from 'queries';
import { getRoleById } from 'helpers/get-role';
import type { Role } from 'types';

const RoleManagement = () => {
    const navigate = useNavigate();
    const { notification } = App.useApp();
    const { data: roles } = useInstitutionRoles();
    const { data: modules } = useInstitutionModules();
    const { editRole, deleteRole } = useEditInstitutionRoles();
    const { addPermissions } = useAddRolePermissions();
    const [isLoading] = useState<boolean>(false);
    const [showMark, setShowMark] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
    const [selectedRoleId, setSelectedRoleId] = useState<string>();
    const [selectedRoleName, setSelectedRoleName] = useState<string>('');
    const [openModuleId, setOpenModuleId] = useState<string | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        []
    );

    useEffect(() => {
        if (roles) {
            setFilteredRoles(roles);
        }
    }, [roles]);

    useEffect(() => {
        if (selectedRoleId !== undefined && roles) {
            const selectedRole = getRoleById(roles, selectedRoleId);

            if (selectedRole) {
                const permissionIds = selectedRole.permissions.map(p => p.id);

                setSelectedPermissions(permissionIds);
            }
        }
    }, [roles, selectedRoleId]);

    const toggleModule = (moduleId: string) => {
        setOpenModuleId(prevModuleId =>
            prevModuleId === moduleId ? null : moduleId
        );
    };

    const togglePermission = (permissionId: string) => {
        setSelectedPermissions(prevPermissions =>
            prevPermissions.includes(permissionId)
                ? prevPermissions.filter(id => id !== permissionId)
                : [...prevPermissions, permissionId]
        );
    };

    const onCancel = () => {
        setShowModal(false);
    };

    const onCancelEdit = () => {
        setShowEditModal(false);
    };

    const onAddModule = async () => {
        if (selectedRoleId) {
            await addPermissions(selectedRoleId, selectedPermissions);
        }

        setSuccessful(true);
    };

    const onHandleDelete = async () => {
        if (selectedRoleId) {
            try {
                await deleteRole(selectedRoleId);
                // Close delete modal or perform other actions after deleting
                setShowModal(false);
                notification.success({ message: 'Role deleted successfully.' });
            } catch (err) {
                notification.error({ message: 'Failed to delete role.' });
            }
        }
    };

    const onHandleEdit = async () => {
        if (selectedRoleId && selectedRoleName) {
            try {
                await editRole(selectedRoleId, selectedRoleName);
                // Close edit modal or perform other actions after editing
                setShowModal(false);
                notification.success({ message: 'Role edited successfully.' });
                setShowEditModal(false);
            } catch (err) {
                notification.error({ message: 'Failed to edit role.' });
            }
        }
    };

    const onSelect = (roleId: string) => {
        setSelectedRoleId(roleId);

        const selectedRole = filteredRoles.find(role => role.id === roleId);

        if (selectedRole) {
            setFilteredRoles([selectedRole]);
        }
    };

    const onFilterChange = (filteredRoles: any) => {
        setFilteredRoles(filteredRoles);
    };

    const onEdit = (roleId: string) => {
        setSelectedRoleId(roleId);
        setShowEditModal(true);
    };

    const onDelete = (roleId: string) => {
        setSelectedRoleId(roleId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const onGoBack = () => {
        setShowMark(false);
        navigate(PATHS.controlPanel.index);
    };

    return (
        <>
            {!successful ? (
                !showMark ? (
                    <div className='m-majorMargin p-majorPadding'>
                        <Tabs
                            defaultActiveKey='1'
                            items={[
                                {
                                    label: 'Roles',
                                    key: '1',
                                    children: (
                                        <div>
                                            <div className='mb-5'>
                                                <GetStartedCard name='Roles' />
                                            </div>

                                            <SearchInput
                                                placeholder='Search Roles'
                                                options={roles ?? []}
                                                onSelect={(id: string) =>
                                                    onSelect(id)
                                                }
                                                onFilterChange={onFilterChange}
                                            />

                                            <List
                                                itemLayout='horizontal'
                                                dataSource={filteredRoles}
                                                renderItem={role => (
                                                    <ListItem
                                                        key={role.id}
                                                        item={role}
                                                        renderContent={item =>
                                                            item.name
                                                        }
                                                        onEdit={() =>
                                                            onEdit(role.id)
                                                        }
                                                        onDelete={() =>
                                                            onDelete(role.id)
                                                        }
                                                    />
                                                )}
                                            />

                                            <div>
                                                <Modal
                                                    isOpen={showModal}
                                                    onClose={closeModal}
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
                                                            Delete Role
                                                        </div>
                                                        <div className='m-10 text-center text-14'>
                                                            Are you sure you
                                                            want to delete this
                                                            Role? All the people
                                                            attached to this
                                                            role will lose their
                                                            Role
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
                                                    onClose={onCancelEdit}
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
                                                                Type the new
                                                                Role title and
                                                                tap save
                                                            </div>
                                                            <Form.Item
                                                                name='roleName'
                                                                rules={[
                                                                    {
                                                                        required:
                                                                            true,
                                                                        message:
                                                                            'Enter Role Name'
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
                                                                            selectedRoleName
                                                                        }
                                                                        onChange={e =>
                                                                            setSelectedRoleName(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        placeholder='Type the new role title'
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

                                                            <Button
                                                                type='primary'
                                                                onClick={
                                                                    onCancelEdit
                                                                }
                                                                className='mt-5 h-small w-full border-2 border-slate-100 bg-white text-black'
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        </div>
                                    )
                                },
                                {
                                    label: 'Manage Roles',
                                    key: '2',
                                    children: (
                                        <div>
                                            <div>
                                                <div className='mt-10'>
                                                    <div className='mb-5'>
                                                        <GetStartedCard name='Manage Roles' />
                                                    </div>

                                                    <label>Role</label>

                                                    <SearchInput
                                                        placeholder='Search Roles'
                                                        options={roles ?? []}
                                                        onSelect={(
                                                            id: string
                                                        ) => onSelect(id)}
                                                        onFilterChange={
                                                            onFilterChange
                                                        }
                                                    />

                                                    <div>
                                                        {modules?.map(
                                                            module => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            module.id
                                                                        }
                                                                        className={`mt-4 rounded-lg ${
                                                                            openModuleId ===
                                                                            module.id
                                                                                ? 'expanded'
                                                                                : ''
                                                                        }`}
                                                                        role='button'
                                                                        tabIndex={
                                                                            0
                                                                        }
                                                                    >
                                                                        <MediumCard
                                                                            customClass={
                                                                                'p-4 bg-grey'
                                                                            }
                                                                            manageText={
                                                                                module.name
                                                                            }
                                                                            manageContent={`Manage module permission for institution access to ${module.name}`}
                                                                            textClass={
                                                                                'text-black'
                                                                            }
                                                                            manageClass={
                                                                                'text-black'
                                                                            }
                                                                            secondClass={
                                                                                'text-black'
                                                                            }
                                                                            iconColor={
                                                                                'black'
                                                                            }
                                                                            arrowSetting={
                                                                                openModuleId ===
                                                                                module.id
                                                                                    ? 'arrow-down'
                                                                                    : ''
                                                                            }
                                                                            onClick={() =>
                                                                                toggleModule(
                                                                                    module.id
                                                                                )
                                                                            }
                                                                        />
                                                                        {openModuleId ===
                                                                            module.id && (
                                                                            <div
                                                                                className={
                                                                                    'h-auto rounded p-5'
                                                                                }
                                                                            >
                                                                                <div className='flex flex-wrap justify-between gap-2'>
                                                                                    {module.permissions.map(
                                                                                        permission => {
                                                                                            return (
                                                                                                <div
                                                                                                    key={`${module.id}-${permission.id}`}
                                                                                                >
                                                                                                    <PermissionCard
                                                                                                        permission={
                                                                                                            permission
                                                                                                        }
                                                                                                        permissionSelected={selectedPermissions.includes(
                                                                                                            permission.id
                                                                                                        )}
                                                                                                        onTogglePermission={
                                                                                                            togglePermission
                                                                                                        }
                                                                                                    />
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>

                                                <Button
                                                    disabled={!selectedRoleId}
                                                    className='mt-10 h-small w-full bg-green text-white'
                                                    onClick={onAddModule}
                                                >
                                                    Update
                                                </Button>
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
                        textTwo='Your Institution structure has been updated, You can make changes by clicking Manage Structure'
                        mainText='Back to Control Panel'
                        buttonStyle='bg-green w-full h-small mt-20 text-white rounded-lg'
                        onClick={onGoBack}
                    />
                )
            ) : (
                <SuccessCard
                    textOne='Success!'
                    textTwo='Role has been updated successfully '
                    mainText='Back to Control Panel'
                    buttonStyle='bg-green w-full h-small mt-20 text-white rounded-lg'
                    onClick={onGoBack}
                />
            )}
        </>
    );
};

export default RoleManagement;
