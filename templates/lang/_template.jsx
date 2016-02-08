import React from 'react';
import { RouteHandler, Link, State, Navigation } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import Typography from 'typography';
import sortBy from 'lodash/collection/sortBy';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import includes from 'underscore.string/include';
import { link, templateChildrenPages } from 'gatsby-helpers';

import typography from 'utils/typography';

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
    var langRegex = new RegExp( '^/' + __filename.slice(0,2));
    console.log(langRegex.toString());
    childPages = templateChildrenPages(__filename, this.props.state).map(function(child) {
      return {
        title: child.data.title,
        order: child.data.order,
        path: child.path
      };
    }).filter(child => {
      return langRegex.test(child.path);
    });
    childPages = sortBy(childPages, function(child) {
      return child.order;
    });
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
        .map((function(_this) {
      
      return function(child) {
        var isActive;
        isActive = _this.isActive(link(child.path));
        return (
          <li
            key={child.path}
            style={{
              marginBottom: rhythm(1/2)
            }}
          >
            <Link
              to={link(child.path)}
            >
              {isActive ? <strong>{child.title}</strong> : child.title }
            </Link>
          </li>
        )
      };
    })(this));

    return (
      <div className='container'>
        <div className='wiki-header'>
          <a href='http://www.freecodecamp.com' 
            >
            <img
              src="http://i.imgur.com/L5o713v.png" 
              />
            <span>
              Return to the main site
            </span>  
          </a>
        </div>
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
            <RouteHandler typography={typography} {...this.props}/>
          </div>
        </Breakpoint>
        <Breakpoint maxWidth={700}>
          <div className='wikiSelector'>
            <select
              defaultValue={this.props.state.path}
                onChange={this.handleTopicChange}
                >
              {docOptions}
            </select>
          </div>
          <div className='articleContent'>
            <RouteHandler typography={typography} {...this.props}/>
          </div>  
        </Breakpoint>
      </div>
    );
  }
});
