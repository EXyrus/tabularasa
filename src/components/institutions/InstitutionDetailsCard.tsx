
import React from 'react';
import { Card, Descriptions, Badge, Typography } from 'antd';
import type { Institution } from '@/types';

interface InstitutionDetailsCardProps {
  institution: Institution;
}

export const InstitutionDetailsCard: React.FC<InstitutionDetailsCardProps> = ({ institution }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge status="success" text="Active" />;
      case 'inactive':
        return <Badge status="error" text="Inactive" />;
      case 'pending':
        return <Badge status="warning" text="Pending" />;
      default:
        return <Badge status="default" text={status} />;
    }
  };

  return (
    <Card className="mb-6">
      <Typography.Title level={5}>Institution Information</Typography.Title>
      <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }}>
        <Descriptions.Item label="Name">{institution.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{institution.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{institution.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="Type">{institution.type}</Descriptions.Item>
        <Descriptions.Item label="Status">{getStatusBadge(institution.status)}</Descriptions.Item>
        <Descriptions.Item label="Created">{new Date(institution.createdAt).toLocaleDateString()}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
