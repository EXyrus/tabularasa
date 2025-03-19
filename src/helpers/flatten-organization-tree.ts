
import { Organization, OrganizationNode } from '@/types/event';

export const flattenOrganizationTree = (
  node: OrganizationNode | Organization,
  level = 0,
  path: string[] = []
): OrganizationNode[] => {
  const flattened: OrganizationNode[] = [
    {
      id: node.id,
      name: node.name,
      parentId: node.parentId,
      children: node.children as OrganizationNode[],
      level,
      path,
    },
  ];

  if (node.children && node.children.length > 0) {
    // For each child, recursively flatten
    node.children.forEach(child => {
      const childPath = [...path, node.id];
      const flattenedChildren = flattenOrganizationTree(child, level + 1, childPath);
      flattened.push(...flattenedChildren);
    });
  }

  return flattened;
};

export default flattenOrganizationTree;
