'use strict';

import React from 'react';
import ReactCanvas from 'react-canvas';
var Image = ReactCanvas.Image;
var Group = ReactCanvas.Group;

import './Tile.less';

var Tile = React.createClass({

    propTypes: {
    },

    getInitialState: function() {
        return {
        }
    },

    render() {
        var imageStyle = this.getImageStyle();
        var groupStyle = this.getGroupStyle();
        return (
            <Group ref="myGrp" style={groupStyle} onClick={this.click}>
                <Image style={imageStyle}
                       src={'tile.png'}
                       fadeIn={true} />
            </Group>
        )
    },

    click: function(event){
        console.log(React.findDOMNode(this.refs.myGrp).getBoundingClientRect());
        var x = event.clientX;
        var y = event.clientY;
    },

    getImageStyle: function() {
        return {
            top: 0,
            left: 0,
            width: 100,
            height: 100
        }
    },

    getGroupStyle: function() {
        return {
            width: 100,
            height: 100,
            backgroundColor: '#ff0000'
        }
    }
});

module.exports = Tile;
