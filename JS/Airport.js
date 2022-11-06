const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryTypes = require('./models/MilitaryTypes');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {

    constructor(planes) {
        this.planes = planes;
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
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

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getTransportMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(militaryPlane => militaryPlane.militaryType === MilitaryTypes.TRANSPORT);
    }

    getBomberMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(militaryPlane => militaryPlane.militaryType === MilitaryTypes.BOMBER);
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane.constructor.name === "ExperimentalPlane");
    }

    sortByMaxDistance() {
        return this.planes.sort((firstPlane, secondPlane) => (firstPlane.maxFlightDistance > secondPlane.maxFlightDistance) ? 1 : -1);
    }

    sortByMaxSpeed() {
        return this.planes.sort((firstPlane, secondPlane) => (firstPlane.maxSpeed > secondPlane.maxSpeed) ? 1 : -1);
    }

    sortByMaxLoadCapacity() {
        return this.planes.sort((firstPlane, secondPlane) => (firstPlane.maxLoadCapacity > secondPlane.maxLoadCapacity) ? 1 : -1);
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;