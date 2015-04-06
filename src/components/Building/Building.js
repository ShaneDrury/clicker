/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import React from 'react';

import './Building.less';

var Building = React.createClass({

  propTypes: {
    numOwned: React.PropTypes.number,
    pixel: React.PropTypes.number.isRequired,
    baseCost: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    buyCallback: React.PropTypes.func.isRequired,
    sellCallback: React.PropTypes.func.isRequired
  },

  getInitialState: function(){
    return {
      canSell: false
    }
  },

  buy: function(){
    this.props.buyCallback(this);
  },

  sell: function(){
    this.props.sellCallback(this);
  },

  currentCost: function(){
    return this.props.baseCost * Math.pow(1.05, this.props.numOwned);
  },

  canBuy: function(){
    return this.props.currency >= this.currentCost()
  },

  canSell: function(){
    return this.props.numOwned > 0
  },

  render() {
    /* jshint ignore:start */
    return <div className="building">
      <div className="row">
        {this.props.name}: {this.props.numOwned}
      </div>
      <div className="row">
        Cost: {this.currentCost().toFixed(2)}
      </div>
      <div className="row">
        {this.props.description}
      </div>
      <div className="row">
        <div
            type="button"
            disabled={!this.canBuy()}
            className="buyButton"
            onClick={this.buy}>
          Buy
        </div>
        <div
            type="button"
            disabled={!this.canSell()}
            className="sellButton"
            onClick={this.sell}>
          Sell
        </div>
      </div>
    </div>;
    /* jshint ignore:end */
  }

});

module.exports = Building;
