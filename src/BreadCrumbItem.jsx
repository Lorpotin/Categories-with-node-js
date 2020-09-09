import React from 'react';
import './App.css';
import 'antd/dist/antd.dark.css';
import './index.css';
import { Breadcrumb } from 'antd';

class BreadCrumbItem extends React.Component {
    render() {
        return(
            <Breadcrumb.Item>{this.props.item}</Breadcrumb.Item>
        )
    }
}

export default BreadCrumbItem;