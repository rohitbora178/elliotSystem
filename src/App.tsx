import React from 'react';
import UserList from './components/UserList'; 
import Styles from "./App.module.css"; 

const App: React.FC = () => {
    return (
        <div className={Styles["App"]}> 
            <h1 className={Styles["App-header"]}>User List</h1> 
            <UserList /> 
        </div>
    );
};

export default App; 