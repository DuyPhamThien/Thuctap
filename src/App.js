import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import React, { Component } from 'react';
import Content from './components/Content/Content';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';

import ProjectDetail from './components/Project/ProjectDetail';
import ApartmentView from './components/Project/ApartmentView';

import CustomersView from './components/Customers/CustomersView';

import ContactSample from './components/Contact/ContactSample';
import SaleOrderView from './components/Contact/SaleOrderView';

import PromotionView from './components/Promotion/PromotionView';
import PromotionType from './components/Promotion/PromotionType';

import ParterView from './components/Parter/ParterView';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.StructMenu = {
      items: {
        item1: {
          icon: "fas fa-home",
          label: 'Trang chủ',
          open: false,
          link: '/',
        },
        item2: {
          icon: "fas fa-bars",
          label: 'Quản lý dự án',
          open: false,
          sub_items: {
            sub_items1: {
              label: 'Thông tin dự án',
              icon: 'fas fa-bars',
              link: "/project/detail",
            },
            sub_items2: {
              label: 'Sản phẩm',
              icon: 'fas fa-bars',
              link: "/apartment/view",
            },
          }

        },

        item3: {
          icon: "far fa-circle",
          label: 'QL khách hàng',
          sub_items: {
            sub_items1: {
              label: 'Ds khách hàng',
              icon: 'fas fa-palette',
              link: "/customers/view",
            },
          }
        },
        item4: {
          icon: "fas fa-sitemap",
          label: 'QLhợp đồng',
          sub_items: {
            sub_items3: {
              label: 'Đơn hàng',
              icon: 'fas fa-table',
              link: "/sale_order/view",
            },
          }
        },
        item5: {
          icon: "fas fa-clone",
          label: 'Danh sách quà',
          sub_items: {
            sub_items1: {
              label: 'Danh sách quà',
              icon: 'fas fa-ticket-alt',
              link: "/promotion/view",
            },
            sub_items2: {
              label: 'Loại quà tặng',
              icon: 'fas fa-eye',
              link: "/promotion_type/view",
            },
          }
        },
        item6: {
          icon: "far fa-circle",
          label: 'QL Sàn',
          sub_items: {
            sub_items1: {
              label: 'Ds sàn',
              icon: 'fas fa-palette',
              link: "/partner/view",
            },
          }
        },
      }

    }
    this.openPath = [];

    this.autoOpen();
  }


  autoOpen() {
    var pathname = window.location.pathname;
    this.openPath = [];
    var checkExist = (items, pathname) => {
      for (let i in items) {
        var item = items[i]
        if (item.link && item.link === pathname) {
          this.openPath.push(i)
          return true
        }
        if (item.sub_items) {
          if (checkExist(item.sub_items, pathname)) {
            this.openPath.push(i)
            return true;
          }
        }
      }
      return false
    }


    checkExist(this.StructMenu.items, pathname);
    var open = this.StructMenu.items;
    this.openPath = this.openPath.reverse();
    for (let i in this.openPath) {
      open[this.openPath[i]].open = true;
      open = open[this.openPath[i]].sub_items
    }

  }




  isMenu() {
    this.Menu.setState({
      menuleft: !(this.Menu.state.menuleft)
    })
  }


  render() {

    return (
      <Router>
        <div>
          <Header isMenu={() => this.isMenu()} />
          <Menu ref={c => this.Menu = c} struct={this.StructMenu} />
          <Switch>
            <Route path="/project/detail">
              <ProjectDetail />
            </Route>
            <Route path="/apartment/view">
              <ApartmentView />
            </Route>
            <Route path="/customers/view">
              <CustomersView />
            </Route>
            <Route path="/contract/template">
              <ContactSample />
            </Route>
            <Route path="/sale_order/view">
              <SaleOrderView />
            </Route>
            <Route path="/promotion/view">
              <PromotionView />
            </Route>
            <Route path="/promotion_type/view">
              <PromotionType />
            </Route>
            <Route path="/partner/view">
              <ParterView />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
