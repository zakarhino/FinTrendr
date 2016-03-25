import React, { Component } from 'react';
import SearchBar from './search_bar';

export default class App extends Component {
  constructor(props){
    super(props);
    //console.log(this.state);
  }
  componentWillReceiveProps(nextProps)
  {
    console.log('App getting new props',nextProps);
  }
  componentDidMount (){
  }
  compontentWillUpdate()
  {
    console.log('app getting updated');
    return true;
  }
  renderSearchBar(){
    if (this.props.location.pathname==='/'){
      return (<div></div>)
    }
    else {
      return <SearchBar />
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-dark navbar-fixed-top bg-inverse bottomGreen">
          <a href="/" className="title-link col-md-2 col-sm-4">
            <img src="/img/BarsWhite.png" width="70" className="pull-xs-left" />
            <h1 className="mainTitle">Trendr</h1>
            <div className="subTitle">Lets Get Trending</div>
          </a>
          <form className="navbar-form navbar-right search" role="search">
              {this.renderSearchBar()}
          </form>
        </nav>
          {this.props.children}
      </div>
    );
  }
}
