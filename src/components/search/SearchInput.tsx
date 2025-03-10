
import React, { useState, useEffect } from 'react';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchOption {
  value: string;
  label: string;
}

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  options?: SearchOption[];
  loading?: boolean;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  options = [],
  loading = false,
  className = '',
}) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText) {
        onSearch(searchText);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, onSearch]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSelect = (value: string) => {
    setSearchText(value);
    onSearch(value);
  };

  return (
    <AutoComplete
      className={className}
      options={options}
      onSelect={handleSelect}
      onSearch={handleSearch}
      value={searchText}
    >
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        loading={loading}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </AutoComplete>
  );
};

export default SearchInput;
