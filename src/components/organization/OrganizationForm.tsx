
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface OrganizationNode {
  id: string;
  name: string;
  parent_id?: string | null;
  origin?: string;
  organizations?: OrganizationNode[];
}

interface OrganizationFormProps {
  organizationId: string | null;
  organizationData: OrganizationNode[] | null;
  onSubmit: (data: OrganizationNode[]) => void;
  onCancel: () => void;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  organizationId,
  organizationData,
  onSubmit,
  onCancel
}) => {
  const [nodes, setNodes] = useState<OrganizationNode[]>([]);
  
  const form = useForm({
    defaultValues: {
      name: '',
      origin: ''
    }
  });

  // Prepare data on component mount or when organizationId changes
  useEffect(() => {
    if (!organizationData) {
      // If no data, create a new root node
      const newNode: OrganizationNode = {
        id: uuidv4(),
        name: '',
        parent_id: null,
        origin: 'manual'
      };
      setNodes([newNode]);
      return;
    }
    
    // If editing an existing structure
    if (organizationId) {
      // Find the node and its children
      const findNodeAndChildren = (
        nodes: OrganizationNode[], 
        id: string
      ): OrganizationNode[] => {
        for (const node of nodes) {
          if (node.id === id) {
            // Found the node, return it along with its children
            return [node, ...(node.organizations || [])];
          }
          if (node.organizations && node.organizations.length > 0) {
            const result = findNodeAndChildren(node.organizations, id);
            if (result.length > 0) return result;
          }
        }
        return [];
      };
      
      const nodeAndChildren = findNodeAndChildren(organizationData, organizationId);
      
      if (nodeAndChildren.length > 0) {
        // Flatten the hierarchy for the form
        const flattenedNodes = nodeAndChildren.map(node => ({
          id: node.id,
          name: node.name,
          parent_id: node.parent_id || null,
          origin: node.origin || 'manual'
        }));
        
        setNodes(flattenedNodes);
        
        // Set initial form values for the first node
        form.reset({
          name: nodeAndChildren[0].name,
          origin: nodeAndChildren[0].origin || 'manual'
        });
      }
    } else {
      // Creating a new root node
      const newNode: OrganizationNode = {
        id: uuidv4(),
        name: '',
        parent_id: null,
        origin: 'manual'
      };
      setNodes([newNode]);
    }
  }, [organizationId, organizationData]);

  const handleAddChildNode = (parentId: string) => {
    const newNode: OrganizationNode = {
      id: uuidv4(),
      name: '',
      parent_id: parentId,
      origin: 'manual'
    };
    
    setNodes([...nodes, newNode]);
    
    // Show toast for feedback
    toast({
      title: "Child node added",
      description: "Please fill in the details for the new node.",
    });
  };

  const handleRemoveNode = (id: string) => {
    // Check if this is the root node
    const isRoot = nodes.length > 0 && nodes[0].id === id;
    if (isRoot && nodes.length > 1) {
      toast({
        title: "Cannot remove root node",
        description: "Please remove all child nodes first.",
        variant: "destructive"
      });
      return;
    }
    
    // Filter out the node to be removed
    const updatedNodes = nodes.filter(node => node.id !== id);
    
    // Also filter out any children of this node
    const filteredNodes = updatedNodes.filter(node => node.parent_id !== id);
    
    setNodes(filteredNodes);
  };

  const handleNodeFieldChange = (
    id: string, 
    field: 'name' | 'origin', 
    value: string
  ) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === id) {
        return { ...node, [field]: value };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const moveNode = (id: string, direction: 'up' | 'down') => {
    const index = nodes.findIndex(node => node.id === id);
    if (index === -1) return;
    
    // Find nodes with the same parent
    const currentNode = nodes[index];
    const siblingNodes = nodes.filter(node => 
      node.parent_id === currentNode.parent_id
    );
    
    const siblingIndex = siblingNodes.findIndex(node => node.id === id);
    
    // Can't move if it's already at the edge
    if (
      (direction === 'up' && siblingIndex === 0) || 
      (direction === 'down' && siblingIndex === siblingNodes.length - 1)
    ) {
      return;
    }
    
    // Create a new array with the node moved
    const newSiblings = [...siblingNodes];
    const targetIndex = direction === 'up' ? siblingIndex - 1 : siblingIndex + 1;
    
    // Swap the nodes
    [newSiblings[siblingIndex], newSiblings[targetIndex]] = 
      [newSiblings[targetIndex], newSiblings[siblingIndex]];
    
    // Replace the relevant nodes in the main array
    const updatedNodes = [...nodes];
    siblingNodes.forEach((_, i) => {
      const nodeIndex = nodes.findIndex(n => n.id === siblingNodes[i].id);
      updatedNodes[nodeIndex] = newSiblings[i];
    });
    
    setNodes(updatedNodes);
  };

  const handleFormSubmit = () => {
    // Validate that all nodes have names
    const emptyNodes = nodes.filter(node => !node.name.trim());
    if (emptyNodes.length > 0) {
      toast({
        title: "Validation Error",
        description: "All organization nodes must have a name.",
        variant: "destructive"
      });
      return;
    }
    
    // Convert flat nodes structure to hierarchical for the API
    const buildHierarchy = (parentId: string | null = null): OrganizationNode[] => {
      const children = nodes.filter(node => node.parent_id === parentId);
      
      return children.map(child => {
        const childrenNodes = buildHierarchy(child.id);
        return {
          ...child,
          organizations: childrenNodes.length > 0 ? childrenNodes : undefined
        };
      });
    };
    
    const rootNodes = buildHierarchy(null);
    if (rootNodes.length === 0) {
      toast({
        title: "Error",
        description: "No root organization found.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit the hierarchical structure
    onSubmit(rootNodes);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chart
        </Button>
        <h2 className="text-2xl font-bold">
          {organizationId ? 'Edit Organization' : 'Create Organization'}
        </h2>
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          {nodes.map((node, index) => (
            <Card key={node.id} className="shadow-md">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">
                      {index === 0 ? 'Root Organization' : `Sub-Organization ${index}`}
                    </h3>
                    <div className="flex space-x-1">
                      {index !== 0 && (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => moveNode(node.id, 'up')}
                            title="Move Up"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => moveNode(node.id, 'down')}
                            title="Move Down"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleAddChildNode(node.id)}
                        title="Add Child"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveNode(node.id)}
                        title="Remove"
                        className="text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <FormLabel htmlFor={`name-${node.id}`}>Name</FormLabel>
                      <Input
                        id={`name-${node.id}`}
                        value={node.name}
                        onChange={(e) => handleNodeFieldChange(node.id, 'name', e.target.value)}
                        className="w-full"
                        placeholder="Enter organization name"
                      />
                    </div>
                    
                    <input
                      type="hidden"
                      value={node.origin || 'manual'}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleFormSubmit}
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Organization Chart
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OrganizationForm;
