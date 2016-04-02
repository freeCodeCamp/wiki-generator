import React from 'react';
import { Link, State, Navigation } from 'react-router';
import { browserHistory } from 'react-router'
import { Breakpoint } from 'react-responsive-grid';

// Style code
import 'css/github.css';
import 'css/gatsby.css';

module.exports = React.createClass({
  componentDidMount() {
    // if iframe, this will be the parent url
    const originUrl = typeof document !== 'undefined' ?
      document.referrer :
      false;
    // grab parent DOM object to post messages
    const parent = typeof window !== 'undefined' ?
      window.parent :
      false;
    if (!parent && !originUrl) {
      return;
    }
    // listen to react-router history changes
    // if change happens, post message to parent window
    // up to parent to update url
    browserHistory.listen(location => {
      parent.postMessage(location.pathname, originUrl);
    });
  },
  render: function() {
    return (
      <div className='wiki-container'>
        <div className='article-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
});
