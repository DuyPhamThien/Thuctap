import React, { Component } from 'react';
import Table from '../TableMe/TableMe'
import { Button } from 'primereact/button';
const axios = require('axios');
class SaleOrderView extends Component {
    constructor(props) {
        super(props);
        this.tableStatic = {
            ADD: 'none',
            columns: {
                STT: {
                    'header': 'STT',
                    'func': (rowid, colid, data) => {
                        return rowid + 1
                    },

                },
                contractNumber: {
                    'header': 'Mã hợp đồng',
                    'filter': true,
                    'placeholder': "Tìm kiếm",

                },
                contractDate: {
                    'header': 'Ngày kí hợp đồng',
                    'sort': true,
                    'date': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                    'typefilter': 'date'
                },
                contractAmount: {
                    'header': 'Giá trị hợp đồng',
                    'sort': true,
                    'number': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                },
                commission: {
                    'header': 'Chiết khấu thương mại',
                    'sort': true,
                    'number': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                },
                productCode: {
                    'header': 'Mã sản phẩm',
                    'sort': true
                },
                orderDate: {
                    'header': 'Ngày đặt cọc',
                    'sort': true,
                    'date': true,
                    'filter': true,
                    'typefilter': 'date'
                },
                customerCode: {
                    'header': 'Mã khách hàng',
                    'sort': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
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


                    return axios.post(`https://apigateway.ecolandvn.com/sale/v1/demo/api/sale_order/filter/customer/BMT/all/${page}/25`, {
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



            },
            add: {


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

export default SaleOrderView;