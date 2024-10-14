export interface User {
    id: number; // Unique identifier for the user
    name: string; // Full name of the user
    username: string; // Username of the user
    email: string; // Email address of the user
    address: {
        street: string; // Street address of the user
        suite: string; // Suite or apartment number
        city: string; // City where the user resides
        zipcode: string; // Postal code
        geo: {
            lat: string; // Latitude for geographical location
            lng: string; // Longitude for geographical location
        };
    };
    phone: string; // Phone number of the user
    website: string; // User's personal or business website
    company: {
        name: string; // Name of the company the user is associated with
        catchPhrase: string; // Catchphrase of the company
        bs: string; // Business slogan or description
    };
}
