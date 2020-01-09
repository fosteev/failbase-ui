import React, {useEffect, useState} from "react";
import {request} from "../../actions/main";
import {Table} from "antd";
import ReactJson from 'react-json-view';

const an = v => v < 10 ? `0${v}` : v;

const columns = [{
    title: 'Header',
    dataIndex: 'head',
    key: 'name',
}, {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
}, {
    title: 'Request url',
    dataIndex: 'url'
},{
    title: 'Date',
    dataIndex: 'date',
    sorter: true,
    key: 'date',
    render: v => {
        const date = new Date(v);
        return `${an(date.getHours())}:${an(date.getMinutes())}:${an(date.getSeconds())} ${an(date.getDate())}-${an(date.getMonth())}-${date.getFullYear()}`
    }
}, {
    title: 'Additional',
    dataIndex: 'additional_json',
    key: 'json',
    render: v => {
        try {
            return <ReactJson src={JSON.parse(v)} />
        } catch (e) {
            return 'Invalid JSON: ' + v;
        }
    }
}];

export default function Project(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        request(`project${location.pathname}`, 'GET').then(resp => {
            setData(resp.reverse());
            setLoading(false);
        })
    }, [])

    return (
        <div>
            {location.pathname}
            <Table loading={loading} dataSource={data} columns={columns} locale={'sort'}/>;
        </div>
    )
}