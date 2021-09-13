import React, { Component } from 'react';

class ContactSample extends Component {
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
                    <h1>ContactSample</h1>
                </div>
            </div>
        );
    }
}

export default ContactSample;