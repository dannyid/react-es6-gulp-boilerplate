/*jshint esnext: true */

import React from 'react';

(function () {

  'use strict';

  class App extends React.component {
    render() {
      return <h1>Hello {this.props.name}</h1>;
    }
  }

  React.render(<App name="Danny"/>, document.body);

})();
