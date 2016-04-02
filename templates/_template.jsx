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
    const win = typeof window !== 'undefined' ?
      window :
      false;
    const originUrl = win ?  win.document.referrer : false;
    // grab parent DOM object to post messages
    const parent = win ?  win.parent : false;
    // check if we are in an iframe
    if (win.top === win.self) {
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
