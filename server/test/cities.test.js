import * as chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import { expect } from 'chai';
import mongoose from 'mongoose';
import City from '../models/City.js';
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { getCities, getCity, createCity, updateCity, deleteCity } from '../controllers/getCities.js';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('City Controller', () => {
  let req, res, statusStub, jsonStub;

  beforeEach(() => {
    req = {
      user: { userId: 'testUserId' },
      params: {},
      body: {}
    };
    statusStub = sinon.stub();
    jsonStub = sinon.stub();
    res = {
      status: statusStub,
      json: jsonStub
    };
    statusStub.returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getCities', () => {
    it('should return cities for a valid user', async () => {
      const mockCities = [
        { _id: 'city1', name: 'New York', createdAt: new Date('2023-01-01') },
        { _id: 'city2', name: 'London', createdAt: new Date('2023-01-02') }
      ];
      sinon.stub(City, 'find').resolves(mockCities);

      await getCities(req, res);

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith({ cities: mockCities, count: 2 })).to.be.true;
    });

    it('should return 404 if no cities found', async () => {
      sinon.stub(City, 'find').resolves([]);

      await getCities(req, res);

      expect(statusStub.calledWith(404)).to.be.true;
      expect(jsonStub.calledWith({ error: "Cities not found" })).to.be.true;
    });
  });

  describe('getCity', () => {
    it('should return a city if found', async () => {
      const mockCity = { _id: 'city1', name: 'New York' };
      sinon.stub(City, 'findOne').resolves(mockCity);
      req.params.id = 'city1';

      await getCity(req, res);

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith({ city: mockCity })).to.be.true;
    });

    it('should throw NotFoundError if city not found', async () => {
      req.params.id = 'nonexistent';
      sinon.stub(City, 'findOneAndDelete').resolves(null);

      await expect(deleteCity(req, res)).to.be.rejectedWith('No city found with ID nonexistent');
    });
  });

  describe('createCity', () => {
    it('should create a new city', async () => {
      const newCity = { name: 'Paris', country: 'France' };
      req.body = newCity;
      const createdCity = { ...newCity, _id: 'newCityId' };
      sinon.stub(City, 'create').resolves(createdCity);

      await createCity(req, res);

      expect(statusStub.calledWith(201)).to.be.true;
      expect(jsonStub.calledWith({ city: createdCity })).to.be.true;
    });

    it('should handle validation errors', async () => {
      req.body = { name: '' };  // Invalid data
      const validationError = new mongoose.Error.ValidationError();
      sinon.stub(City, 'create').rejects(validationError);

      await createCity(req, res);

      expect(statusStub.calledWith(400)).to.be.true;
      expect(jsonStub.calledWith({ error: "Invalid input data" })).to.be.true;
    });
  });

  describe('updateCity', () => {
    it('should update a city', async () => {
      req.params.id = 'city1';
      req.body = { notes: 'Updated notes', date: '2023-03-01' };
      const updatedCity = { _id: 'city1', ...req.body };
      sinon.stub(City, 'findOneAndUpdate').resolves(updatedCity);

      await updateCity(req, res);

      expect(City.findOneAndUpdate.calledWith(
        { _id: 'city1', createdBy: 'testUserId' },
        req.body,
        { new: true, runValidators: true }
      )).to.be.true;
    });

    it('should throw BadRequestError if notes or date is missing', async () => {
      req.body = { notes: '' };

      await expect(updateCity(req, res)).to.be.rejectedWith('Notes or Date fields cannot be empty');
    });
  });

  describe('deleteCity', () => {
    it('should delete a city', async () => {
      req.params.id = 'city1';
      const deletedCity = { _id: 'city1', name: 'Deleted City' };
      sinon.stub(City, 'findOneAndDelete').resolves(deletedCity);

      await deleteCity(req, res);

      expect(statusStub.calledWith(200)).to.be.true;
      expect(jsonStub.calledWith({ message: "City deleted successfully" })).to.be.true;
    });

    it('should throw NotFoundError if city not found', async () => {
      req.params.id = 'nonexistent';
      sinon.stub(City, 'findOneAndDelete').resolves(null);

      await expect(deleteCity(req, res)).to.be.rejectedWith('No city found with ID nonexistent');
    });
  });
});
