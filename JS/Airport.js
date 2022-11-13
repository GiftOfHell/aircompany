const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

const MILITARY_TYPES = require('./models/MilitaryTypes');
const EXPERIMENTAL_TYPES = require('./models/ExperimentalTypes');
const CLASSIFICATION_LEVELS = require("./models/ClassificationLevels");

class Airport {

    constructor(planes) {
        this._planes = planes;
    }

    getPlanes() {
        return this._planes;
    }

    getPassengerPlanes() {
        return this.getPlanes().filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.getPlanes().filter(plane => plane instanceof MilitaryPlane);
    }

    getExperimentalPlanes() {
        return this.getPlanes().filter(plane => plane instanceof ExperimentalPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let passengerPlanes = this.getPassengerPlanes();
        let maxPassengersCapacity = 0;
        passengerPlanes.forEach( (passengerPlane) => {
            if (passengerPlane.passengersCapacity > maxPassengersCapacity) {
                maxPassengersCapacity = passengerPlane.passengersCapacity;
            }
        });
        return passengerPlanes.filter(passengerPlane => passengerPlane.passengersCapacity === maxPassengersCapacity);
    }

    getTransportMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(militaryPlane => militaryPlane.militaryType === MILITARY_TYPES.TRANSPORT);
    }

    getBomberMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(militaryPlane => militaryPlane.militaryType === MILITARY_TYPES.BOMBER);
    }

    getClassifiedExperimentalPlanes() {
        return this.getExperimentalPlanes().filter(experimentalPlane => experimentalPlane.classificationLevel !== CLASSIFICATION_LEVELS.UNCLASSIFIED);
    }

    sortByMaxDistance() {
        return this.getExperimentalPlanes().sort((firstPlane, secondPlane) => (firstPlane.maxFlightDistance > secondPlane.maxFlightDistance) ? 1 : -1);
    }

    sortByMaxSpeed() {
        return this.getPlanes().sort((firstPlane, secondPlane) => (firstPlane.maxSpeed > secondPlane.maxSpeed) ? 1 : -1);
    }

    sortByMaxLoadCapacity() {
        return this.getPlanes().sort((firstPlane, secondPlane) => (firstPlane.maxLoadCapacity > secondPlane.maxLoadCapacity) ? 1 : -1);
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;