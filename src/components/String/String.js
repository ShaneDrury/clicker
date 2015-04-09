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
        var layer = new Kinetic.Layer();
        var img = new Image();
        img.src = 'tile.png';
        img.onload = function() {
            var tile = new Kinetic.Image({
                x: 0,
                y: 0,
                image: img,
                width: 100,
                height: 100
            });
            var rect = new Kinetic.Rect({
                x: 0, y:0,
                width: _this.props.width,
                height: _this.props.height,
                fill: 'red'
            });
            layer.on('mouseover', _this.click);
            layer.add(rect);
            layer.add(tile);

            // Need to make a fake canvas and draw from it to the real one
            var ctx = _this.getContext(layer);
            var imageData = ctx.getImageData(0, 0, 100, 100);
            var overlay = _this.state.overlay;
            for (var idx=0; idx < imageData.data.length; idx+=4) {
                if (idx % 4 != 3) {
                    if(overlay[idx+3] != 0){
                        imageData.data[idx] = overlay[idx];
                        imageData.data[idx+1] = overlay[idx+1];
                        imageData.data[idx+2] = overlay[idx+2];
                        imageData.data[idx+3] = overlay[idx+3];
                    }
                }
            }
            stage.add(layer);
            ctx.putImageData(imageData, 0, 0);
        };
    },

    getContext: function(layer) {
        return layer.getCanvas().getContext('2d');
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
        var overlay = [];
        for (var idx=0; idx < 100 * 100 * 4; idx+=4) {
            if (idx%4 != 3){
                overlay[idx] = 0;
                overlay[idx+1] = 0;
                overlay[idx+2] = 0;
                overlay[idx+3] = 255;
            }
        }
        this.setState({overlay: overlay});
    },

    revealOverlay: function(x, y) {
        var overlay = this.state.overlay;
        var idx = 4 * (x + y * 100);
        //overlay[idx+1] = 255; // TODO: Change this to alpha
        overlay[idx+3] = 0;
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
