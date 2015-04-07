'use strict';

import React from 'react';
import ReactCanvas from 'react-canvas';
import Tile from './Tile/Tile.js';
var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;

import './String.less';

var String = React.createClass({

    propTypes: {
    },

    getInitialState: function() {
        return {
        }
    },

    click: function() {
      console.log(React.findDOMNode(this).getBoundingClientRect());
    },

    render() {
        return (
            <Surface
                width={200}
                height={200}
                left={0} top={0}>
                <Tile />
            </Surface>
        )
    }

});

module.exports = String;
