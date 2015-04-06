'use strict';

import React from 'react';

import './Clicker.less';

var Clicker = React.createClass({

    propTypes: {
        callback: React.PropTypes.func.isRequired
    },

    click: function(){
        this.props.callback()
    },

    render() {
        return <div
            type="button"
            className="clicker"
            onClick={this.click}>
            Click!
        </div>
    }

});

module.exports = Clicker;
