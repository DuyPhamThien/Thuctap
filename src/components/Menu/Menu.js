import React, { Component } from 'react';
import './Menu.scss';
import Menu_items from './Menu_items/Menu_items';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuleft: true,
        }
        this.MenuStruct = this.props.struct;
    }
    // autoOpen() {
    //     var pathname = window.location.pathname;
    
    //     this.openPath = []
    
    //     var checkExist = (items, pathname) => {
    //       for (let i in items) {
    //         var item = items[i]
    //         if (item.link && item.link == pathname) {
    //           this.openPath.push(i)
    //           item.open = true
    //           return true
    //         }
    
    //         if (item.sub_items) {
    //           if (checkExist(item.sub_items, pathname)) {
    //             this.openPath.push(i)
    //             item.open = true
    //             return true;
    //           }
    //         }
    //       }
    //       return false
    //     }

    render() {
        return (
            <div className={this.state.menuleft ? "layout-menu-container " : "layout-menu-container layout-menu-out"}>
                <div className="layout-menu-content">
                    <div className="layout-menu-title">MENU</div>
                    <ul className="layout-menu layout-main-menu clearfix">
                        {Object.keys(this.MenuStruct.items).map((item) => {
                            return (
                                <Menu_items item={this.MenuStruct.items[item]} key={item} />
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menu;