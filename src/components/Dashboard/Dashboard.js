import React, { Component } from 'react';
import { Chart } from 'primereact/chart'
import Spinner from '../Spinner/Spinner';
import './Dashboard.scss'
import DialogSuccess from '../TableMe/DialogSuccess';
const axios = require('axios');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null,
            dialog: false,
            errorMessage: '',
            dataPie: {
                labels: [],
                datasets: []
            },
            optionsLine: (param, key) => {
                let title = ['SẢN LƯỢNG BÁN HÀNG', 'DOANH SỐ BÁN HÀNG'];
                return {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: title[param]
                    },

                }
            },

            optionsPie: (param) => {
                let title = ['SẢN LƯỢNG', 'DOANH THU', 'HOA HỒNG'];
                return {
                    responsive: true,

                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: title[param]
                    },
                }

            },
            optionsBar: (param) => {
                let title = ['SẢN LƯỢNG BÁN HÀNG', 'DOANH SỐ BÁN HÀNG'];
                return {
                    responsive: true,

                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: title[param]
                    },
                    maintainAspectRatio: false,
                }

            }
        }

    }
    isset(obj) {
        if (typeof (obj) == 'undefined' || obj == null) {
            return false;
        }
        return true;
    }
    formatNumber(num) {
        if (!num) return 0;
        num = this.clearNumber(num);
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    clearNumber(string) {
        if (!string) return 0;
        return string.toString().replace(/[^\d\-\.]/g, '');
    }
    componentDidMount() {
        axios.defaults.headers.common['authorization'] = `Bearer ${global.keycloak.token}`;
        axios.request({
            url: ' https://apigateway.ecolandvn.com/sale/v1/demo/api/dashboard/report/BMT',
            method: 'get',
        })
            .then(response => {

                if (!this.isset(response)) return;
                this.setState({
                    data: response.data,
                    loading: false
                });
            })
            .catch((error) => {

                console.log(error);
                this.setState({
                    errorMessage: error,
                    dialog: true
                });
            })
    }
    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    render() {
        return (
            <div className="layout-content">
                <DialogSuccess header="Error" error={true} errorMessage={this.state.errorMessage} visible={this.state.dialog} onHide={() => this.onHide('dialog')} />
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

                    <div className='row' >
                        {/* ----------start - o1------------- */}
                        <div className=" col-xl-3  config" style={{ display: 'flex' }}  >
                            <div className=" p-nogutter widget-overview-box overview-box-1">
                                <div className="col-3  overview-box-icon" >
                                    <img src='https://report.ecolandvn.com/assets/layout/images/dashboard/count.svg' alt="mirage-layout" />
                                </div>
                                <div className="col-9  overview-box-text">
                                    <h5 className="ng-star-inserted">  {global.isset(this.state.data) ? `Số căn đã bán  ${Number(this.state.data.row11.PRODUCT_STATE_2) + Number(this.state.data.row11.PRODUCT_STATE_3) + Number(this.state.data.row11.PRODUCT_STATE_4)}/ ${this.state.data.row11.Total}` : ''}</h5>
                                    <span className="ng-star-inserted">{global.isset(this.state.data) ? `Đang mở bán ${this.state.data.row11.PRODUCT_STATE_1}` : ''}</span>
                                </div>
                            </div>
                        </div>


                        {/* //----------end - o1------------- */}

                        {/* //----------start - o2------------- */}
                        <div className="col-xl-3  config" style={{ display: 'flex' }}>
                            <div className=" p-nogutter widget-overview-box overview-box-2">
                                <div className="col-3 overview-box-icon">
                                    <img src='https://report.ecolandvn.com/assets/layout/images/dashboard/revenue.svg' alt="mirage-layout" />
                                </div>
                                <div className="col-9 overview-box-text ng-star-inserted">
                                    <h5 style={{ color: 'darkslategray' }}>Giá trị HĐ / Giá bán </h5>
                                    <span style={{ color: 'green', fontWeight: 'bolder' }}>{global.isset(this.state.data) ? ` ${this.formatNumber(this.state.data.row12.CONTRACT_PRICE)}/ ${this.formatNumber(this.state.data.row12.LIST_PRICE)}` : ''}</span>
                                    <h5 style={{ color: 'darkslategray' }}>CKTT/CKTM </h5>
                                    <span style={{ color: 'green', fontWeight: 'bolder' }}>{global.isset(this.state.data) ? ` ${this.formatNumber(this.state.data.row12.PAYMENT_DISCOUNT_AMOUNT)}/ ${this.formatNumber(this.state.data.row12.DISCOUNT_AMOUNT)}` : ''}</span>
                                </div>
                            </div>
                        </div>

                        {/* //----------end - o2------------- */}

                        {/* //----------start - o3------------- */}
                        <div className="col-xl-3  config" style={{ display: 'flex' }}>
                            <div className=" p-nogutter widget-overview-box overview-box-3">
                                <div className="col-3 overview-box-icon">
                                    <img src='https://report.ecolandvn.com/assets/layout/images/dashboard/income.svg' alt="mirage-layout" />
                                </div>
                                <div className="col-9 overview-box-text ng-star-inserted">
                                    <h5>Tiền đã TT</h5>
                                    <span>{global.isset(this.state.data) ? ` ${global.formatNumber(this.state.data.row13.INCOME_AMOUNT)}` : ''}</span>
                                    <h5>Tiền TT chậm</h5>
                                    <span>{this.isset(this.state.data) ? ` ${global.formatNumber(this.state.data.row13.DELAY_AMOUNT)}` : ''}</span>
                                </div>
                            </div>
                        </div>
                        {/* //----------end - o3------------- */}

                        {/* //----------start - o4------------- */}
                        <div className="col-xl-3  config" style={{ display: 'flex' }}>
                            <div className=" p-nogutter widget-overview-box overview-box-4 ng-star-inserted">
                                <div className="col-3 overview-box-icon">
                                    <img src='https://report.ecolandvn.com/assets/layout/images/dashboard/commision.svg' alt="mirage-layout" />
                                </div>
                                <div className="col-9 overview-box-text">
                                    <h5>Hoa hồng đại lý</h5>
                                    <span>{this.isset(this.state.data) ? ` ${this.formatNumber(this.state.data.row14.PARTNER_AMOUNT)}` : ''}</span>
                                    <h5>Hoa hồng sale</h5>
                                    <span>{this.isset(this.state.data) ? ` ${this.formatNumber(this.state.data.row14.SALE_AMOUNT)}` : ''}</span>
                                </div>
                            </div>
                        </div>
                        {/* //----------end - o4------------- */}

                    </div>

                    <div className='row'>


                        {

                            this.isset(this.state.data) == true ? (Object.keys(this.state.data.row41).map((key) => (
                                <div key={key} className=" col-md-6 " style={{ padding: '7px' }}>
                                    <div className="card" style={{ padding: '10px' }}>
                                        <h5>{key}</h5>
                                        <Chart type="line" height='300px' width="100%" data={this.state.data.row41[key]} options={this.state.optionsLine(0, key)} />
                                    </div>
                                </div>
                            )
                            )) : ''

                        }

                        {

                            this.isset(this.state.data) == true ? (Object.keys(this.state.data.row41).map((key) => (
                                <div key={key} className="col-md-6  " style={{ padding: '7px' }}>
                                    <div className="card" style={{ padding: '10px' }}>
                                        <h5>{key}</h5>
                                        <Chart type="line" height='300px' width="100%" data={this.state.data.row42[key]} options={this.state.optionsLine(1, key)} />
                                    </div>
                                </div>
                            )
                            )) : ''

                        }


                    </div>


                    <div className='row'>

                        <div className="p-col-12 col-xl-4 p-md-6 ng-star-inserted configPie">
                            <div className="card" style={{ padding: '10px' }}>
                                <Chart type="pie" data={this.isset(this.state.data) ? this.state.data.row21 : this.state.dataPie} options={this.state.optionsPie(0)} />
                            </div>
                        </div>




                        <div className="p-col-12 col-xl-4 p-md-6 ng-star-inserted configPie">
                            <div className="card" style={{ padding: '10px' }}>
                                <Chart type="pie" data={this.isset(this.state.data) ? this.state.data.row22 : this.state.dataPie} options={this.state.optionsPie(1)} />
                            </div>
                        </div>




                        <div className="p-col-12 col-xl-4 p-md-6 ng-star-inserted configPie">
                            <div className="card" style={{ padding: '10px' }}>
                                <Chart type="pie" data={this.isset(this.state.data) ? this.state.data.row23 : this.state.dataPie} options={this.state.optionsPie(2)} />
                            </div>
                        </div>

                    </div>

                    <div className='row'>

                        <div className="p-col-12 col-xl-6 p-md-6 ng-star-inserted" style={{ padding: '7px' }}>
                            <div className="card" style={{ padding: '15px' }}>
                                <Chart type="bar" height='400px' width="100%" data={this.isset(this.state.data) ? this.state.data.row31 : this.state.dataPie} options={this.state.optionsBar(0)} />
                            </div>
                        </div>



                        <div className="p-col-12 col-xl-6 p-md-6 ng-star-inserted" style={{ padding: '7px' }}>
                            <div className="card" style={{ padding: '15px' }}>
                                <Chart type="bar" height='400px' width="100%" data={this.isset(this.state.data) ? this.state.data.row32 : this.state.dataPie} options={this.state.optionsBar(1)} />
                            </div>
                        </div>


                    </div>





                </div>
            </div>
        );
    }
}

export default Dashboard;