import React from 'react';
import {Link, State, Navigation} from 'react-router';
import find from 'lodash/find';
import {prefixLink} from 'gatsby-helpers';
import pageList from './_pages.yaml';

const langRegex = new RegExp('^/' + __filename.slice(0, 2));
module.exports = React.createClass({
  displayName: 'Page',
  propTypes() {
    return {route: React.PropTypes.object}
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  handleTopicChange(e) {
    return this.context.router.push(e.target.value)
  },
  getInitialState() {
    return {filterText: ''};
  },
  handleSearchChange(e) {
    this.setState({filterText: this.refs.filterTextInput.value});
  },
  renderList(pages) {
    return pages.filter(child => {
      if (this.state.filterText.length > 0) {
        let regex = new RegExp(this.state.filterText, 'i');
        return regex.test(child.title);
      } else {
        return true;
      }
    }).map(child => {
      const isActive = prefixLink(child.path) === this.props.location.pathname
      return (
        <li key={child.path}>
          <Link to={prefixLink(child.path)}>
            {isActive
              ? <strong>{child.title}</strong>
              : child.title}
          </Link>
        </li>
      );
    });
  },
  renderSelector(pages) {
    return pages.map(child => <option key={prefixLink(child.path)} value={prefixLink(child.path)}>
      {child.title}
    </option>);
  },
  render() {
    const childPages = pageList.map((p) => {
      return find(this.props.route.pages, (_p) => _p.path === p)
    }).filter(Boolean).map(page => ({title: page.data.title, order: page.data.order, path: page.path})).sort((a, b) => a.title.localeCompare(b.title));
    return (
      <div>
        <div className='wiki-aside'>
          <div className='searchBar'>
            <input className='searchBar' type='text' value ={this.props.filterText} ref='filterTextInput' onChange={this.handleSearchChange} placeholder='Article search'/>
          </div>
          <div className='articlesList'>
            <ul>
              {this.renderList(childPages)}
            </ul>
          </div>
        </div>
        <div className='wiki-selector'>
          <select defaultValue={this.props.location.pathname} onChange={this.handleTopicChange}>
            {this.renderSelector(childPages)}
          </select>
        </div>
        <div className='articleContent'>
          {this.props.children}
        </div>
      </div>
    )
  }
});
