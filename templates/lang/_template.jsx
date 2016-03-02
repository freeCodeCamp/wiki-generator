import React from 'react';
import { Link, State, Navigation } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import Typography from 'typography';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import includes from 'underscore.string/include';
import { link } from 'gatsby-helpers';
import typography from 'utils/typography';
import pageList from './_pages.yaml';

// Style code
import 'css/github.css';
import 'css/gatsby.css';

const { rhythm, fontSizeToPx } = typography;

module.exports = React.createClass({
  mixins: [State, Navigation],
  
  getInitialState: function() {
      return {
          filterText: ''
      };
  },

  handleTopicChange: function(e) {
    return this.transitionTo(e.target.value);
  },
 
  handleSearchChange: function(e) {
      this.setState({ 
          filterText: this.refs.filterTextInput.value
      });
  },

  render: function() {
    var childPages, docOptions, docPages;
    var langRegex = new RegExp( '^/' + __filename.slice(0,2))
    childPages = pageList.map((p) => {
      const page = find(this.props.route.pages, (_p) => _p.path === p);
      return {
        title: page.data.title,
        order: page.data.order,
        path: page.path
      };
    }).sort((a,b) => { return a.order - b.order });
    
    docOptions = childPages.map(function(child) {
      return React.createElement("option", {
        "key": child.path,
        "value": child.path
      }, child.title);
    });
    
    docPages = childPages
      .filter(function(child) {
          if(this.state.filterText.length > 0) {
              let regex = new RegExp(this.state.filterText,'i');
              return regex.test(child.title);
          } else {
              return true;
          }            
      },this)
      .map(function(child) {
        return function(child) {
          var isActive;
          isActive = link(child.path) === this.props.location.pathname;
          return (
            <li
              key={child.path}
              style={{
            marginBottom: rhythm(1/2),
          }}
            >
              <Link
                to={link(child.path)}
                style={{
              textDecoration: 'none',
            }}
              >
                {isActive ? <strong>{child.title}</strong> : child.title }
              </Link>
            </li>
          )
        };
    });

    return (
      <div>
        <Breakpoint minWidth={700}>
          <div className="wikiAside">
            <div className='searchBar'>
              <input 
                type='text' 
                value ={this.props.filterText}
                ref="filterTextInput"
                onChange={this.handleSearchChange}
                placeholder='Article search' 
                /></div>
            <div className='articlesList'>
              <ul>
              {docPages}
              </ul>
            </div>
          </div>
          <div className='articleContent'>
            {this.props.children}
          </div>
        </Breakpoint>
        <Breakpoint maxWidth={700}>
          <div className='wikiSelector'>
            <select
              defaultValue={this.props.route.path}
                onChange={this.handleTopicChange}
                >
              {docOptions}
            </select>
          </div>
          <div className='articleContent'>
            {this.props.children}
          </div>  
        </Breakpoint>
      </div>
    );
  }
});
