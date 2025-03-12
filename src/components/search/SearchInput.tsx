
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
  isLoading?: boolean; // Use this instead of 'loading'
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  debounceTime = 300,
  isLoading = false, // Use isLoading instead of loading
}) => {
  const [searchValue, setSearchValue] = useState('');

  // Debounce the search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue.trim()) {
        onSearch(searchValue);
      }
    }, debounceTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue, debounceTime, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="w-full relative">
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        onChange={handleChange}
        // Remove the loading prop as it doesn't exist on Input
      />
      {isLoading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
