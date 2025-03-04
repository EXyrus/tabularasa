
import React, { useState, useRef, useEffect } from 'react';
import { Input, Select, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { cn } from '@/lib/utils';

export interface SelectOption {
  label: string;
  value: string | number;
  [key: string]: any;
}

interface SearchableSelectProps {
  options: SelectOption[];
  placeholder?: string;
  value?: string | number | null;
  onChange?: (value: string | number | null) => void;
  onSearch?: (value: string) => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  renderOption?: (option: SelectOption) => React.ReactNode;
  filterOption?: (input: string, option: SelectOption) => boolean;
  notFoundContent?: React.ReactNode;
  style?: React.CSSProperties;
  allowClear?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  loading = false,
  className,
  disabled = false,
  required = false,
  renderOption,
  filterOption,
  notFoundContent,
  style,
  allowClear,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  // Default filter function if not provided
  const defaultFilterOption = (input: string, option: SelectOption) => {
    return option.label.toLowerCase().includes(input.toLowerCase());
  };

  // Filtered options based on search text
  const filteredOptions = searchText
    ? options.filter((option) => 
        filterOption 
          ? filterOption(searchText, option)
          : defaultFilterOption(searchText, option)
      )
    : options;

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleSelect = (selectedValue: string | number) => {
    if (onChange) {
      onChange(selectedValue);
    }
    setOpen(false);
    setSearchText('');
  };

  const handleClear = () => {
    if (onChange) {
      onChange(null);
    }
    setSearchText('');
  };

  // Focus input when dropdown opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Find the selected option to display its label
  const selectedOption = options.find(option => option.value === value);

  return (
    <Select
      className={cn('w-full', className)}
      style={style}
      showSearch
      value={value}
      open={open}
      onDropdownVisibleChange={setOpen}
      placeholder={placeholder}
      optionFilterProp="label"
      onChange={handleSelect}
      onSearch={handleSearch}
      searchValue={searchText}
      loading={loading}
      disabled={disabled}
      allowClear={allowClear ?? !required}
      onClear={handleClear}
      dropdownRender={menu => (
        <div>
          <div className="px-2 py-2 border-b">
            <Input
              ref={inputRef}
              placeholder="Search..."
              value={searchText}
              onChange={e => handleSearch(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
          </div>
          {loading ? (
            <div className="flex justify-center p-4">
              <Spin size="small" />
            </div>
          ) : (
            menu
          )}
        </div>
      )}
      notFoundContent={notFoundContent || <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No options found" />}
    >
      {filteredOptions.map((option) => (
        <Select.Option key={option.value} value={option.value} label={option.label}>
          {renderOption ? renderOption(option) : option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SearchableSelect;
