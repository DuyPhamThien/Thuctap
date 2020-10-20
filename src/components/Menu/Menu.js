import React, { Component } from 'react';
import './Menu.scss';
import Menu_items from './Menu_items/Menu_items';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exit: false,
            menuleft : true,
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
                                return(
                                    <Menu_items  item={this.MenuStruct.items[item]}  keys={this.props.exit}/>    
                                )
                          

                        })}
                       
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;