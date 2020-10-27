import React, { Component } from 'react';
import './Header.scss';
import avatar from '../../imgs/download.jpg';
import {
    NavLink
} from "react-router-dom";
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
                    <span className="topbar-search">
                        <input placeholder="Search" />
                        <span className="fas fa-search"></span>
                    </span>
                    <button className="profile" onClick={() => this.setState({ isOpen: !(this.state.isOpen) })}>
                        <span >User Name</span>
                        <img src={avatar} alt="ahihi"></img>
                        <span className=" fas fa-angle-down"></span>
                    </button>
                    <div className={this.state.isOpen ? "dropdown-menu dropdown-menu-on" : "dropdown-menu"} >
                        <div className="dropdown-item">
                            <NavLink to="/" href="#"><i className="fas fa-user"></i>Action</NavLink>
                        </div>
                        <div className="dropdown-item">

                            <NavLink to="/HorizontalMenu" href="#"><i className="fas fa-power-off"></i>Logout</NavLink>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Header;