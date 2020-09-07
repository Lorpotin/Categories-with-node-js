import React from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import './index.css';

class Item extends React.Component {
  
    render() {
        return (
            <div>
                <h1>{this.props.item.name}</h1>
                <h3>{this.props.item.description}</h3>
                <h6>{this.props.item.category_id}</h6>
            </div>
        )
    }
}

export default Item;