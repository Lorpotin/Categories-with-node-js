import React from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import './index.css';
import { Tree } from 'antd';
import { Spin } from 'antd';
import Item from './Item';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            categories: [],
            items: []
        }
        this.getCategories = this.getCategories.bind(this);
        this.getItems = this.getItems.bind(this);
    }

    componentDidMount() {   
        this.getCategories();
    }

    getItems(treeId) {
        this.setState({ loading: true }, () => {
            axios.get(`http://localhost:8080/api/categories/subCategory/${treeId}`)
            .then((response) => {
                console.log(response.data);
                this.setState({ items: response.data, loading: false})
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    getCategories() {
        this.setState({ loading: true }, () => {
            axios.get('http://localhost:8080/api/categories/allCategories')
            .then((response) => {
                this.setState({ categories: response.data, loading: false})
            })
            .catch((error) => {
                console.log(error);
            });
        });
    }

    onSelect = (e) => {
        this.getItems(e);
    }

    render() {
        return (
            <>
                 <Tree
                    onSelect={this.onSelect}
                    treeData={this.state.categories}
                />
                {this.state.loading ? 
                    <Spin size="large" />
                : 
                    this.state.items <= 0 ?
                        <h1>No items in this category!</h1>
                    : this.state.items.map((item => (
                        <Item item={item}></Item>
                    )))
                }
            </>
        );
    }
}


export default App;
