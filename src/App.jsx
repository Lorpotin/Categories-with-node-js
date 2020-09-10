import React from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import './index.css';
import { Tree } from 'antd';
import { Spin, Row, Breadcrumb } from 'antd';
import Item from './Item';
import BreadCrumbItem from './BreadCrumbItem';


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            categories: [],
            items: [],
            breadcrumbs: [],
        }
        this.getCategories = this.getCategories.bind(this);
        this.getItems = this.getItems.bind(this);
        this.getBreadcrumb = this.getBreadcrumb.bind(this);
    }

    componentDidMount() {   
        this.getCategories();
    }

    getItems(treeId) {
        return axios.get(`http://localhost:8080/api/categories/subCategory/${treeId}`)
        .then((response) => {
            return response.data;
            
        })
        .catch((error) => {
            console.log(error);
        });
    }
    // Bundle together with getItems call and return both at the same api call..
    getBreadcrumb(treeId) {
        return axios.get(`http://localhost:8080/api/categories/categoryBreadcrumb/${treeId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
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
        if(e && e.length) {
            Promise.all([this.getBreadcrumb(e), this.getItems(e)])
            .then(([breadcrumbs, items])  => {
                this.setState({
                    breadcrumbs,
                    items
                });
            });
        }
    }

    render() {
        return (
            <>
                <Tree
                    onSelect={this.onSelect}
                    treeData={this.state.categories}
                />
                <Breadcrumb>
                    { this.state.breadcrumbs <= 0 ?
                        <p></p>
                        :
                        
                        this.state.breadcrumbs.map((item, i) => (
                            <BreadCrumbItem key={i} item={item}></BreadCrumbItem>
                        ))
                    }
                </Breadcrumb>

                <div className="site-card-wrapper">
                    <Row gutter={12}>
                {this.state.loading ? 
                    <Spin size="large" />
                : 
                    this.state.items <= 0 ?
                        <p></p>
                    : this.state.items.map((item, i) => (
                        <Item key={i} item={item}></Item>
                    ))
                }
                    </Row>
                </div>
            </>
        );
    }
}


export default App;
