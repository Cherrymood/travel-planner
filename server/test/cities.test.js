// test/cities.test.js
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import City from '../models/City.js'

chai.use(chaiHttp);
const { expect } = chai;

describe('Cities API', () => {
  before(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/test_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Drop the test database and close the connection
    await City.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/app/cities', () => {
    it('should get all cities', async () => {
      const res = await chai.request(app).get('/api/app/cities');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('cities').that.is.an('array');
      expect(res.body).to.have.property('count').that.is.a('number');
    });
  });

  describe('POST /api/app/cities', () => {
    it('should create a new city', async () => {
      const newCity = { name: 'Los Angeles', notes: 'A city in California', date: '2023-01-01' };
      const res = await chai.request(app).post('/api/app/cities').send(newCity);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('city').that.is.an('object');
      expect(res.body.city).to.have.property('name').that.equals('Los Angeles');
    });
  });

  describe('GET /api/app/cities:id', () => {
    let cityId;

    before(async () => {
      const city = await City.create({ name: 'New York', notes: 'A city in New York', date: '2023-01-01' });
      cityId = city._id;
    });

    it('should get a city by ID', async () => {
      const res = await chai.request(app).get(`/api/app/cities${cityId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('city').that.is.an('object');
      expect(res.body.city).to.have.property('name').that.equals('New York');
    });
  });

  describe('PATCH /api/app/cities:id', () => {
    let cityId;

    before(async () => {
      const city = await City.create({ name: 'Chicago', notes: 'A city in Illinois', date: '2023-01-01' });
      cityId = city._id;
    });

    it('should update a city', async () => {
      const updatedCity = { notes: 'Updated notes', date: '2023-01-02' };
      const res = await chai.request(app).patch(`/api/app/cities${cityId}`).send(updatedCity);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').that.equals('City updated successfully');
    });
  });

  describe('DELETE /api/app/cities:id', () => {
    let cityId;

    before(async () => {
      const city = await City.create({ name: 'Seattle', notes: 'A city in Washington', date: '2023-01-01' });
      cityId = city._id;
    });

    it('should delete a city', async () => {
      const res = await chai.request(app).delete(`/api/app/cities${cityId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message').that.equals('City deleted successfully');
    });
  });
});
