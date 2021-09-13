import React, { Component } from 'react';
import Table from '../TableMe/TableMe'
import { Button } from 'primereact/button';
const axios = require('axios');
class ApartmentView extends Component {
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
                code: {
                    'header': 'Mã',
                    'filter': true,
                    'sort': true,
                    'placeholder': "Tìm kiếm",

                },
                name: {
                    'header': 'Tên',
                    'sort': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",

                },
                partnerCode: {
                    'header': 'Mã đối tác',
                    'sort': true,
                    'mapping': {
                        0: 'Tất cả',
                        1: 'Sàn demo 1',
                        2: 'Sàn demo 2',
                        3: 'Sàn demo 3',
                        4: 'Sàn demo 4',
                        5: 'Sàn demo 5',
                        6: 'Sàn demo 6',
                    },
                    'filter': true,
                    'typefilter': 'select'
                },
                sellingStatus: {
                    'header': 'Trạng thái mua bán',
                    'sort': true,
                    'mapping': {
                        0: 'Tất cả',
                        PRODUCT_STATE_0: 'Chưa mở bán',
                        PRODUCT_STATE_1: 'Đang mở bán',
                        PRODUCT_STATE_2: 'Đặt cọc',
                        PRODUCT_STATE_3: 'HĐ mua bán',
                        PRODUCT_STATE_4: 'Chuyển nhượng',
                        PRODUCT_STATE_5: 'Hủy đơn hàng',
                        PRODUCT_STATE_6: 'Báo cọc',
                        PRODUCT_STATE_7: 'Dừng mở bán',
                    },
                    'filter': true,
                    'typefilter': 'select'

                },
                lockingStatus: {
                    'header': 'Trạng thái căn hộ',
                    'sort': true,
                    'mapping': {
                        0: 'Tất cả',
                        LOCKING_STATE_0: 'Đang mở',
                        LOCKING_STATE_1: 'Đã khóa',

                    },
                    'filter': true,
                    'typefilter': 'select'

                },
                apartmentNumber: {
                    'header': 'Số phòng/nhà',
                    'sort': true,
                    'filter': true,
                    'placeholder': "Tìm kiếm",
                },
                floor: {
                    'header': 'Tầng',
                    'sort': true
                },
                numberRoom: {
                    'header': 'Số phòng ngủ',
                    'sort': true
                },



            },
            // rowStyle: (rowid, data) => {
            //     if (data[rowid].id > 100) {
            //         return { backgroundColor: '#f8f9fa' }
            //     }
            // }
            // ,
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


                    return axios.post(`https://apigateway.ecolandvn.com/sale/v1/demo/api/product/filter/BMT/${page}/25`, {
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
                code: {
                    type: "text",

                },
                name: {
                    type: "text",
                },
                partnerCode: {
                    type: "text",
                },
                sellingStatus: {
                    type: "text",
                    mapping: 'true'
                },
                lockingStatus: {
                    type: "text",
                    mapping: 'true'
                },
                apartmentNumber: {
                    type: "text",
                },
                floor: {
                    type: "text",
                },
                numberRoom: {
                    type: "text",
                },


            },
            add: {
                code: {
                    type: "text",

                },
                name: {
                    type: "text",
                },
                partnerCode: {
                    type: "text",
                },
                sellingStatus: {
                    type: "text",
                    mapping: 'true'
                },
                lockingStatus: {
                    type: "text",
                    mapping: 'true'
                },
                apartmentNumber: {
                    type: "text",
                },
                floor: {
                    type: "text",
                },
                numberRoom: {
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

export default ApartmentView;