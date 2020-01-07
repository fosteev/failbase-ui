import React, {useEffect, useState} from "react";
import {request} from "../../actions/main";
import {Table, Divider, Tag} from 'antd';
import {Link} from "react-router-dom";


const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
}, {
    title: 'Date',
    dataIndex: 'Date',
    key: 'date',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <Link to={`/${record.name}`}>
            logs
      </Link>
    ),
}];


export default function Projects(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request('projects', 'GET').then(resp => {
            setData(resp);
            setLoading(false);
        });
    }, [])

    return (
        <div>
            <Table loading={loading} dataSource={data} columns={columns}/>;
        </div>
    )
}