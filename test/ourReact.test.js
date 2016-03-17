import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import App from "../shared/components/app"

describe('Our app', function() {
  it('App text', function(){
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Welcome to Trendr. Get Trending.')
  });
});

// keyword list

// news 

// search bar

// nav bar

// graph

// twitter