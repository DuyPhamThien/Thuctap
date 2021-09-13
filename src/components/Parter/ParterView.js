import React, { Component } from 'react';
import Table from '../TableMe/TableMe'
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
const axios = require('axios');

class ParterView extends Component {

    constructor(props) {
        super(props);
        this.tableStatic = {
            columns: {
                STT: {
                    'header': 'STT',
                    'func': (rowid, colid, data) => {
                        return rowid
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
                name: {
                    'header': 'Tên',
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                    'sort': true,
                    'style': () => ({ color: 'green' })
                },
                email: {
                    'header': 'Email',
                    'sort': true
                },
                partnerCode: {
                    'header': 'Mã đối tác',
                    'filter': false,
                    // 'func': (rowid, colid, data) => {
                    //     return <Checkbox checked={data[rowid][colid] == true ? true : false}></Checkbox>
                    // },
                    'sort': true
                },
                phoneNumber: {
                    'header': 'SDT',
                    'sort': true
                },
                representName: {
                    'header': 'Tên đại diện',
                    'sort': true
                },
                taxCode: {
                    'header': 'Taxt code',
                    'sort': true
                },
                description: {
                    'header': 'Mô tả',
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

                    return axios.post(` https://apigateway.ecolandvn.com/sale/v1/demo/api/partner/filter/${page}/25`, {
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
                    return axios.post('https://apigateway.ecolandvn.com/sale/v1/demo/api/partner', data1)
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

                    return axios.put('https://apigateway.ecolandvn.com/sale/v1/demo/api/partner', data1)
                },
                delete: (data) => {
                    return axios.delete(`https://apigateway.ecolandvn.com/sale/v1/demo/api/partner/${data}`)
                }
            },
            edit: {
                id: {
                    type: "text",
                    disable: true
                },
                name: {
                    type: "text"
                },
                email: {
                    type: 'text'
                },
                partnerCode: {
                    type: 'text',
                },
                phoneNumber: {
                    type: 'text'
                },
                representName: {
                    type: 'text'
                },
                taxCode: {
                    type: 'text'
                },
                description: {
                    type: 'textarea'
                },
            },
            add: {
                name: {
                    type: "text"
                },
                email: {
                    type: 'text'
                },
                partnerCode: {
                    type: 'text',
                },
                phoneNumber: {
                    type: 'text'
                },
                representName: {
                    type: 'text'
                },
                taxCode: {
                    type: 'text'
                },
                description: {
                    type: 'textarea'
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

export default ParterView;