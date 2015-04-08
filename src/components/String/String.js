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
        var el = this.getCoords();
        var x = Math.round(event.clientX - el.left);
        var y = Math.round(event.clientY - el.top);
        this.revealOverlay(x, y);
    },

    renderCanvas: function() {
        var _this = this;
        var stage = this.state.stage;
        var img = new Image();
        var layer = new Kinetic.Layer();
        var ctx = layer.getCanvas().getContext('2d');
        ctx.clearRect(0, 0, 200, 200);
        img.src = 'tile.png';
        img.onload = function() {
            var tile = new Kinetic.Image({
                x: 0,
                y: 0,
                image: img,
                width: 100,
                height: 100
            });

            layer.add(tile);
        };
        var rect = new Kinetic.Rect({
            x: 0, y:0,
            width: _this.props.width,
            height: _this.props.height,
            fill: 'red'
        });
        layer.on('mouseover', _this.click);
        layer.add(rect);
        stage.add(layer);
        ctx.putImageData(_this.state.overlay, 0, 0);
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
        var overlay = new ImageData(100, 100);
        for (var idx=0; idx < 100 * 100 * 4; idx+=4) {
            if (idx%4 != 3){
                overlay.data[idx] = 0;
                overlay.data[idx+1] = 0;
                overlay.data[idx+2] = 0;
                overlay.data[idx+3] = 255;
            }
        }
        this.setState({overlay: overlay});
    },

    revealOverlay: function(x, y) {
        var overlay = this.state.overlay;
        var idx = 4 * (x + y * 100);
        overlay.data[idx+1] = 255; // TODO: Change this to alpha
        //overlay.data[idx+3] = 0;
        this.setState({overlay: overlay})
    },

    componentDidMount: function() {
        this.initStage();
        this.initOverlay();
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
