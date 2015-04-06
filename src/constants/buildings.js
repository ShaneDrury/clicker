'use strict';

var BuildingsConst = {
    'Foo': {
        description: "foo",  // Could use markup here
        baseCost: 1,
        baseNumPerTick: 0.1,
        unlockedAt: function(state){
            return state.currency > 0
        }
    },
    'building Two': {
        description: "foo bar",
        baseCost: 100,
        baseNumPerTick: 1,
        unlockedAt: function(state){
            return state.currency > 100
        }
    }
};

module.exports = BuildingsConst;
