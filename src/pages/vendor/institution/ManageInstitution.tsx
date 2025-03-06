import { LoadingOutlined } from '@ant-design/icons';
import { Card, List } from 'antd';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { SearchInput } from 'components';
import { getCloudinaryImage } from 'helpers/image';
import PATHS from 'pages/vendor/paths.json';
import { useInstitutions } from 'queries/use-institutions';
import type { InstitutionResponse } from 'types';
import type { SearchOption } from 'components/search/SearchInput';

const { Meta } = Card;

const ManageInstitutions = () => {
    const { data: institutions, isError, isLoading } = useInstitutions();
    const navigate = useNavigate();

    const [filteredSchools, setFilteredSchool] = useState<InstitutionResponse>(
        institutions ?? []
    );

    const onEditSchool = (id: string) => {
        const path = generatePath(PATHS.institutions.item.edit, {
            id
        });

        navigate(path);
    };

    const onSelect = (id: string) => {
        onEditSchool(id);
    };

    const onFilterChange = (filteredSchools: InstitutionResponse) => {
        setFilteredSchool(filteredSchools);
    };

    useEffect(() => {
        if (institutions) {
            setFilteredSchool(institutions); // Set setFilteredSchool to all schools initially
        }
    }, [institutions]);

    if (isLoading) {
        return (
            <h2 className='mt-5 flex animate-pulse items-center justify-center text-center text-lg font-semibold'>
                Loading Information <br />
                <LoadingOutlined />
            </h2>
        );
    }

    return (
        <div className='m-majorMargin p-majorPadding'>
            <div>
                <p className='font-poppins text-xxl font-bold'>
                    Manage Institutions
                </p>
            </div>

            <SearchInput
                placeholder='Search Institution...'
                options={(institutions as unknown as SearchOption[]) ?? []}
                onSelect={onSelect}
                onFilterChange={filteredItems =>
                    onFilterChange(
                        filteredItems as unknown as InstitutionResponse
                    )
                }
            />

            <div className='mt-10'>
                <p>Recent interaction</p>
            </div>

            {institutions && (
                <div className='mt-2 flex w-full flex-wrap items-center justify-around gap-3'>
                    <List
                        grid={{
                            gutter: 10,
                            xs: 2,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 3
                        }}
                        dataSource={filteredSchools}
                        renderItem={institution => (
                            <List.Item>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            src={getCloudinaryImage(
                                                institution.logo
                                            )}
                                            alt={`${institution.name}'s logo`}
                                        />
                                    }
                                    onClick={() => {
                                        onEditSchool(institution.id);
                                    }}
                                >
                                    <Meta
                                        title={institution.name}
                                        description={`Status: ${institution.status}`}
                                    ></Meta>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            )}
            {isError && (
                <h1 className='flex items-center text-center text-2xl font-bold'>
                    Failed to load institution information
                </h1>
            )}
        </div>
    );
};

export default ManageInstitutions;
