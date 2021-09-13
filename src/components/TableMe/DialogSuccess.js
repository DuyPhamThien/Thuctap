import React, { Component } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
class DialogSuccess extends Component {
    constructor(props) {
        super(props);
        this.check = true;
    }


    view(title) {
        var word = 'thanh cong';
        if (title == undefined) return;
        if (title.includes(word)) {
            this.check = true;
        } else {
            this.check = false;
        }
        return (
            <div style={{ textAlign: 'center' }} >
                <Button style={{ width: '80px', height: '80px' }} icon="pi pi-times icon-add" className={this.check ? "me p-mt-3 p-button-rounded p-button-sm p-button-outlined  wi p-button-success" : "me p-mt-3 p-button-rounded p-button-sm p-button-outlined  wi p-button-danger"} />
                <div className={this.check ? "text" : "text-red"}  >{title}</div>

            </div>
        )
    }

    render() {
        return (
            <Dialog header={this.props.header} footer={this.props.footer} visible={this.props.visible} style={{ width: '400px' }} onHide={() => this.props.onHide('displayADD')}>
                {this.view(this.props.titile)}
                {this.props.error &&
                    <div style={{ textAlign: 'center', color: 'red' }}>
                        <Button style={{ width: '80px', height: '80px' }} icon="pi pi-times icon-add" className="me p-mt-3 p-button-rounded p-button-sm p-button-outlined  wi p-button-danger" />
                        <div style={{ marginTop: '20px' }} >{this.props.errorMessage}</div>

                    </div>}
            </Dialog>
        );
    }
}

export default DialogSuccess;