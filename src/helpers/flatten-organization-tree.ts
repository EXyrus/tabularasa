import type { Organization } from 'types';

export const flattenOrgTree = (org: Organization): Organization[] => {
    const flattened: Organization[] = [];

    const traverse = (org: Organization) => {
        // Add the current organization
        flattened.push({ ...org, organizations: [] });
        // Recursively process child organizations
        for (const child of org.organizations) {
            traverse(child);
        }
    };

    traverse(org);

    return flattened;
};
