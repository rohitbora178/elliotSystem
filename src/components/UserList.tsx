import React, { useEffect, useState } from 'react';
import { DetailsList, IColumn, PrimaryButton, DefaultButton, Spinner, SpinnerSize } from '@fluentui/react';
import { fetchData } from '../api/fetchData';
import { User } from '../types/types';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);     // State to hold the list of users
    const [loading, setLoading] = useState<boolean>(true);     // State to manage loading status
    const [showOdds, setShowOdds] = useState<boolean>(false);     // State to toggle showing only users with odd IDs
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());     // State to keep track of expanded rows for company info

    // Fetch user data when the component mounts
    useEffect(() => {
        const loadData = async () => {
            const userData = await fetchData(); // Fetch data from API
            setUsers(userData); // Set users in state
            setLoading(false); // Update loading state
        };

        loadData(); // Call the loadData function
    }, []);

    // Toggle function for showing/hiding company info
    const toggleCompanyInfo = (id: number) => {
        setExpandedRows(prev => {
            const newExpandedRows = new Set(prev);
            if (newExpandedRows.has(id)) {
                newExpandedRows.delete(id); // Remove from expanded if already expanded
            } else {
                newExpandedRows.add(id); // Add to expanded if not already expanded
            }
            return newExpandedRows;
        });
    };

    // Toggle function for showing odds or all users
    const toggleShowOdds = () => {
        setShowOdds(prev => !prev); // Switch the state
    };

    // Filter users based on whether to show only odd IDs
    const filteredUsers = showOdds ? users.filter(user => user.id % 2 !== 0) : users;

    // Define columns for the DetailsList
    const columns: IColumn[] = [
        { key: 'column1', name: 'ID', fieldName: 'id', minWidth: 50, maxWidth: 100 },
        { key: 'column2', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
        { key: 'column3', name: 'Username', fieldName: 'username', minWidth: 100, maxWidth: 200 },
        { key: 'column4', name: 'Email', fieldName: 'email', minWidth: 150, maxWidth: 250, onRender: (item: User) => (
            <a href={`mailto:${item.email}`}>{item.email}</a> // Render email as a clickable link
        )},
        { key: 'column5', name: 'Address', fieldName: 'address', minWidth: 200, maxWidth: 300, onRender: (item: User) => (
            <>
                {item.address.street}<br />
                {item.address.suite}<br />
                {item.address.city} {item.address.zipcode} // Display address details
            </>
        )},
        {
            key: 'column6', name: 'Company', fieldName: 'company', minWidth: 100, maxWidth: 150, onRender: (item: User) => (
                <>
                    {expandedRows.has(item.id) ? ( // Check if row is expanded
                        <div style={{ marginTop: '8px' }}>
                            <div><b>Name:</b> {item.company.name}</div>
                            <div><b>Catch Phrase:</b> {item.company.catchPhrase}</div>
                            <div><b>Bs:</b> {item.company.bs}</div>
                        </div>
                    ) : (
                        <DefaultButton text="Show Info" onClick={() => toggleCompanyInfo(item.id)} />
                    )}
                </>
            )
        },
    ];

    // Show a spinner while data is loading
    if (loading) {
        return <Spinner size={SpinnerSize.large} label="Loading..." />;
    }

    // Render the user list and the button to toggle odd users
    return (
        <div>
            <PrimaryButton text={showOdds ? "Show All" : "Show Odds Only"} onClick={toggleShowOdds} />
            <DetailsList
                items={filteredUsers} // Pass the filtered user list to DetailsList
                columns={columns} // Pass the defined columns
                setKey="set"
                layoutMode={1} 
                selectionMode={0} 
            />
        </div>
    );
};

export default UserList;
