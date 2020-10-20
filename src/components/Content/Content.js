import React, { Component } from 'react';
import './content.scss';
class Content extends Component {
    render() {
        return (
            <div className="layout-content">
                <div class="layout-breadcrumb">
                    <ul>
                        <li>
                            <button class="p-link"><i class="fas fa-home"></i></button>
                        </li>
                        <li>/</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Content;