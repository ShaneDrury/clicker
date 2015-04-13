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
            stage: null,
            images: {},
            loaded: false
        }
    },

    getCoords: function() {
        return React.findDOMNode(this).getBoundingClientRect()
    },

    click: function() {
        console.log("CLICK");
        var el = this.getCoords();
        var x = Math.round(event.clientX - el.left);
        var y = Math.round(event.clientY - el.top);
        this.revealOverlay(x, y);
    },

    renderCanvas: function() {
        if (this.state.loaded){
            var stage = this.state.stage;
            var topLayer = new Kinetic.Layer();
            var bgLayer = new Kinetic.Layer();

            var rect = new Kinetic.Rect({
                x: 0, y:0,
                width: this.props.width,
                height: this.props.height,
                fill: 'red'
            });
            var tile = this.state.images.tile;
            bgLayer.add(rect);
            stage.add(bgLayer);

            var ctx = this.getContext(topLayer);
            topLayer.add(tile);
            topLayer.on('mouseover', this.click);
            stage.add(topLayer);

            var overlay = this.state.overlay;
            var imageData = ctx.getImageData(0, 0, 100, 100);

            for (var idx=0; idx < imageData.data.length; idx+=4) {
                if (idx%4 != 3){
                    if(overlay[idx+3] != 0){
                        imageData.data[idx] = overlay[idx];
                        imageData.data[idx+1] = overlay[idx+1];
                        imageData.data[idx+2] = overlay[idx+2];
                        imageData.data[idx+3] = overlay[idx+3];
                    }
                    else {
                        imageData.data[idx] = imageData.data[idx];
                        imageData.data[idx+1] = imageData.data[idx+1];
                        imageData.data[idx+2] = imageData.data[idx+2];
                        imageData.data[idx+3] = imageData.data[idx+3];
                    }
                }

            }
            ctx.putImageData(imageData, 0, 0);
        }
    },

    getContext: function(layer) {
        return layer.getCanvas().getContext('2d');
    },

    initStage: function() {
        var stage = new Kinetic.Stage({
            container: 'canvasContainer',
            width: this.props.width,
            height: this.props.height
        });
        this.setState({
            stage: stage,
        });
    },

    initAssets: function () {
        var img = new Image();
        var _this = this;
        img.src = 'tile.png';
        img.onload = function() {
            var kImg = new Kinetic.Image({
                x: 0,
                y: 0,
                image: img,
                width: 100,
                height: 100
            });
            var images = _this.state.images;
            images.tile = kImg;
            _this.setState({images: images});
            _this.setState({loaded: true});
        };
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
        this.initAssets();
        this.initOverlay();
    },

    componentDidUpdate: function() {
        this.renderCanvas();
    },

    render() {
        return (
            <div>
                <div id="canvasContainer" />
            </div>
        );
    }

});

module.exports = String;
