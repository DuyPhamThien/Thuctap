import React, { Component } from 'react';
import './Menu.scss';
import MenuIitems from './Menu_items/Menu_items';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuleft: true,
        }
        this.MenuStruct = this.props.struct;
    }

    render() {
        return (
            <div className={this.state.menuleft ? "layout-menu-container " : "layout-menu-container layout-menu-out"}>
                <div className="layout-menu-content">
                    <div className="layout-menu-title">MENU</div>
                    <ul className="layout-menu layout-main-menu clearfix">
                        {Object.keys(this.MenuStruct.items).map((item) => {
                            return (
                                <MenuIitems item={this.MenuStruct.items[item]} key={item} />
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;