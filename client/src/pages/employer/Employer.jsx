import React from 'react';
import './employer.css';
import Navbar from '../../components/navbar/Navbar';

function Employer() {
    return (
        <div>
            <Navbar employerNavBar={true} />
            <h1>Employer Dashboard</h1>
        </div>
    )
}

export default Employer
