
import axios from 'axios';

// Set your API base URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tabr.app';

// Types
interface OrganizationNode {
  id: string;
  name: string;
  parent_id?: string | null;
  origin?: string;
  organizations?: OrganizationNode[];
}

/**
 * Fetch organization chart data for the current institution
 */
export const fetchOrganizationChart = async (): Promise<OrganizationNode[]> => {
  try {
    // Mock data for development - remove in production and use the commented code
    return mockOrganizationData();
    
    // Actual API call code
    /*
    const institutionId = localStorage.getItem('institutionId');
    if (!institutionId) {
      throw new Error('Institution ID not found');
    }
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const response = await axios.get(
      `${API_BASE_URL}/api/institutions/${institutionId}/organizations`, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    
    return response.data.data || [];
    */
  } catch (error) {
    console.error('Error fetching organization chart:', error);
    throw new Error('Failed to load organization chart');
  }
};

/**
 * Save organization chart data
 */
export const saveOrganizationChart = async (data: OrganizationNode[]): Promise<void> => {
  try {
    // Mock success for development - remove in production and use the commented code
    console.log('Saving organization data:', data);
    return Promise.resolve();
    
    // Actual API call code
    /*
    const institutionId = localStorage.getItem('institutionId');
    if (!institutionId) {
      throw new Error('Institution ID not found');
    }
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    await axios.post(
      `${API_BASE_URL}/api/institutions/${institutionId}/organizations`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    */
  } catch (error: any) {
    console.error('Error saving organization chart:', error);
    throw new Error(error.response?.data?.message || 'Failed to save organization chart');
  }
};

/**
 * Mock data function for development
 */
const mockOrganizationData = (): OrganizationNode[] => {
  return [
    {
      id: "1",
      name: "Main School",
      parent_id: null,
      origin: "manual",
      organizations: [
        {
          id: "2",
          name: "Administrative Department",
          parent_id: "1",
          origin: "manual",
          organizations: [
            {
              id: "5",
              name: "Finance Office",
              parent_id: "2",
              origin: "manual"
            },
            {
              id: "6",
              name: "Admissions Office",
              parent_id: "2",
              origin: "manual"
            }
          ]
        },
        {
          id: "3",
          name: "Primary School",
          parent_id: "1",
          origin: "manual",
          organizations: [
            {
              id: "7",
              name: "Lower Primary",
              parent_id: "3",
              origin: "manual"
            },
            {
              id: "8",
              name: "Upper Primary",
              parent_id: "3",
              origin: "manual"
            }
          ]
        },
        {
          id: "4",
          name: "Secondary School",
          parent_id: "1",
          origin: "manual",
          organizations: [
            {
              id: "9",
              name: "Junior Secondary",
              parent_id: "4",
              origin: "manual"
            },
            {
              id: "10",
              name: "Senior Secondary",
              parent_id: "4",
              origin: "manual"
            }
          ]
        }
      ]
    }
  ];
};
