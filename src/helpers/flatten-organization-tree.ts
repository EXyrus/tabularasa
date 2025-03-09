
import { Organization, OrganizationNode } from '@/types';

export const flattenOrganizationTree = (tree: OrganizationNode): Organization[] => {
  const result: Organization[] = [];

  function traverse(node: OrganizationNode) {
    result.push({
      id: node.id,
      name: node.name,
      type: node.type,
      parent: node.parent,
    });

    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    }
  }

  traverse(tree);
  return result;
};

export default flattenOrganizationTree;
