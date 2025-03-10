
import React from 'react';
import { Card, Descriptions, Tag, Typography } from 'antd';
import { Institution } from '@/types';

interface InstitutionDetailsCardProps {
  institution: Institution;
}

export const InstitutionDetailsCard: React.FC<InstitutionDetailsCardProps> = ({ 
  institution 
}) => {
  // Format the date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Return status tag with appropriate color
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, {color: string, text: string}> = {
      active: { color: 'green', text: 'Active' },
      inactive: { color: 'red', text: 'Inactive' },
      pending: { color: 'gold', text: 'Pending' },
    };
    
    const { color, text } = statusMap[status] || { color: 'default', text: status };
    
    return <Tag color={color}>{text}</Tag>;
  };

  return (
    <Card className="mt-4 mb-6">
      <Typography.Title level={5}>Institution Details</Typography.Title>
      
      <Descriptions layout="vertical" bordered column={{ xs: 1, sm: 2, md: 3 }}>
        <Descriptions.Item label="Name">{institution.name}</Descriptions.Item>
        <Descriptions.Item label="Type">{
          institution.type.charAt(0).toUpperCase() + institution.type.slice(1)
        }</Descriptions.Item>
        <Descriptions.Item label="Status">
          {getStatusTag(institution.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{institution.email || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{institution.phoneNumber || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Slug">{institution.slug}</Descriptions.Item>
        <Descriptions.Item label="Created At">{formatDate(institution.createdAt)}</Descriptions.Item>
        <Descriptions.Item label="Last Updated">{formatDate(institution.updatedAt)}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
