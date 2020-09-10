import React from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import './index.css';

class ItemDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            itemData : {}
        }
        this.getItemData = this.getItemData.bind(this);
    }

    componentDidMount() {
        this.getItemData();
    }

    getItemData() {
        axios.get(`http://localhost:8080/api/item/itemById/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({itemData: response.data});
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
    render() {
        return (
            <>
                <h1>{this.state.itemData.name}</h1>
                <h3>{this.state.itemData.description}</h3>
            </>
        )
    }
}

export default ItemDetails;