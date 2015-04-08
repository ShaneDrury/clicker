'use strict';

import React from 'react';
import Building from '../Building';
import Clicker from '../Clicker';

import BuildingConst from '../../constants/buildings.js'
import { canUseDOM } from 'react/lib/ExecutionEnvironment.js';

var String = canUseDOM ? require('../String'): null;

import './Game.less';

var Game = React.createClass({
  componentDidMount: function(){
    this.update();
    this.timer = setInterval(this.update, 1000);
  },

  componentWillunMount: function(){
    clearInterval(this.timer);
  },

  update: function() {
    this.handlePixel();
    this.handleUnlocked();
  },

  handlePixel: function() {
    this.setState({pixels: this.state.pixels + this.numPerTick()})
  },

  handleUnlocked: function() {
    var _this = this;
    for (var key in BuildingConst) {
      if (BuildingConst.hasOwnProperty(key) &&
          this.state.ownedBuildings[key] !== 0 &&
          !this.state.ownedBuildings[key]
      ) {
        var info = BuildingConst[key];
        if (_this.state.pixels >= info.unlockedAt(this.state)){
          this.updateBuildings(key, 0)
        }
      }
    }
  },

  numPerTick: function() {
    var total = 0;
    if(!this.isEmptyObject(this.state.ownedBuildings)) {
      for (var key in this.state.ownedBuildings) {
        if (this.state.ownedBuildings.hasOwnProperty(key)) {
          var num = this.state.ownedBuildings[key];
          var info = BuildingConst[key];
          total += info.baseNumPerTick * num;
        }
      }
    }
    return total
  },

  getInitialState: function() {
    return {
      ownedBuildings: {},
      pixels: 0
    }
  },

  updateBuildings: function(name, val){
    var buildings = this.state.ownedBuildings;
    buildings[name] = val;
    this.setState({ownedBuildings: buildings});
  },

  buy: function(building){
    if (building.canBuy()){
      var name = building.props.name;
      var pixel = this.state.pixels - building.currentCost();
      this.setState({pixels: pixel});
      var num = this.state.ownedBuildings[name] + 1;
      this.updateBuildings(name, num);
    }

  },

  sell: function(building){
    if (building.canSell()){
      var name = building.props.name;
      var pixel = this.state.pixels + building.currentCost() / 3.;
      this.setState({pixels: pixel});
      var num = this.state.ownedBuildings[name] - 1;
      this.updateBuildings(name, num);
    }
  },

  isEmptyObject: function(obj){
    var name;
    for ( name in obj ) {
      return false;
    }
    return true;
  },

  renderBuildings: function(){
    var buildings = [];
    var _this = this;
    if(!this.isEmptyObject(this.state.ownedBuildings)) {
      for (var key in this.state.ownedBuildings) {
        if (this.state.ownedBuildings.hasOwnProperty(key)) {
          var num = _this.state.ownedBuildings[key];
          var info = BuildingConst[key];
          buildings.push(
              <Building
                  key={key}
                  pixel={_this.state.pixels}
                  numOwned={num}
                  name={key}
                  description={info.description}
                  baseCost={info.baseCost}
                  buyCallback={_this.buy}
                  sellCallback={_this.sell} />
          );
        }
      }
    }
    return buildings
  },

  onClick: function(){
    var pixel = this.state.pixels + this.numPerClick();
    this.setState({pixels: pixel});
  },

  setPixels: function(event) {
    this.setState({pixels: parseInt(event.target.value)});
  },

  render() {
    var string = canUseDOM?
        <String
            width={200}
            height={200} /> :
        <div />;

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="shop">
              </div>
              <div className="upgrades">
              </div>
              <div className="buildings">
                {this.renderBuildings()}
              </div>
              <div>
                {this.state.pixels.toFixed(2)}
              </div>
              <input type="number"
                     value={this.state.pixels}
                     onChange={this.setPixels}>Num Pixels</input>
            </div>
            <div className="col-md-6">
              {string}
            </div>
          </div>
        </div>
    );
  }

});

module.exports = Game;
