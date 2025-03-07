import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NextPage = () => {
    const location = useLocation();
    const { company } = location.state || {};
  
    useEffect(() => {
        console.log('Company Data:', company);
    }, []);
    // State for editable fields
    const [stage, setStage] = useState(company?.stage || '');
    const [accountStatus, setAccountStatus] = useState(company?.account_status || false);

    const handleStageChange = (e) => {
        setStage(e.target.value);
    };

    const handleAccountStatusChange = (e) => {
        setAccountStatus(e.target.checked);
    };

    if (!company) {
        return <p>No company data available.</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Company Details</h2>
            <div className="row">
                {/* Left Side */}
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">
                            <strong>Company Name:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            value={company.company_name || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="shortName" className="form-label">
                            <strong>Short Name:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="shortName"
                            value={company.company_short_name || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            <strong>Email:</strong>
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={company.email_id || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gst" className="form-label">
                            <strong>GST:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="gst"
                            value={company.gst || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="landline" className="form-label">
                            <strong>Landline Number:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="landline"
                            value={company.landline_number || ''}
                            readOnly
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="registrationNumber" className="form-label">
                            <strong>Registration Number:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="registrationNumber"
                            value={company.registration_number || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="website" className="form-label">
                            <strong>Website:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="website"
                            value={company.website_url || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="businessPan" className="form-label">
                            <strong>Business PAN:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="businessPan"
                            value={company.business_pan_card || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="alternateContact" className="form-label">
                            <strong>Alternate Contact:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="alternateContact"
                            value={company.alternate_contact_number || ''}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stage" className="form-label">
                            <strong>Stage:</strong>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="stage"
                            value={stage}
                            onChange={handleStageChange}
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="accountStatus"
                            checked={accountStatus}
                            onChange={handleAccountStatusChange}
                        />
                        <label htmlFor="accountStatus" className="form-check-label">
                            <strong>Account Status:</strong>
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-4">
                <button className="btn btn-primary" onClick={() => alert('Save functionality here')}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default NextPage;