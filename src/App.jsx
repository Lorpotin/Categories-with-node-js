import React from 'react';
import axios from 'axios';
import './App.css';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.dark.css';
import './index.css';
import { Tree } from 'antd';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
			data: null
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {   
        this.getData();
    }

    getData() {
        axios.get('http://localhost:8080/api/categories/allCategories')
        .then((response) => {
            console.log(response.data);
            this.setState({ data: response.data})
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Tree
                treeData={this.state.data}
            />
        );
    }
}

export default App;
