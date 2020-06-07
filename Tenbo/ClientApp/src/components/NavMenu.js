import React, {Component} from 'react';
import './NavMenu.css';
import TenboAppbar from "./TenboAppbar";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <TenboAppbar/>
      </header>
    );
  }
}
