import React from 'react'
import { useLocation } from 'react-router-dom';

const NextPage = () => {
    const location = useLocation();
    const { company } = location.state || {}; // Destructure the company data

    return (
        <div>
            <h2>Next Page</h2>
            {company ? (
                <div>
                    <h3>Company Details:</h3>
                    <p><strong>Company Name:</strong> {company.company_name}</p>
                    <p><strong>Short Name:</strong> {company.company_short_name}</p>
                    <p><strong>Email:</strong> {company.email_id}</p>
                    <p><strong>GST:</strong> {company.gst}</p>
                    <p><strong>Landline Number:</strong> {company.landline_number}</p>
                    <p><strong>Registration Number:</strong> {company.registration_number}</p>
                    <p><strong>Stage:</strong> {company.stage}</p>
                </div>
            ) : (
                <p>No company data available.</p>
            )}
        </div>
    );
};

export default NextPage