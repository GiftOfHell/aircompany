const chai = require('chai');
chai.use(require("chai-sorted"));

const { assert, expect } = chai;

const Plane = require('../Planes/Plane');
const PassengerPlane = require('../Planes/PassengerPlane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');

const MILITARY_TYPES = require('../models/MilitaryTypes');
const EXPERIMENTAL_TYPES = require('../models/ExperimentalTypes');
const CLASSIFICATION_LEVELS = require('../models/ClassificationLevels');

const Airport = require('../Airport');

describe('Test Airport class', () => {

    const planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MILITARY_TYPES.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MILITARY_TYPES.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MILITARY_TYPES.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MILITARY_TYPES.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MILITARY_TYPES.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MILITARY_TYPES.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, EXPERIMENTAL_TYPES.HIGH_ALTITUDE, CLASSIFICATION_LEVELS.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, EXPERIMENTAL_TYPES.VTOL, CLASSIFICATION_LEVELS.TOP_SECRET)
    ];

    const expectedTransportMilitaryPlanes = [
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MILITARY_TYPES.TRANSPORT)
    ];

    const expectedPlaneWithMaxPassengerCapacity = [
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242)
    ];

    it('Should have military planes with transport type', () => {
        const airport = new Airport(planes);
        const transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        expect(transportMilitaryPlanes).to.have.deep.members(expectedTransportMilitaryPlanes);
    });

    it('Should check passenger plane with max load capacity', () => {
        const airport = new Airport(planes);
        const planeWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.deepEqual(planeWithMaxPassengersCapacity, expectedPlaneWithMaxPassengerCapacity);
    });

    it('Should sort planes by max load capacity', () => {
        const airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        expect(airport.planes).to.be.ascendingBy("maxLoadCapacity");
    })

    it('Should check that at least one bomber is present in military planes', () => {
        const airport = new Airport(planes);
        const bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        expect(bomberMilitaryPlanes.length).to.be.greaterThan(0);
    })

    it('Should check that experimental planes has classification level higher than unclassified', () => {
        const airport = new Airport(planes);
        const classifiedExperimentalPlanes = airport.getClassifiedExperimentalPlanes();
        expect(classifiedExperimentalPlanes.length).to.be.greaterThan(0);
    })
});



