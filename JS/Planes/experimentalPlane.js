const Plane = require('./Plane');

class ExperimentalPlane extends Plane {

    constructor(
        model, 
        maxSpeed, 
        maxFlightDistance, 
        maxLoadCapacity, 
        experimentalType, 
        classificationLevel
        ) {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
        this._experimentalType = experimentalType;
        this._classificationLevel = classificationLevel;
    }

    get experimentalType() {
        return this._experimentalType;
    }
    
    set experimentalType(value) {
        this._experimentalType = value;
    }
    
    get classificationLevel() {
        return this._classificationLevel;
    }
    
    set classificationLevel(value) {
        this._classificationLevel = value;
    }
}

module.exports = ExperimentalPlane;