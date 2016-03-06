import React from 'react';
import { Link, State, Navigation } from 'react-router';
import { Breakpoint } from 'react-responsive-grid';
import find from 'lodash/find';
import { link } from 'gatsby-helpers';
import pageList from './_pages.yaml';

// Style code
import 'css/github.css';
import 'css/gatsby.css';

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  handleTopicChange (e) {
    return this.context.router.push(e.target.value)
  },
   getInitialState () {
    return {
        filterText: ''
    };
  }, 
  handleSearchChange (e) {
    this.setState({ 
        filterText: this.refs.filterTextInput.value
    });
  },
  render () {
    var langRegex = new RegExp( '^/' + __filename.slice(0,2));
    const childPages = pageList.map((p) => {
      const page = find(this.props.route.pages, (_p) => _p.path === p)
      return {
        title: page.data.title,
        order: page.data.order,
        path: page.path,
      }
    }).sort((a,b) => a.title.localeCompare(b.title));
    const docOptions = childPages.map((child) =>
      <option
        key={link(child.path)}
        value={link(child.path)}
      >
        {child.title}
      </option>

    )
    const docPages = childPages
    .filter(function(child) {
            if(this.state.filterText.length > 0) {
                let regex = new RegExp(this.state.filterText,'i');
                return regex.test(child.title);
            } else {
                return true;
            }            
        },this)
    .map((child) => {
      const isActive = link(child.path) === this.props.location.pathname
      return (
        <li
          key={child.path}
        >
          <Link
            to={link(child.path)}
          >
            {isActive ? <strong>{child.title}</strong> : child.title }
          </Link>
        </li>
      )
    })

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
              />
            </div>
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
              defaultValue={this.props.location.pathname}
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
    )
  },
})


/*
          
              
*/
