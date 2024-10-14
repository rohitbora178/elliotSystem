import axios from 'axios'; 
import { User } from '../types/types'; 

// Function to fetch user data from the API
export const fetchData = async (): Promise<User[]> => {
    try {
        // Make a GET request to the specified URL to fetch users
        const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        return response.data; // Return the data from the response
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Error fetching data:', error);
        // Throw a new error to indicate the failure
        throw new Error('Failed to fetch user data');
    }
};
