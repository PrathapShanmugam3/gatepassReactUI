


import React, { useEffect } from 'react'
import Api from '../../Api';

function Dashboard() {

    const req = {
        dataCode: "GETALL_COMPANY_DETAILS_WITH_LOG",
        placeholderKeyValueMap: {}
    };

    useEffect(() => {
        Api.post('/customdata/getdata', req)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <>
        </>
    )
}

export default Dashboard