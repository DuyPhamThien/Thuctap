import React, { Component } from 'react';

class Menu_items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exit: this.props.keys,
        }

    }


    render() {
        var item = this.props.item ? this.props.item : {};

        return (
            <li>
                <a href="#/">
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    {item.func && item.func(item.label)}
                </a>
                {item.sub_items && (
                    <ul className={this.state.exit[item.label] == 1 ? "layout-submenu-enter-done" : "layout-submenu-exit-done"}>
                        {Object.values(item.sub_items).map(item => (
                            <li>
                                <a href="#/">
                                    <i className={item.icon}></i>
                                    <span>{item.label}</span>

                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        );
    }
}

export default Menu_items;