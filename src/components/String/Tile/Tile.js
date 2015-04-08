'use strict';

import React from 'react';

import './Tile.less';

var Tile = React.createClass({

    propTypes: {
        parentCoordsGetter: React.PropTypes.func.isRequired,
        getContext: React.PropTypes.func.isRequired,
        top: React.PropTypes.number,
        left: React.PropTypes.number,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
    },

    getDefaultProps: function () {
        return {
            top: 0,
            left: 0
        }
    },

    getInitialState: function() {
        var ctx = this.props.getContext();
        var overlay = ctx.getImageData(this.props.top,
            this.props.left, this.props.width, this.props.height);
        for(var idx = 0; idx < overlay.data.length; idx+=4) {
            if (idx % 4 != 3){
                overlay.data[idx] = 0;
                overlay.data[idx+1] = 0;
                overlay.data[idx+2] = 0;
                overlay.data[idx+3] = 255;
            }
        }
        return {
            overlay: overlay
        }
    },

    renderOverlay: function() {
        var ctx = this.props.getContext();
        ctx.putImageData(this.state.overlay,
            this.props.left,
            this.props.top);
    },

});

module.exports = Tile;
