import { useState } from 'react';
import { Select } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import PATHS from 'pages/institution/paths.json';
import tickPencil from 'assets/img/tick-pencil.svg';
import academic from 'assets/img/cap-white.svg';
import markWhite from 'assets/img/mark-white.svg';
import { UserInfo, StatisticsCard } from 'components';
import { useGetInstitutionStructure } from 'queries';
import type { Organization } from 'types';

const Managements = () => {
    const navigate = useNavigate();
    const [selectedUnit, setSelectedUnit] = useState<number | undefined>();
    const { data } = useGetInstitutionStructure();

    const onHandleAttendance = () => {
        navigate(PATHS.unitManagement.attendance);
    };

    const onUnitChange = (value: number) => {
        setSelectedUnit(value);
    };

    const onViewUnit = () => {
        const unitPath = generatePath(PATHS.unitManagement.unit, {
            id: selectedUnit
        });

        navigate(unitPath);
    };

    const renderLevels = (organizations: Organization[]) => {
        return organizations.map(level => (
            <Select.Option value={level.id} key={level.id}>
                {level.name}
            </Select.Option>
        ));
    };
    const renderUnits = (organizations: Organization[]) => {
        const unit = organizations.find(unit => unit.id === selectedUnit);

        return unit?.organizations.map(classItem => (
            <Select.Option value={classItem.id} key={classItem.id}>
                {classItem.name}
            </Select.Option>
        ));
    };

    return (
        <div className='m-majorMargin p-majorPadding'>
            <div>
                <div>
                    <div>
                        <UserInfo />
                    </div>

                    <div>
                        <div className='mt-5'>
                            <label>Select Level</label>
                            <Select
                                className='custom-select mt-2 w-full items-center'
                                placeholder='Select Level'
                                onChange={onUnitChange}
                            >
                                {data && renderLevels(data)}
                            </Select>
                        </div>
                        <div className='mb-5 mt-5'>
                            <label>Select Unit</label>
                            <Select
                                className='custom-select mt-2 w-full items-center'
                                placeholder='Select Unit'
                                disabled={!selectedUnit}
                            >
                                {data && renderUnits(data)}
                            </Select>
                        </div>
                    </div>
                    <div className='mt-2 flex justify-center gap-4'>
                        <StatisticsCard
                            textColor='text-12 mt-5 text-warning'
                            buildingBackground='bg-warning p-2 w-thirtyFive rounded-lg'
                            countTextStyle='text-lg font-bold'
                            imageStyle='w-small2'
                            countStyle='mt-2'
                            cardImage={academic}
                            count={'100'}
                            text='Unit Count'
                            mainContainer='bg-lightYello p-5 h-auto w-oneeighty rounded-lg'
                        />
                        <StatisticsCard
                            buildingBackground='bg-green p-2 w-thirtyFive rounded-lg'
                            textColor='text-12 mt-5 text-green'
                            countTextStyle='text-lg font-bold'
                            countStyle='mt-2'
                            imageStyle='w-small2'
                            cardImage={academic}
                            count={'120'}
                            text='Attended'
                            mainContainer='bg-lightGreen p-5 h-auto w-oneeighty rounded-lg'
                        />
                    </div>
                    <div className='mt-20 flex justify-center gap-4'>
                        <StatisticsCard
                            textColor='text-10 mt-5 text-white'
                            countTextStyle='text-16 font-bold text-white'
                            imageStyle='w-thirtyFive'
                            countStyle='mt-2'
                            cardImage={academic}
                            count={'View Unit'}
                            onClick={onViewUnit}
                            text='View the student list and manage  profile'
                            mainContainer='bg-green p-5 h-auto w-oneeighty rounded-lg'
                        />
                        <StatisticsCard
                            onClick={onHandleAttendance}
                            textColor='text-10 mt-5 text-white'
                            countTextStyle='text-16 font-bold text-white'
                            countStyle='mt-2'
                            imageStyle='w-thirtyFive'
                            cardImage={markWhite}
                            count={'Mark Attendance'}
                            text='Manage attendance & absence form'
                            mainContainer='bg-green p-5 h-auto w-oneeighty rounded-lg'
                        />
                    </div>
                    <div className='mt-2'>
                        <StatisticsCard
                            textColor='text-10 mt-5 text-white'
                            countTextStyle='text-16 font-bold text-white'
                            imageStyle='w-thirtyFive'
                            countStyle='mt-2'
                            cardImage={tickPencil}
                            count={'Assignment, Classwork & Test'}
                            text='Create assignment, take home assignments
                                Mark and record scores. 
                                '
                            mainContainer='bg-green p-5 h-auto w-full rounded-lg'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Managements;
