import React from 'react';
import { Link, State, Navigation } from 'react-router';
import { Breakpoint } from 'react-responsive-grid';
import includes from 'underscore.string/include';

// Style code
import 'css/github.css';
import 'css/gatsby.css';

module.exports = React.createClass({
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
