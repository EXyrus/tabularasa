import { List, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ListCard, SearchInput } from 'components';
import type { SearchOption } from 'components/search/SearchInput';
import { getCloudinaryImage } from 'helpers/image';
import PATHS from 'pages/institution/paths.json';
import { useGetInstitutionStructure, useStudents } from 'queries';
import type { Organization, Student } from 'types';

const { Option } = Select;

const ManageTransaction = () => {
    const navigate = useNavigate();
    const { data: students } = useStudents();
    const { data: structure, isLoading } = useGetInstitutionStructure();
    const [filteredStudents, setFilteredStudents] = useState<Student[]>(
        students ?? []
    );
    const [selectedLevel, setSelectedLevel] = useState<string | undefined>();
    const [selectedUnit, setSelectedUnit] = useState<string | undefined>();

    useEffect(() => {
        if (students) {
            setFilteredStudents(students); // Set setFilteredStudents to all students initially
        }
    }, [students]);

    const onPayment = (id: string) => {
        const path = generatePath(PATHS.finance.transactions.item, { id });

        navigate(path);
    };

    const onFilterChange = (filteredItems: Student[]) => {
        setFilteredStudents(filteredItems);
    };

    const onLevelChange = (value: string) => {
        setSelectedLevel(value);
        setSelectedUnit(undefined); // Reset unit selection when level changes
    };

    const onClassChange = (value: string) => {
        setSelectedUnit(value);
    };

    const renderLevels = (organizations: Organization[]) => {
        return organizations.map(level => (
            <Option value={level.id} key={level.id}>
                {level.name}
            </Option>
        ));
    };

    const renderUnits = (
        organizations: Organization[],
        selectedLevelId: number | string | undefined
    ) => {
        const selectedLevel = organizations.find(
            level => level.id === selectedLevelId
        );

        return selectedLevel?.organizations.map(classItem => (
            <Option value={classItem.id} key={classItem.id}>
                {classItem.name}
            </Option>
        ));
    };

    if (isLoading) {
        return <Spin fullscreen />;
    }

    return (
        <div className='m-majorMargin p-majorPadding'>
            <div className='text-lg'>Register Cash Transaction</div>
            <div className='mt-5'>
                <div className='flex w-full items-center justify-between gap-2'>
                    <div className='w-fifty'>
                        <label>Level</label>
                        <Select
                            className='custom-select mt-2 w-full items-center'
                            placeholder='Select Level'
                            onChange={onLevelChange}
                            value={selectedLevel}
                        >
                            {structure && renderLevels(structure)}
                        </Select>
                    </div>
                    <div className='w-fifty'>
                        <label>Unit</label>
                        <Select
                            className='custom-select mt-2 w-full items-center'
                            placeholder='Select Unit'
                            onChange={onClassChange}
                            value={selectedUnit}
                            disabled={!selectedLevel}
                        >
                            {structure && renderUnits(structure, selectedLevel)}
                        </Select>
                    </div>
                </div>

                <div className='mt-5'>
                    <label>Student Name</label>

                    <SearchInput
                        placeholder='Search Student...'
                        options={students ?? []}
                        onSelect={(value: string) => onPayment(value)}
                        onFilterChange={(filteredItems: SearchOption[]) => {
                            const filteredStudents =
                                students?.filter(student =>
                                    filteredItems.some(
                                        item => item?.id === student.id
                                    )
                                ) ?? [];

                            onFilterChange(filteredStudents);
                        }}
                    />
                </div>
                <div>
                    <List
                        dataSource={filteredStudents}
                        renderItem={(student, index) => (
                            <List.Item key={index}>
                                <ListCard
                                    employeeFullName={
                                        student?.firstName +
                                        ' ' +
                                        student?.lastName
                                    }
                                    imgUrl={getCloudinaryImage(student.photo)}
                                    onProfileClick={() => {
                                        onPayment(student.id ?? '');
                                    }}
                                    employeeRole={[]}
                                    employeeEmail={student.status}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ManageTransaction;
