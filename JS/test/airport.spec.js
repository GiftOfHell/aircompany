const chai = require('chai');
chai.use(require("chai-sorted"));

const { assert, expect } = chai;

const Plane = require('../Planes/Plane');
const PassengerPlane = require('../Planes/PassengerPlane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const MilitaryTypes = require('../models/MilitaryTypes');
const ExperimentalPlane = require('../Planes/experimentalPlane');
const ExperimentalTypes = require('../models/ExperimentalTypes');
const ClassificationLevels = require('../models/ClassificationLevels');
const Airport = require('../Airport');

describe('Test Airport project', () => {

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryTypes.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryTypes.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryTypes.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryTypes.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryTypes.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryTypes.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevels.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevels.TOP_SECRET)
    ];

    let expectedTransportMilitaryPlanes = [
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryTypes.TRANSPORT)
    ];

    let expectedPlaneWithMaxPassengerCapacity = [
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242)
    ];

    let expectedBomberMilitaryPlanes = [
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryTypes.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryTypes.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryTypes.BOMBER)
    ];

    let expectedExperimentalPlanes = [
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevels.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevels.TOP_SECRET)
    ];

    it('Should have military planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        expect(transportMilitaryPlanes).to.have.deep.members(expectedTransportMilitaryPlanes);
    });

    it('Should check passenger plane with max load capacity', () => {
        let airport = new Airport(planes);
        let planeWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.deepEqual(planeWithMaxPassengersCapacity, expectedPlaneWithMaxPassengerCapacity);
    });

    it('Should sort planes by max load capacity', () => {
        let airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        expect(airport.planes).to.be.ascendingBy("maxLoadCapacity");
    })

    it('Should have military planes with bomber type', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        expect(bomberMilitaryPlanes).to.have.deep.members(expectedBomberMilitaryPlanes);
    })

    it('Should have experimental planes', () => {
        let airport = new Airport(planes);
        let experimentalPlanes = airport.getExperimentalPlanes();
        expect(experimentalPlanes).to.have.deep.members(expectedExperimentalPlanes);
    })
});



