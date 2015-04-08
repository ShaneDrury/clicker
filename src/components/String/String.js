'use strict';

import React from 'react';
import Kinetic from 'kinetic';

import './String.less';

var String = React.createClass({

    propTypes: {
    },

    getInitialState: function() {

        return {
            overlay: null,
            stage: null
        }
    },

    getCoords: function() {
        return React.findDOMNode(this).getBoundingClientRect()
    },

    click: function() {
        /*
         TODO: check which element was clicked
         */
        var el = this.getCoords();
        var x = event.clientX - el.left;
        var y = event.clientY - el.top;
        this.revealOverlay(x, y);
    },

    renderCanvas: function() {
        var _this = this;
        var stage = this.state.stage;
        var img = new Image();
        var layer = new Kinetic.Layer();
        img.src = 'tile.png';
        img.onload = function() {
            var tile = new Kinetic.Image({
                x: 0,
                y: 0,
                image: img,
                width: 100,
                height: 100
            });
            tile.on('')
            var rect = new Kinetic.Rect({
                x: 0, y:0,
                width: _this.props.width,
                height: _this.props.height,
                fill: 'red'
            });
            layer.add(rect);
            layer.add(tile);
            stage.add(layer);
        };
    },

    initStage: function() {
        var stage = new Kinetic.Stage({
            container: 'container',
            width: this.props.width,
            height: this.props.height
        });
        this.setState({stage: stage});
    },

    initOverlay: function() {
        var stage = this.state.stage;
        var overlay = stage.getImageData(0, 0, 100, 100);
        for(var idx = 0; idx < overlay.data.length; idx+=4) {
            if (idx % 4 != 3){
                overlay.data[idx] = 0;
                overlay.data[idx+1] = 0;
                overlay.data[idx+2] = 0;
                overlay.data[idx+3] = 255;
            }
        }
        this.setState({overlay: overlay})
    },

    revealOverlay: function(x, y) {
        var overlay = this.state.overlay;
        var idx = x * (100 - y) * 4;
        overlay.data[idx+3] = 0;
        this.setState({overlay: overlay})
    },

    componentDidMount: function() {
        this.initStage();
        this.initOverlay();
        this.renderCanvas();
    },

    componentDidUpdate: function() {
        this.renderCanvas();
    },

    render() {
        return (
            <div id="container" />
        );
    }

});

module.exports = String;
