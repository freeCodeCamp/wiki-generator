import React from 'react';
import { Link, State, Navigation } from 'react-router';
import { Container, Grid, Breakpoint, Span } from 'react-responsive-grid';
import colorPairsPicker from 'color-pairs-picker';
import chroma from 'chroma-js';
import includes from 'underscore.string/include';
import { link, templateChildrenPages } from 'gatsby-helpers';

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
