import React from "react";
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;
import Projects from "../projects";
import Statistic from "../statistic";
import Root from "../../Root";
import Project from "../project";

export default function Home(props) {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[location.pathname]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/home"><Link to={'/home'}>home</Link></Menu.Item>
                    <Menu.Item key="/projects"><Link to={'/projects'}>projects</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Switch>
                    <Route path={'/home'} component={Statistic}/>
                    <Route path={'/projects'} component={Projects}/>
                    <Route component={Project} />
                </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}