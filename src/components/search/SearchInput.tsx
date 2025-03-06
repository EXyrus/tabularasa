
import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AppType } from '@/types/app';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = 'Search...', 
  onSearch,
  className = ''
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined className="text-gray-400" />}
      value={value}
      onChange={handleChange}
      className={`rounded-lg ${className}`}
      size="large"
    />
  );
};

export default SearchInput;
