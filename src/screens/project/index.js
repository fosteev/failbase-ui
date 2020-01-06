import React, {useEffect, useState} from "react";
import {request} from "../../actions/main";
import {Table} from "antd";

const columns = [{
    title: 'Header',
    dataIndex: 'head',
    key: 'name',
}, {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
}, {
    title: 'Date',
    dataIndex: 'Date',
    key: 'date',
}];

export default function Project(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        request(`project${location.pathname}`, 'GET').then(resp => {
            setData(resp);
        })
    })

    return (
        <div>
            {location.pathname}
            <Table dataSource={data} columns={columns}/>;
        </div>
    )
}