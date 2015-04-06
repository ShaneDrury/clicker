'use strict';

import React from 'react';
import ReactCanvas from 'react-canvas';
var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;
var Group = ReactCanvas.Group;
var Layer = ReactCanvas.Layer;

import './String.less';

var String = React.createClass({

    propTypes: {
    },

    render() {
        var imageStyle = this.getImageStyle();
        var textStyle = this.getTextStyle();
        var layerStyle = this.getLayerStyle();
        var groupStyle = this.getGroupStyle();
        return <Surface
            width={200}
            height={200}
            left={0} top={0}>
            <Group style={groupStyle}>
                <Layer style={layerStyle} onClick={this.click}>
                    <Image style={imageStyle}
                           src={'tile.png'}
                           fadeIn={true} />
                    <Text style={textStyle}>
                        Here is some text.
                    </Text>
                </Layer>

            </Group>
        </Surface>
    },

    click: function(event){
        console.log(event);
        console.log("CLICKED");
    },

    getImageStyle: function() {
        return {
            top: 0,
            left: 0,
            width: 100,
            height: this.getImageHeight()
        }
    },

    getImageHeight: function() {
        return 100;
    },

    getTextStyle: function () {
        return {
            top: this.getImageHeight() + 10,
            left: 0,
            width: window.innerWidth,
            height: 20,
            lineHeight: 20,
            fontSize: 12
        };
    },

    getGroupStyle: function() {
        return {
            width: 200,
            height: 200,
            backgroundColor: '#ff0000'
        }
    },

    getLayerStyle: function() {
        return {
            width: 100,
            height: 100,
            top: 0,
            left: 0,
            backgroundColor: '#00ff00'
        }
    }

});

module.exports = String;
