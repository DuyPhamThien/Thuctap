import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {   
    render() {
        return (
            <div className="Header">
                <button id="menu-button"  onClick ={() => this.props.isMenu()}><i className="fas fa-bars"></i></button>
            </div>
        );
    }
}

export default Header;