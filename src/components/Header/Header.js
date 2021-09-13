import React, { Component } from 'react';
import './Header.scss';
import avatar from '../../imgs/Logo Phoenix Simulation.jpg';
import {
    NavLink
} from "react-router-dom";
import App from '../../App';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    render() {
        return (
            <div className="Header">
                <div>
                    <button id="menu-button" onClick={() => this.props.isMenu()}><i className="fas fa-bars"></i></button>
                </div>
                <div>

                    <button className="profile" onClick={() => this.setState({ isOpen: !(this.state.isOpen) })}>
                        <span >Admin</span>
                        <img src={avatar} alt="ahihi"></img>
                        <span className=" fas fa-angle-down"></span>
                    </button>
                    <div className={this.state.isOpen ? "dropdown-menu1 dropdown-menu-on" : "dropdown-menu1"} >
                        <div className="dropdown-item" onClick={() => global.keycloak.logout()}>
                            <i className="fas fa-power-off"></i>Logout
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Header;