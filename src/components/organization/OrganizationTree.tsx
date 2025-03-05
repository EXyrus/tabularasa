
import React from 'react';
import { Edit, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrganizationNode {
  id: string;
  name: string;
  parent_id?: string | null;
  origin?: string;
  organizations?: OrganizationNode[];
}

interface OrganizationTreeProps {
  data: OrganizationNode[];
  onEdit: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete?: (id: string) => void;
}

const OrganizationTree: React.FC<OrganizationTreeProps> = ({
  data,
  onEdit,
  onAddChild,
  onDelete
}) => {
  // If there's no data, show empty state
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-6xl">📊</div>
        <h3 className="text-xl font-semibold mb-2">No Organization Structure</h3>
        <p className="text-gray-500 mb-4">
          You haven't created an organization structure yet. 
          Create your first organization.
        </p>
      </div>
    );
  }

  // Recursive function to render organization nodes
  const renderOrganizationNodes = (nodes: OrganizationNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id} className={`ml-${level * 8} mb-4`}>
        <Card className="border-l-4 border-l-sms-institution shadow-sm">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">{node.name}</CardTitle>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onEdit(node.id)}
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onAddChild(node.id)}
                title="Add Child"
              >
                <Plus className="h-4 w-4" />
              </Button>
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(node.id)}
                  title="Delete"
                  className="text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          {node.organizations && node.organizations.length > 0 && (
            <CardContent className="pt-2 pb-4 pl-4">
              <div className="border-l-2 border-dashed border-gray-300 pl-4">
                {renderOrganizationNodes(node.organizations, level + 1)}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    ));
  };

  return <div className="space-y-2">{renderOrganizationNodes(data)}</div>;
};

export default OrganizationTree;
