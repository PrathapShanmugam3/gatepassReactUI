import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useParams to get the id
import Api from '../../Api';

const NextPage = () => {
    const { id } = useParams(); // Extract the id from the URL
    const [company, setCompany] = useState(null); // State to store company details
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    // State for editable fields
    const [stage, setStage] = useState();
    const [remarks, setRemarks] = useState(false);

    const navigate = useNavigate();

    // Fetch company details when the component mounts
    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const req = {
                    dataCode: "GETALL_COMPANY_DETAILS_WITH_LOG_BYCOMPANY_ID",
                    placeholderKeyValueMap: {
                        companyId: id,
                    },
                };

                const response = await Api.post('/customdata/getdata', req);
                if (response.data && response.data.statusCode === 0) {
                    const companyData = response.data.responseContent[0];
                    setCompany(companyData);
                    setStage(companyData.stage || '');
                } else {
                    setError('Unexpected API response');
                }
            } catch (err) {
                setError('Error fetching company details');
                console.error('API error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    const handleStageChange = (e) => {
        setStage(e.target.value);
    };

    const handlebackButtonClick = () => {
        navigate('/dashboard');
    };

    const handleRemarks = (e) => {
        setRemarks(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const req = {
                id: id,
                stage: stage,
                remarks: remarks,

            }

            console.log(req);

        } catch (err) {
            setError('Error fetching company details');
            console.error('API error:', err);
        }
    }

    if (loading) {
        return <span className="form-check-input"></span>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!company) {
        return <p>No company data available.</p>;
    }

    return (<>
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
                    {/* Save Button */}
                    <div className='mt-5'>
                        <button className="btn btn-success m-1 me-5" onClick={handleSubmit}>
                            Save Changes
                        </button>
                        <button className="btn btn-danger opacity-75 m-1" onClick={handlebackButtonClick}>Back</button>
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
                        <select
                            className="form-control"
                            id="stage"
                            value={stage}
                            onChange={handleStageChange}
                        >    <option value="">Select</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="mb-3 form-check">
                        <label htmlFor="remarks" className="form-label">
                            <strong>Remarks:</strong>
                        </label>
                        <input
                            type="input"
                            className="form-control"
                            id="remarks"
                            checked={remarks}
                            onChange={handleRemarks}
                        />
                    </div>
                </div>
            </div>


        </div>
    </>
    );
};

export default NextPage;