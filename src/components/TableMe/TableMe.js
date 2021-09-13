import React, { Component } from 'react';
import "./TableMe.scss";
import "../TableMe/Resposive/desktop.scss";
import "../TableMe/Resposive/table.scss";
import "../TableMe/Resposive/moblie.scss";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import DialogSuccess from './DialogSuccess';
import moment from 'moment'
import { Calendar } from 'primereact/calendar';
import Spinner from '../Spinner/Spinner';
class TableMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            openDiaEdit: false,
            openDiaADD: false,
            openDiaDel: false,
            openDiaADDSuccess: false,
            openDiaADDFail: false,
            openDiaDelSuccess: false,
            openDiaDelFail: false,
            openDiaEditSuccess: false,
            openDiaEditFail: false,


            first: 0,
            rows: 10,
            totalRow: 0,
            page: 1,
            filter: {},
            sortField: "ids",
            sortOrder: 1,
        }
        this.tableStruct = this.props.struct;

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
    onClick(name, position) {
        let state = {
            [`${name}`]: true
        };

        if (position) {
            state = {
                ...state,
                position
            }
        }

        this.setState(state);
    }
    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
        this.setState({
            beginDate: '',
            endDate: '',
            name: '',
            projectCode: '',
            status: '',
        });
    }
    YesNo(name) {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => this.onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={(e) => this.handleDelete(e)} autoFocus />
            </div>
        );
    }
    createData(rowid, colid, data) {
        if (this.tableStruct.columns[colid]['func']) {
            return this.tableStruct.columns[colid]['func'](rowid, colid, data);
        } else if (this.tableStruct.columns[colid]['mapping']) {
            return this.tableStruct.columns[colid]['mapping'][data[rowid][colid]]
        }
        else if (this.tableStruct.columns[colid]['date']) {
            if (data[rowid][colid]) {
                return moment(data[rowid][colid]).format('DD/MM/YYYY')
            }

        } else if (this.tableStruct.columns[colid]['number']) {
            if (data[rowid][colid]) {
                return this.formatNumber(data[rowid][colid])
            }

        }
        else {
            return data[rowid][colid];
        }
    }
    getColumnStyle(rowid, colid, data) {
        if (this.tableStruct.columns[colid]['style']) {
            return this.tableStruct.columns[colid]['style'](rowid, colid, data);
        } else {
            return {};
        }
    }
    getRowStyle(rowid, data) {
        // if (data[rowid].id > 100) {
        //     return { backgroundColor: '#f8f9fa' }
        // }
    }
    createDiaEdit() {
        if (this.tableStruct.edit) {
            return (
                <Dialog header="Sửa" visible={this.state.openDiaEdit} onHide={() => this.onHide('openDiaEdit')}>
                    <form onSubmit={(event) => this.handleEdit(event)}>
                        {
                            Object.keys(this.tableStruct.edit).map((colid, index) => {


                                if (index == 0) {
                                    return (
                                        <div className="Form" style={{ display: 'none' }}>
                                            <div style={{ width: '50%' }}> <label>{colid}</label></div>
                                            <input type={this.tableStruct.edit[colid]['type']} value={this.state[colid]} onChange={(e) => this.setState({ [colid]: e.target.value })} />
                                        </div>
                                    )
                                } else if (this.tableStruct.edit[colid]['mapping']) {
                                    return (

                                        <div className="Form" >
                                            <div style={{ width: '50%' }}> <label>{this.tableStruct.columns[colid]['header']}</label></div>
                                            <select style={{ width: '45%' }} onChange={e => {
                                                this.setState({ [colid]: e.target.value })
                                            }}>
                                                {Object.keys(this.tableStruct.columns[colid].mapping).map(keys => {
                                                    if (keys == 0) { return }
                                                    if (keys == this.state[colid]) {
                                                        return (<option selected value={keys} >{this.tableStruct.columns[colid].mapping[keys]}</option>)
                                                    } else {
                                                        return (<option value={keys} >{this.tableStruct.columns[colid].mapping[keys]}</option>)
                                                    }
                                                }

                                                )}
                                            </select>
                                        </div>

                                    )
                                } else if (this.tableStruct.edit[colid]['type'] == 'date') {
                                    return (
                                        <div className="Form">
                                            <div style={{ width: '50%' }}> <label>{this.tableStruct.columns[colid]['header']}</label></div>
                                            <Calendar value={new Date(this.state[colid])} dateFormat="dd/mm/yy" id="icon" showIcon onChange={(e) => this.setState({ [colid]: e.target.value })} />
                                        </div>
                                    )

                                }

                                else {

                                    return (
                                        <div className="Form">
                                            <div style={{ width: '50%' }}> <label>{this.tableStruct.columns[colid]['header']}</label></div>
                                            <input style={{ width: '45%' }} type={this.tableStruct.edit[colid]['type']} value={this.state[colid]} onChange={(e) => this.setState({ [colid]: e.target.value })} />
                                        </div>
                                    )
                                }

                            })
                        }
                        <div className="FormButton">
                            <Button label="Submit" type="submit" className="p-button-sm " />
                        </div>
                    </form>
                </Dialog>
            )
        }
    }
    createDiaADD() {
        if (this.tableStruct.add) {
            return (
                <Dialog header="Thêm" visible={this.state.openDiaADD} onHide={() => this.onHide('openDiaADD')}>
                    <form onSubmit={(e) => this.handleADD(e)}>
                        {
                            Object.keys(this.tableStruct.add).map(colid => {
                                if (this.tableStruct.add[colid]['mapping']) {
                                    return (

                                        <div className="Form" >
                                            <div style={{ width: '50%' }}> <label>{this.tableStruct.columns[colid]['header']}</label></div>
                                            <select style={{ width: '45%' }} onChange={e => {
                                                this.setState({ [colid]: e.target.value })
                                            }}>
                                                {Object.keys(this.tableStruct.columns[colid].mapping).map(keys => {
                                                    if (keys == 0) { return }

                                                    return (<option value={keys} >{this.tableStruct.columns[colid].mapping[keys]}</option>)

                                                }

                                                )}
                                            </select>
                                        </div>

                                    )
                                } else if (this.tableStruct.edit[colid]['type'] == 'date') {
                                    return (
                                        <div className="Form">
                                            <div style={{ width: '50%' }}> <label>{this.tableStruct.columns[colid]['header']}</label></div>
                                            <Calendar dateFormat="dd/mm/yy" id="icon" showIcon onChange={(e) => this.setState({ [colid]: moment(e.target.value).format() })} />
                                        </div>
                                    )

                                }
                                else {
                                    return (
                                        <div className="Form">
                                            <div style={{ width: '50%' }}> <label>{this.tableStruct.columns[colid]['header']}</label></div>
                                            <input style={{ width: '45%' }} type={this.tableStruct.add[colid]['type']} onChange={(e) => this.setState({ [colid]: e.target.value })} />
                                        </div>
                                    )
                                }

                            })
                        }
                        <div className="FormButton">
                            <Button label="Submit" type="submit" className="p-button-sm " />
                        </div>
                    </form>
                </Dialog>
            )
        }
    }
    handleADD(e) {
        e.preventDefault();
        this.onHide('openDiaADD');
        if (this.tableStruct.events && this.tableStruct.events.add) {
            this.tableStruct.events.add(this.state, this.tableStruct.add).then(res => this.tableStruct.events.filter([], this.state.page).then(res => {
                var data = res.data.result.map((item, index) => {
                    item.ids = index;
                    return item;
                })
                this.setState({ data: data, totalRow: res.data.size });
                this.onClick('openDiaADDSuccess');
            })).catch(Error => this.onClick('openDiaADDFail'))
        } else {
            this.onDefaultAdd();
        }

    }
    handleEdit(e) {
        e.preventDefault();
        this.onHide('openDiaEdit');
        if (this.tableStruct.events && this.tableStruct.events.put) {
            this.tableStruct.events.put(this.state, this.tableStruct.edit).then(res => this.tableStruct.events.filter([], this.state.page).then(res => {
                var data = res.data.result.map((item, index) => {
                    item.ids = index;
                    return item;
                })
                this.setState({ data: data });
                this.onClick('openDiaEditSuccess');
            })
            ).catch(Error => this.onClick('openDiaEditFail'))
        } else {
            this.onDefaultEdit();
        }

    }
    handleDelete(e) {
        e.preventDefault();
        this.onHide('openDiaDel');
        if (this.tableStruct.events && this.tableStruct.events.delete) {
            this.tableStruct.events.delete(this.state.id).then(res => this.tableStruct.events.filter([], this.state.page).then(res => {
                var data = res.data.result.map((item, index) => {
                    item.ids = index;
                    return item;
                })
                this.setState({ data: data });
                this.onClick('openDiaDelSuccess');
            })).catch(Error => this.onClick('openDiaDelFail'))
        } else {
            this.onDefaultDel();
        }

    }

    onPageChange(event) {
        const { first, rows } = event;
        this.setState({
            first: first,
            rows: rows
        });
        const page = (first / 10) + 1;
        this.tableStruct.events.filter([], page).then(res => {
            var data = res.data.result.map((item, index) => {
                item.ids = index;
                return item;
            })
            this.setState({ data: data, totalRow: res.data.size, page: page });
        })

    }
    createPaginator() {
        return <Paginator first={this.state.first} rows={this.state.rows} totalRecords={this.state.totalRow} onPageChange={(e) => this.onPageChange(e)}></Paginator>
    }
    componentDidMount() {
        this.filter();
    }

    filter(data) {
        if (this.tableStruct.events && this.tableStruct.events.filter) {
            this.tableStruct.events.filter(data, this.state.page).then(res => {

                var data = res.data.result.map((item, index) => {
                    item.ids = index;
                    return item;
                })
                // this.setState({ data: res.data.result, totalRow: res.data.size });
                this.setState({ data: data, totalRow: res.data.size, loading: false });
            })
        }
    }

    onFilter(colid, value) {
        this.state.filter[colid] = { value };
        Object.keys(this.state.filter).map(item => {
            if (this.state.filter[item].value == "") {
                delete this.state.filter[item];
            }
        })
        if (this.tableStruct.events && this.tableStruct.events.add) {
            this.tableStruct.events.filter(this.state.filter, this.state.page).then(res => {
                this.setState({ data: res.data.result, totalRow: res.data.size });
            })
        } else {
            var data = this.state.data;
            if (Object.keys(this.state.filter).length > 0) {
                Object.keys(this.state.filter).map(keys => {
                    data = data.filter(data => {
                        return data[keys] == this.state.filter[keys].value;
                    })
                })

                this.setState({ data: data });
            }
            else {
                this.tableStruct.events.filter(this.state.filter, this.state.page).then(res => {
                    var data = res.data.result.map((item, index) => {
                        item.ids = index;
                        return item;
                    })
                    this.setState({ data: data, totalRow: res.data.size });
                })
            }

        }

    }

    onSort(colid) {
        return new Promise((res, rej) => {
            if (this.state.sortField == colid) {
                res(this.setState({ sortOrder: -(this.state.sortOrder) }))
            }
            else {
                res(this.setState({ sortField: colid, sortOrder: 1 }))
            }
        })
    }
    onDefaultSort(colid) {
        var data = this.state.data;
        data.sort((a, b) => {
            var sortResult = a[colid] > b[colid] ? 1 : -1;
            return sortResult * this.state.sortOrder
        }
        )

        this.setState({ data: data });
    }
    geticon(colid) {
        if (this.state.sortField != colid) {
            return "pi pi-fw pi-sort-alt";
        }
        else if (this.state.sortField == colid && this.state.sortOrder == 1) {
            return "pi pi-fw pi-sort-amount-up-alt";
        }
        else if (this.state.sortField == colid && this.state.sortOrder == -1) {
            return "pi pi-fw pi-sort-amount-down"
        }
    }
    onDefaultAdd() {
        var add = {};
        Object.keys(this.tableStruct.add).map(item => {
            if (item == "status") {
                add[item] = (this.state[item] == "true" ? true : false)
            }
            else {
                add[item] = this.state[item]
            }

        })
        add['ids'] = this.state.data.length;
        var data = this.state.data;
        data.push(add);
        this.setState({ data: data });
        this.onHide('openDiaADD');
    }
    onDefaultEdit() {
        var save = {
            "ids": this.state.id,
            "beginDate": this.state.beginDate,
            "endDate": this.state.endDate,
            "name": this.state.name,
            "projectCode": this.state.projectCode,
            "status": this.state.status
        }
        var data = this.state.data;
        var index = data.findIndex((item) => {
            return item.ids == this.state.id;
        })
        data[index] = save;
        this.setState({ data: data });
    }
    onDefaultDel() {
        var data = this.state.data;
        var index = data.findIndex((item) => {
            return item.ids == this.state.id;
        })
        data.splice(index, 1);
        this.setState({ data: data });


    }
    render() {
        return (
            <div>

                {this.tableStruct.ADD == 'none' ? <div style={{ height: '15px' }}></div> : <Button label="Thêm" icon="pi pi-plus" className="p-button btn p-component p-button-sm p-mr-3 btnAdd p-button-raised p-button-text" onClick={e => this.setState({ openDiaADD: true })} />}
                <div style={this.state.loading == true ? { display: 'block' } : { display: 'none ' }} className="me-center" >
                    <Spinner />
                </div>
                <table className="main_table table table-bordered table-resizable"  >

                    <thead className="" >
                        <tr>
                            {Object.keys(this.tableStruct.columns).map(colid => {
                                if (this.tableStruct.columns[colid].sort) {
                                    return <th className={this.state.sortField == colid ? "hightlight" : ""}>
                                        <span  >{this.tableStruct.columns[colid].header}</span>
                                        <span className={this.geticon(colid)} onClick={e => this.onSort(colid).then(
                                            res => {
                                                if (this.tableStruct.events && this.tableStruct.events.add) {
                                                    this.tableStruct.events.filter(this.state.filter, this.state.page, { sortField: this.state.sortField, sortOrder: this.state.sortOrder }).then(res => {
                                                        this.setState({ data: res.data.result, totalRow: res.data.size });
                                                    })
                                                }
                                                else {
                                                    this.onDefaultSort(colid);
                                                }

                                            }
                                        )} ></span>
                                    </th>
                                }
                                else {
                                    return <th>{this.tableStruct.columns[colid].header}</th>
                                }
                            }

                            )}
                        </tr>
                        <tr>
                            {Object.keys(this.tableStruct.columns).map(colid => {
                                if (this.tableStruct.columns[colid].filter) {

                                    if (this.tableStruct.columns[colid].typefilter == 'select') {
                                        return (
                                            <th>
                                                <select onChange={e => {
                                                    if (e.target.value == 0) {

                                                        this.filter();
                                                    } else {
                                                        this.onFilter(colid, e.target.value)
                                                    }
                                                }}>
                                                    {Object.keys(this.tableStruct.columns[colid].mapping).map(keys =>
                                                        <option value={keys} >{this.tableStruct.columns[colid].mapping[keys]}</option>
                                                    )}
                                                </select>
                                            </th>
                                        )
                                    } else if (this.tableStruct.columns[colid].typefilter == 'date') {
                                        return (
                                            <th>
                                                <Calendar dateFormat="dd/mm/yy" id="icon" placeholder="Từ ngày" />
                                                <Calendar dateFormat="dd/mm/yy" id="icon" placeholder="Đến ngày" />
                                            </th>
                                        )
                                    }
                                    else {
                                        return <th><input type='text' onBlur={e =>
                                            this.onFilter(colid, e.target.value)}
                                            placeholder={this.tableStruct.columns[colid].placeholder}
                                        ></input></th>
                                    }


                                }
                                else {
                                    return <th></th>
                                }
                            }

                            )}
                        </tr>
                    </thead>
                    <tbody className="">
                        {this.state.data && this.state.data.map((item, rowid) => (
                            <tr className="me-datatable-row" style={this.getRowStyle(rowid, this.state.data)} >
                                {Object.keys(this.tableStruct.columns).map(colid => {
                                    return <td style={this.getColumnStyle(rowid, colid, this.data)}> {this.createData(rowid, colid, this.state.data)} </td>
                                })}
                            </tr>
                        ))}

                    </tbody>
                </table>
                {this.createDiaEdit()}
                {this.createDiaADD()}
                {this.createPaginator()}
                <DialogSuccess header="Confirm" footer={this.YesNo('openDiaDel')} titile="Bạn có chắc chắn muốn xóa" visible={this.state.openDiaDel} onHide={() => this.onHide('openDiaDel')} />
                <DialogSuccess titile="Them thanh cong" visible={this.state.openDiaADDSuccess} onHide={() => this.onHide('openDiaADDSuccess')} />
                <DialogSuccess titile="Them that bai" visible={this.state.openDiaADDFail} onHide={() => this.onHide('openDiaADDFail')} />
                <DialogSuccess titile="Xoa thanh cong" visible={this.state.openDiaDelSuccess} onHide={() => this.onHide('openDiaDelSuccess')} />
                <DialogSuccess titile="Xoa that bai" visible={this.state.openDiaDelFail} onHide={() => this.onHide('openDiaDelFail')} />
                <DialogSuccess titile="Sua thanh cong" visible={this.state.openDiaEditSuccess} onHide={() => this.onHide('openDiaEditSuccess')} />
                <DialogSuccess titile="Sua that bai" visible={this.state.openDiaEditFail} onHide={() => this.onHide('openDiaEditFail')} />
            </div>
        );
    }
}

export default TableMe;