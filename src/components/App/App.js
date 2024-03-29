/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import './App.less';

import React from 'react';
import invariant from 'react/lib/invariant';
import AppActions from '../../actions/AppActions';
import NavigationMixin from './NavigationMixin';
import AppStore from '../../stores/AppStore';
import ContentPage from '../ContentPage';
import Game from '../Game';
import NotFoundPage from '../NotFoundPage';

var Application = React.createClass({

  mixins: [NavigationMixin],

  propTypes: {
    path: React.PropTypes.string.isRequired,
    onSetTitle: React.PropTypes.func.isRequired,
    onSetMeta: React.PropTypes.func.isRequired,
    onPageNotFound: React.PropTypes.func.isRequired
  },

  render() {
    var page = AppStore.getPage(this.props.path);
    invariant(page !== undefined, 'Failed to load page content.');
    this.props.onSetTitle(page.title);

    if (page.type === 'notfound') {
      this.props.onPageNotFound();
      return React.createElement(NotFoundPage, page);
    }

    return (
        <div className="App">
          {
            this.props.path === '/' ?
                <div className="jumbotron">
                  <div className="container text-center">
                    <h1>Clicker</h1>
                  </div>
                </div> :
                <div className="container">
                  <h2>{page.title}</h2>
                </div>
          }
          <Game className="game" />
          <div className="navbar-footer">
            <div className="container">
              <p className="text-muted">
                <span><a href="/">Home</a></span>
                <span><a href="/privacy">Privacy</a></span>
              </p>
            </div>
          </div>
        </div>
    );
  }

});

module.exports = Application;
