import { AutoComplete, Input } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import type {
    Employee,
    Institution,
    InstitutionFee,
    InstitutionResponse,
    Organization,
    Role,
    Student
} from 'types';

export type SearchOption = {
    id: string;
} & (
    | Employee
    | Institution
    | Role
    | InstitutionFee
    | InstitutionResponse
    | Student
    | Organization
);

type SearchProps = {
    placeholder: string;
    options: SearchOption[];
    onSelect: (id: string) => void;
    onFilterChange?: (filteredItems: SearchOption[]) => void;
    className?: string;
    value?: string;
};

const SearchInput = ({
    placeholder,
    options,
    onSelect,
    onFilterChange,
    className,
    value,
    ...props
}: SearchProps) => {
    const [selected, setSelected] = useState<string>('');
    const [filteredOptions, setFilteredOptions] =
        useState<typeof options>(options);

    // Update filteredOptions when options prop changes
    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    // Transform options to match AutoComplete format
    const transformOptions = useCallback(() => {
        return filteredOptions.map(item => ({
            value: 'id' in item ? item.id : '',
            label: (() => {
                if ('firstName' in item || 'name' in item) {
                    const firstName = 'firstName' in item ? item.firstName : '';
                    const lastName = 'lastName' in item ? item.lastName : '';
                    const name = 'name' in item ? item.name : '';

                    return (
                        `${firstName} ${lastName} ${name}`.trim() || 'Unnamed'
                    );
                }

                return 'Unnamed';
            })()
        })) as { value: string; label: string }[];
    }, [filteredOptions]);

    // Handle option selection
    const onSelectOption = useCallback(
        (value: string) => {
            const selectedOption = options.find(item => {
                if ('id' in item) {
                    return item.id === value;
                }

                return false;
            });

            if (selectedOption) {
                const displayName =
                    'firstName' in selectedOption
                        ? `${selectedOption.firstName} ${
                              ('name' in selectedOption
                                  ? selectedOption.name
                                  : '') || ''
                          }`.trim()
                        : ('name' in selectedOption &&
                          typeof selectedOption.name === 'string'
                              ? selectedOption.name
                              : '') || '';

                setSelected(displayName || 'Unnamed');
                onSelect(value.toString());
            }
        },
        [options, onSelect]
    );

    // Handle input search and filter options
    const onSearch = useCallback(
        (value: string) => {
            const filtered = options.filter(item => {
                if ('firstName' in item && typeof item.firstName === 'string') {
                    return item.firstName
                        .toLowerCase()
                        .includes(value.toLowerCase());
                }

                if ('name' in item) {
                    return item.name
                        .toLowerCase()
                        .includes(value.toLowerCase());
                }

                return false;
            });

            setSelected(value);
            setFilteredOptions(filtered);
            onFilterChange?.(filtered);
        },
        [options, onFilterChange]
    );

    return (
        <AutoComplete
            options={transformOptions()}
            style={{ width: '100%', height: '50px' }}
            onSelect={onSelectOption}
            onSearch={onSearch}
            value={selected || value}
            {...props}
        >
            <Input.Search
                className={className}
                placeholder={placeholder}
                size='large'
            />
        </AutoComplete>
    );
};

export default SearchInput;
