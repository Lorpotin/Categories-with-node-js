import React from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import './index.css';
import { Card, Col } from 'antd';

class Item extends React.Component {
  
    render() {
        return (
            <Col span={6}>
                <Card title={this.props.item.name} extra={<a href="/ItemDetails/">More</a>}>
                    <p>{this.props.item.description}</p>
                    <p>ID: {this.props.item.category_id}</p>
                </Card>
            </Col>
        )
    }
}

export default Item;