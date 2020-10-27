import React, { Component } from 'react';
import './Menu_items.scss';
import {
   NavLink 
} from "react-router-dom";
class Menu_items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exit: this.props.item.open ? true : false,
        }

    }
    render() {
        var item = this.props.item ? this.props.item : {};
      
        return (
            <li className={this.state.exit ? "active-item" : ""}>
                {item.link
                    ?
                    <NavLink to={item.link} exact activeStyle={{
                        fontWeight: "bold",
                        color: "red",
                      }}>
                        <i className={item.icon}></i>
                        <span>{item.label}</span>

                        {item.sub_items && Object.keys(item.sub_items).length > 0 && <i className="icon-right fas fa-angle-down" onClick={() => {
                            this.setState({ exit: !this.state.exit });
                        }} ></i>
                        }
                    </NavLink>
                    :
                    <a href={item.href && item.href}>
                        <i className={item.icon}></i>
                        <span>{item.label}</span>

                        {item.sub_items && Object.keys(item.sub_items).length > 0 && <i className="icon-right fas fa-angle-down" onClick={() => {
                            this.setState({ exit: !this.state.exit });
                        }} ></i>
                        }
                    </a>
                }
                {item.sub_items && (
                    <ul className={`layout-submenu ${this.state.exit ? "layout-submenu-enter-done" : "layout-submenu-exit-done"}`}>
                        {Object.keys(item.sub_items).map(key => (
                            <Menu_items key={key} item={item.sub_items[key]} />
                        ))}
                    </ul>
                )}
            </li>
        );
    }
}

export default Menu_items;