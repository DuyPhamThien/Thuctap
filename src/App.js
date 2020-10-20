import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';

import React, { Component } from 'react';
import Content from './components/Content/Content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exit: {},
    }
    this.StructMenu = {
      items: {
        item1: {
          icon: "fas fa-home",
          label: 'Dashboard',
        },
        item2: {
          icon: "fas fa-bars",
          label: 'Menu',
          'func': (data) => {
            return <i className="fas fa-angle-down icon-right" onClick={() => {
              var exit = this.state.exit;
              if (exit[data] == 1) {
                exit[data] = 0;
              } else {
                exit[data] = 1;
              }

              this.setState({ exit: exit });
            }} ></i>
          },
          sub_items: {
            sub_items1: {
              label: 'Horizontal Menu',
              icon: 'fas fa-bars',
            },
            sub_items2: {
              label: 'Overlay Menu',
              icon: 'fas fa-bars',
            },
            sub_items3: {
              label: 'Static Menu',
              icon: 'fas fa-bars',
            },
            sub_items4: {
              label: 'Slim Menu',
              icon: 'fas fa-bars',
            },
          }

        },

        item3: {
          icon: "far fa-circle",
          label: 'Dark',
          'func': (data) => {
            return <i className="fas fa-angle-down icon-right" onClick={() => {
              var exit = this.state.exit;
              if (exit[data] == 1) {
                exit[data] = 0;
              } else {
                exit[data] = 1;
              }

              this.setState({ exit: exit });
            }} ></i>
          },
          sub_items: {
            sub_items1: {
              label: 'Blue',
              icon: 'fas fa-palette',
            },
            sub_items2: {
              label: 'Green',
              icon: 'fas fa-palette',
            },
            sub_items3: {
              label: 'Red',
              icon: 'fas fa-palette',
            },
            sub_items4: {
              label: 'Yellow',
              icon: 'fas fa-palette',
            },
          }

        },

        item4: {
          icon: "fas fa-sitemap",
          label: 'Components',
          'func': (data) => {
            return <i className="fas fa-angle-down icon-right" onClick={() => {
              var exit = this.state.exit;
              if (exit[data] == 1) {
                exit[data] = 0;
              } else {
                exit[data] = 1;
              }

              this.setState({ exit: exit });
            }} ></i>
          },
          sub_items: {
            sub_items1: {
              label: 'Smaple Page',
              icon: 'fas fa-desktop',
            },
            sub_items2: {
              label: 'Forms',
              icon: 'fas fa-check-square',
            },
            sub_items3: {
              label: 'Data',
              icon: 'fas fa-table',
            },
            sub_items4: {
              label: 'Overlays',
              icon: 'fas fa-images',
            },
            sub_items5: {
              label: 'Messages',
              icon: 'fas fa-info-circle',
            },
            sub_items6: {
              label: 'Charts',
              icon: 'fas fa-chart-bar',
            },
          }

        },

      }

    }
  }
  isMenu(){
    this.Menu.setState({
      menuleft : !(this.Menu.state.menuleft)
    })
  }
  render() {
    return (
      <div>
        <Header isMenu = {() => this.isMenu()}/>
        <Menu ref={c => this.Menu = c} struct={this.StructMenu} exit={this.state.exit} />
        <Content />
      </div>
    );
  }
}

export default App;
