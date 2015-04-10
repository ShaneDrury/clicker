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
            bottomStage: null,
            topStage: null,
            imageData: null,
            img: null
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
        var bottomStage = this.state.bottomStage;
        var topStage = this.state.topStage;
        var topLayer = new Kinetic.Layer();
        var bgLayer = new Kinetic.Layer();
        var rect = new Kinetic.Rect({
            x: 0, y:0,
            width: this.props.width,
            height: this.props.height,
            fill: 'red'
        });
        var tile = new Kinetic.Image({
            x: 0,
            y: 0,
            image: this.state.img,
            width: 100,
            height: 100
        });
        bgLayer.add(rect);
        topLayer.add(tile);
        topLayer.on('mouseover', this.click);
        topStage.add(topLayer);
        bottomStage.add(bgLayer);
        var overlay = this.state.overlay;
        var imageData = this.state.imageData;
        if (imageData){
            var ctx = this.getContext(topLayer);
            for (var idx=0; idx < imageData.data.length; idx+=4) {
                if (idx % 4 != 3) {
                    if(overlay[idx+3] != 0){
                        imageData.data[idx] = overlay[idx];
                        imageData.data[idx+1] = overlay[idx+1];
                        imageData.data[idx+2] = overlay[idx+2];
                        imageData.data[idx+3] = overlay[idx+3];
                    }
                    else{
                        console.log(imageData.data[idx+3]);
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
        var topStage = new Kinetic.Stage({
            container: 'topCanvas',
            width: this.props.width,
            height: this.props.height
        });
        var bottomStage = new Kinetic.Stage({
            container: 'bottomCanvas',
            width: this.props.width,
            height: this.props.height
        });
        this.setState({
            topStage: topStage,
            bottomStage: bottomStage
        });
    },

    initAssets: function () {
        var img = new Image();
        var _this = this;
        var topLayer = new Kinetic.Layer();
        img.src = 'tile.png';
        img.onload = function() {

            var ctx = _this.getContext(topLayer);
            var imageData = ctx.getImageData(0, 0, 100, 100);
            _this.setState({imageData: imageData});
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
                <div id="topCanvas" />
                <div id="bottomCanvas" />
            </div>
        );
    }

});

module.exports = String;
