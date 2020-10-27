import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import React, { Component } from 'react';
import Content from './components/Content/Content';

import {
  BrowserRouter as Router,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.StructMenu = {
      items: {
        item1: {
          icon: "fas fa-home",
          label: 'Dashboard',
          // href: "https://www.primefaces.org/apollo-react/#/",
          open: false,
          link: '/',
        },
        // var checkExist = (items, pathname) => {
        //   for (let i in items) {
        //     var item = items[i]
        //     if (item.link && item.link == pathname) {
        //       this.openPath.push(i)
        //       return true
        //     }
        //     if (item.sub_items) {
        //       if (checkExist(item.sub_items, pathname)) {
        //         this.openPath.push(i)
        //         return true;
        //       }
        //     }
        //   }
        //   return false
        // }
        item2: {
          icon: "fas fa-bars",
          label: 'Menu',
          open: false,
          sub_items: {
            sub_items1: {
              label: 'Horizontal Menu',
              icon: 'fas fa-bars',
              link: "/HorizontalMenu",
            },
            sub_items2: {
              label: 'Overlay Menu',
              icon: 'fas fa-bars',
              open: false,
              sub_items: {
                sub_items12: {
                  label: 'sub_menu1.1',
                  icon: 'fas fa-bars',
                  link: "/sub_menu1.1",
                },
                sub_items23: {
                  label: 'sub_menu1.2',
                  icon: 'fas fa-bars',
                  link: "/sub_menu1.2",
                },
                sub_items34: {
                  label: 'sub_menu1.3',
                  icon: 'fas fa-bars',
                  link: "/sub_menu1.3",
                },
              }
            },
            sub_items3: {
              label: 'Static Menu',
              icon: 'fas fa-bars',
              link: '/StaticMenu'
            },
            sub_items4: {
              label: 'Slim Menu',
              icon: 'fas fa-bars',
              link: "/sub_menu10.1",
            },
          }

        },

        item3: {
          icon: "far fa-circle",
          label: 'Dark',
          sub_items: {
            sub_items1: {
              label: 'Blue',
              icon: 'fas fa-palette',
              link: "/sub_menu3.1",
              sub_items: {
                sub_items1: {
                  label: '123',
                  icon: 'fas fa-bars',
                  link: '/StaticMe3345nu'
                },
                sub_items2: {
                  label: '4657686',
                  icon: 'fas fa-bars',
                  link: "/sub_men65u10.1",
                },
              }
            },
            sub_items2: {
              label: 'Green',
              icon: 'fas fa-palette',
              link: "/sub_menu3.2",
            },
            sub_items3: {
              label: 'Red',
              icon: 'fas fa-palette',
              link: "/sub_menu3.3",
            },
            sub_items4: {
              label: 'Yellow',
              icon: 'fas fa-palette',
              link: "/sub_menu3.4",
            },
          }
        },
        item4: {
          icon: "fas fa-sitemap",
          label: 'Components',
          sub_items: {
            sub_items1: {
              label: 'Smaple Page',
              icon: 'fas fa-desktop',
              link: "/sub_menu4.1",
            },
            sub_items2: {
              label: 'Forms',
              icon: 'fas fa-check-square',
              link: "/sub_menu4.2",
            },
            sub_items3: {
              label: 'Data',
              icon: 'fas fa-table',
              link: "/sub_menu4.3",
            },
            sub_items4: {
              label: 'Overlays',
              icon: 'fas fa-images',
              link: "/sub_menu4.4",
            },
            sub_items5: {
              label: 'Messages',
              icon: 'fas fa-info-circle',
              link: "/sub_menu4.5",
            },
            sub_items6: {
              label: 'Charts',
              icon: 'fas fa-chart-bar',
              link: "/sub_menu4.6",
            },
          }
        },
        item5: {
          icon: "fas fa-clone",
          label: 'Pages',
          sub_items: {
            sub_items1: {
              label: 'Empty Page',
              icon: 'fas fa-ticket-alt',
              link: "/sub_menu5.1",
            },
            sub_items2: {
              label: 'Landing',
              icon: 'fas fa-eye',
              link: "/sub_menu5.2",
            },
            sub_items3: {
              label: 'Login',
              icon: 'fas fa-user',
              link: "/sub_menu5.3",
            },
            sub_items4: {
              label: 'Error',
              icon: 'fas fa-times',
              link: "/sub_menu5.4",
            },
            sub_items5: {
              label: 'Messages',
              icon: 'fas fa-info-circle',
              link: "/sub_menu5.5",
            },
            sub_items6: {
              label: 'Charts',
              icon: 'fas fa-chart-bar',
              link: "/sub_menu5.6",
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
    console.log(this.openPath)
    return (
      <Router>
        <div>
          <Header isMenu={() => this.isMenu()} />
          <Menu ref={c => this.Menu = c} struct={this.StructMenu} />
          <Content />
        </div>
      </Router>
    );
  }
}

export default App;
