import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Select, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { GetStartedCard, MediumCard } from 'components';
import PermissionCard from 'components/cards/PermissionCard';
import SuccessCard from 'components/success/SuccessCard';
import AddRolesFrame from 'frames/AddRolesFrame';
import PATHS from 'pages/institution/paths.json';
import { getRoleById } from 'helpers/get-role';
import {
    useAddRolePermissions,
    useInstitutionModules,
    useInstitutionRoles
} from 'queries';

const { Option } = Select;

const OrganizationRoles = () => {
    const { data: roles, isLoading: loadingRoles } = useInstitutionRoles();
    const { data: modules } = useInstitutionModules();
    const { addPermissions } = useAddRolePermissions();
    const navigate = useNavigate();
    const [, setIsLoading] = useState<boolean>(false);
    const [selectedRoleId, setSelectedRoleId] = useState<string>();
    const [openModuleId, setOpenModuleId] = useState<string | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        []
    );
    const [, setShowMark] = useState(false);
    const [successful, setSucessful] = useState(false);

    useEffect(() => {
        if (selectedRoleId !== undefined && roles) {
            const selectedRole = getRoleById(roles, selectedRoleId);

            if (selectedRole) {
                const permissionIds = selectedRole.permissions.map(p => p.id);

                setSelectedPermissions(permissionIds);
            }
        }
    }, [selectedRoleId, roles]);

    const toggleModule = (moduleId: string) => {
        setOpenModuleId(prevModuleId =>
            prevModuleId === moduleId ? null : moduleId
        );
    };

    const onRoleChange = (roleId: string) => {
        setSelectedRoleId(roleId);
    };

    const togglePermission = (permissionId: string) => {
        setSelectedPermissions(prevPermissions =>
            prevPermissions.includes(permissionId)
                ? prevPermissions.filter(id => id !== permissionId)
                : [...prevPermissions, permissionId]
        );
    };

    const onAddModule = async () => {
        if (selectedRoleId) {
            await addPermissions(selectedRoleId, selectedPermissions);
        }

        setSucessful(true);
    };

    const onSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setShowMark(true);
            setIsLoading(false);
        }, 5000);
    };

    const onGoBack = () => {
        setShowMark(false);
        navigate(PATHS.controlPanel.structure.index);
    };

    return loadingRoles ? (
        <div className='my-5 text-center text-base font-semibold'>
            Loading <LoadingOutlined />
        </div>
    ) : (
        <>
            {!successful ? (
                <div className='m-majorMargin p-majorPadding'>
                    <Tabs
                        defaultActiveKey='1'
                        items={[
                            {
                                label: 'Create Role',
                                key: '1',
                                children: (
                                    <div>
                                        <div>
                                            <AddRolesFrame
                                                modules={modules ?? []}
                                                onSubmit={onSubmit}
                                            />
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
                                                <Select
                                                    className='custom-select mt-2 w-full items-center'
                                                    placeholder='Search Role'
                                                    value={selectedRoleId}
                                                    onChange={onRoleChange}
                                                >
                                                    {roles?.map(role => (
                                                        <Option
                                                            key={role.id}
                                                            value={role.id}
                                                        >
                                                            {role.name}
                                                        </Option>
                                                    ))}
                                                </Select>

                                                <div>
                                                    {modules?.map(module => {
                                                        return (
                                                            <div
                                                                key={module.id}
                                                                className={`mt-4 rounded-lg ${
                                                                    openModuleId ===
                                                                    module.id
                                                                        ? 'expanded'
                                                                        : ''
                                                                }`}
                                                                role='button'
                                                                tabIndex={0}
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
                                                    })}
                                                </div>
                                            </div>

                                            <Button
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
                    textTwo='Role has been updated successfully '
                    mainText='Back to Control Panel'
                    buttonStyle='bg-green w-full h-small mt-20 text-white rounded-lg'
                    onClick={onGoBack}
                />
            )}
        </>
    );
};

export default OrganizationRoles;
