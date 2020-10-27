import React, { Component } from 'react';
import './content.scss';
class Content extends Component {
    render() {
        return (
            <div className="layout-content">
                <div className="layout-breadcrumb">
                    <ul>
                        <li>
                            <button className="p-link"><i className="fas fa-home"></i></button>
                        </li>
                        <li>/</li>
                    </ul>
                </div>
                <div className="layout-content-container">
                    <h1>Hello</h1>
                </div>
            </div>
        );
    }
}

export default Content;