


import React, { useEffect, useState } from 'react'
import Api from '../../Api';

import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Dashboard() {

    const [res, setRes] = useState({ data: [] });
    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);
    const navigate = useNavigate();

    const { logout } = useAuth();


    const req = {
        dataCode: "GETALL_COMPANY_DETAILS_WITH_LOG",
        placeholderKeyValueMap: {}
    };


    useEffect(() => {
        Api.post('/customdata/getdata', req)
            .then((res) => {
                console.log(res.data);
                if (res.data && res.data.statusCode === 0) {
                    setRes({ data: res.data.responseContent || [] });
                } else {
                    console.error('Unexpected API response:', res.data);
                }
            })
            .catch((err) => {
                console.error('API error:', err);
            });
    }, []);

    const handleRadioChange = (index) => {
        setSelectedCompanyIndex(index);
    };

    const handleViewClick = () => {
        if (selectedCompanyIndex !== null) {
            console.log('View company:', res.data[selectedCompanyIndex]);
        }
    };

    const handleNextClick = () => {
        if (selectedCompanyIndex !== null) {
            const selectedCompany = res.data[selectedCompanyIndex];
            navigate('/nextpage', { state: { company: selectedCompany } });
        }
    };
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-danger opacity-75" onClick={logout}>Logout</button>
                    </div>
                    <div className="col text-center">
                        <h2>Company Details</h2>
                    </div>
                    <div className="col">
                        <button className="btn btn-warning m-1" onClick={handleViewClick} disabled={selectedCompanyIndex === null}>VIEW</button>
                        <button className="btn btn-success m-1" onClick={handleNextClick} disabled={selectedCompanyIndex === null}>NEXT</button>
                    </div>
                </div >
            </div >

            <table className="table table-hover">
                <thead className="custom-thead">
                    <tr>
                        {/*  <th>Address</th>  */}
                        <th>Alternate Contact</th>
                        {/* <th>Business PAN</th> */}
                        {/* <th>Company ID</th>  */}
                        <th>Company Name</th>
                        <th>Short Name</th>
                        {/* <th>Country</th>  */}
                        {/* <th>Created Date</th>  */}
                        {/* <th>Establishment Date</th>  */}
                        <th>Email</th>
                        <th>GST</th>
                        {/* <th>ID</th>  */}
                        {/* <>Landline</ */}
                        <th>Landline Number</th>
                        <th>Registration Number</th>
                        {/* <th>Remarks</th>  */}
                        <th>Stage</th>
                        {/* <th>Version</th>  */}
                        {/* <th>Website</th> */}
                        <th>
                            select
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {res.data && res.data.length > 0 ? (
                        res.data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.alternate_contact_number}</td>
                                <td>{item.company_name}</td>
                                <td>{item.company_short_name}</td>
                                <td>{item.email_id}</td>
                                <td>{item.gst}</td>
                                <td>{item.landline_number}</td>
                                <td>{item.registration_number}</td>
                                <td>{item.stage}</td>
                                <td>
                                    <input
                                        type="radio"
                                        checked={selectedCompanyIndex === index}
                                        onChange={() => handleRadioChange(index)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default Dashboard