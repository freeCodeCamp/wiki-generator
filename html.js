import React from 'react';
import DocumentTitle from 'react-document-title';
import {prefixLink} from 'gatsby-helpers';

module.exports = React.createClass({
  displayName: 'HTML',
  propTypes() {
    return {title: React.PropTypes.string}
  },
  render() {
    let title = DocumentTitle.rewind()
    if (this.props.title) {
      title = this.props.title
    }
    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8'/>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
          <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
          <title>{title}</title>
          <link rel='shortcut icon' href={this.props.favicon}/>
          <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'/>
          <link rel='stylesheet' href={prefixLink('/styles.css')}/>
        </head>
        <body className='landing-page'>
          <div id='react-mount' dangerouslySetInnerHTML={{
            __html: this.props.body
          }}/>
          <script src={prefixLink('/bundle.js')}/>
        </body>
      </html>
    );
  }
});
