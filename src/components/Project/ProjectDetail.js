import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';
import './index.scss'
const axios = require('axios');
class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }

    }
    componentDidMount() {
        axios.defaults.headers.common['authorization'] = `Bearer ${global.keycloak.token}`;
        axios.request({
            url: ' https://apigateway.ecolandvn.com/base/v1/demo/api/project/getActiveProject/client-sale',
            method: 'get',
        })
            .then(response => {
                this.setState({
                    data: response.data[0],
                    loading: false
                });

            })
            .catch((error) => {

                console.log(error);

            })
    }

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
                <div style={this.state.loading == true ? { display: 'block' } : { display: 'none ' }} className="me-center" >
                    <Spinner />
                </div>
                <div className="layout-content-container">
                    <div className='row'>
                        <div className="col-md-6" style={{ marginTop: '5px' }}>
                            <table style={{ width: '100%' }} className='table_project_info'>
                                <tbody>
                                    <tr><th>Tên</th><td>:</td><td>{this.state.data.name}</td></tr>

                                    <tr><th>Mã</th><td>:</td><td>{this.state.data.code}</td></tr>
                                    <tr><th>Mô tả</th><td>:</td><td>{this.state.data.description}</td></tr>
                                    <tr><th>Địa chỉ</th><td>:</td><td>{this.state.data.address}</td></tr>
                                    <tr><th>Tên thương mại</th><td>:</td><td>{this.state.data.tradeName}</td></tr>
                                    <tr><th>Tên viết tắt</th><td>:</td><td>{this.state.data.shortName}</td></tr>
                                    <tr><th>Lưu ý</th><td>:</td><td><div className="box_border" style={{ borderRadius: '2px', padding: '5px', minHeight: '50px' }}>{this.state.data.notes}</div></td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <table style={{ width: '100%' }} className='table_project_info'>
                                <tbody>

                                    <tr>
                                        <th>Ảnh đại diện</th>
                                        <td>{this.isset(this.state.data.image) ? <img style={{ width: '100%' }} src={this.state.data.image}></img> : ''}</td>
                                    </tr>
                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    isset(obj) {
        if (typeof (obj) == 'undefined' || obj == null) {
            return false;
        }
        return true;
    }
}

export default ProjectDetail;