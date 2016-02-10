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
  render: function() {
    return (
      <div className='wiki-container'>
        <div className='article-container'>
          <RouteHandler typography={typography} {...this.props}/>
        </div>  
      </div>
    );
  }
});
