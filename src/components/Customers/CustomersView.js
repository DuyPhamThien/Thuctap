import React, { Component } from 'react';
import Table from '../TableMe/TableMe'
import { Button } from 'primereact/button';
const axios = require('axios');
class CustomersView extends Component {
    constructor(props) {
        super(props);
        this.tableStatic = {
            columns: {
                STT: {
                    'header': 'STT',
                    'func': (rowid, colid, data) => {
                        return rowid + 1
                    },

                },
                btn: {
                    'header': 'Thiết lập',
                    'func': (rowid, colid, data) => {
                        return (
                            <div>
                                <Button icon="pi pi-pencil" className="p-button-sm p-mr-1 p-button-raised p-button-text"
                                    onClick={e => {
                                        var state = {};
                                        Object.keys(this.tableStatic.edit).map(item => {
                                            state[item] = data[rowid][item];
                                        });
                                        state['openDiaEdit'] = true;
                                        this.table.setState(state);
                                    }}
                                />
                                <Button icon="pi pi-trash" className="p-button-sm p-mr-1 p-button-raised p-button-text" onClick={e => this.table.setState({
                                    openDiaDel: true, id: data[rowid].id
                                })} />
                            </div>
                        );

                    }
                },
                objectCode: {
                    'header': 'Mã khách hàng',
                    'filter': true,
                    'placeholder': "Tìm kiếm",

                },
                name: {
                    'header': 'Tên',
                    'sort': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                },
                email: {
                    'header': 'Email',
                    'sort': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                },
                phone: {
                    'header': 'Điện thoại',
                    'sort': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                },
                address: {
                    'header': 'Địa chỉ',
                    'sort': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                },
                idNumber: {
                    'header': 'CMND',
                    'sort': true
                },
                issueDate: {
                    'header': 'Ngày cấp',
                    'sort': true,
                    'date': true
                },
                issuePlace: {
                    'header': 'Nơi cấp',
                    'sort': true
                },


            },
            rowStyle: (rowid, data) => {
                if (data[rowid].id > 100) {
                    return { backgroundColor: '#f8f9fa' }
                }
            }
            ,
            events: {
                filter: async (filter, page, sort) => {
                    var filters = [];
                    for (const item in filter) {
                        filters.push({
                            "key": item,
                            "operation": "EQUALITY",
                            "operator": "and",
                            "value": filter[item].value
                        })
                    }
                    axios.defaults.headers.common['authorization'] = `Bearer ${global.keycloak.token}`;


                    return axios.post(`https://apigateway.ecolandvn.com/sale/v1/demo/api/customer/filter/BMT/${page}/25`, {
                        "filters": filter ? filters : [],
                        "orders": sort ? [{
                            "asc": sort.sortOrder == 1 ? true : false,
                            "key": sort.sortField,
                        }] : [
                            {
                                "asc": true,
                                "key": "id"
                            }
                        ]
                    })

                },
                add: (data, item) => {
                    var data1 = {};
                    Object.keys(item).map(item => {
                        data1[item] = data[item]

                    })
                    data1.projectCode = 'BMT'
                    data1.attributes = {
                        "Danh xung": "",
                        "Biet Danh": "",
                        "test": "",
                        "test1": "",
                        "Hộ khẩu thường trú": "",
                        "Địa chỉ tạm trú": ""
                    }
                    data1.idPictures = []

                    return axios.post('https://apigateway.ecolandvn.com/sale/v1/demo/api/customer', data1)
                },
                put: (data, item) => {
                    var data1 = {};
                    Object.keys(item).map(item => {
                        if (item == "status") {
                            data1[item] = (String(data[item]) == "true" ? true : false)
                        }
                        else {
                            data1[item] = data[item]
                        }

                    })
                    data1.projectCode = 'BMT'
                    data1.attributes = {
                        "Danh xung": "",
                        "Biet Danh": "",
                        "test": "",
                        "test1": "",
                        "Hộ khẩu thường trú": "",
                        "Địa chỉ tạm trú": ""
                    }
                    data1.idPictures = []

                    return axios.put('https://apigateway.ecolandvn.com/sale/v1/demo/api/customer', data1)
                },
                delete: (data) => {

                    return axios.delete(`https://apigateway.ecolandvn.com/sale/v1/demo/api/customer/${data}`)
                }
            },
            edit: {
                id: {
                    type: "text",
                    disable: true
                },
                objectCode: {
                    type: "text",
                },
                name: {
                    type: "text",
                },
                email: {
                    type: "text",
                },
                phone: {
                    type: "text",
                },
                address: {
                    type: "text",
                },
                idNumber: {
                    type: "text",
                },
                issueDate: {
                    type: "date",
                },
                issuePlace: {
                    type: "text",
                },


            },
            add: {
                objectCode: {
                    type: "text",
                },
                name: {
                    type: "text",
                },
                email: {
                    type: "text",
                },
                phone: {
                    type: "text",
                },
                address: {
                    type: "text",
                },
                idNumber: {
                    type: "text",
                },
                issueDate: {
                    type: "date",
                },
                issuePlace: {
                    type: "text",
                },

            },
        }
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
                <div className="layout-content-container">
                    <div style={{ overflow: 'auto', minHeight: '400px' }}>
                        <div style={{ width: 'max-content', minWidth: '100%' }}>
                            <Table ref={c => this.table = c} struct={this.tableStatic} />
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default CustomersView;