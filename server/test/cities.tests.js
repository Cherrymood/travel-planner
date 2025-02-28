import * as chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import sinon from "sinon";
import City from "../models/City.js";
import { getCities, getCity, createCity, updateCity, deleteCity } from "../controllers/getCities.js";

chai.use(chaiHttp);
const { expect } = chai;

const fakeUserId = new mongoose.Types.ObjectId();
const fakeCityId = new mongoose.Types.ObjectId();

const fakeCity = {
  _id: fakeCityId,
  name: "Test City",
  country: "Test Country",
  createdBy: fakeUserId,
};

describe("City Controller", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("should fetch all cities for a user", async () => {
    sinon.stub(City, "find").resolves([fakeCity]);
    
    const req = { user: { userId: fakeUserId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await getCities(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ cities: [fakeCity], count: 1 })).to.be.true;
  });

  it("should fetch a single city by ID", async () => {
    sinon.stub(City, "findOne").resolves(fakeCity);

    const req = { user: { userId: fakeUserId }, params: { id: fakeCityId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await getCity(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ city: fakeCity })).to.be.true;
  });

  it("should create a new city", async () => {
    sinon.stub(City, "create").resolves(fakeCity);

    const req = { body: { name: "New City", createdBy: fakeUserId }, user: { userId: fakeUserId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await createCity(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({ city: fakeCity })).to.be.true;
  });

  it("should update a city", async () => {
    sinon.stub(City, "findByIdAndUpdate").resolves(fakeCity);

    const req = {
      user: { userId: fakeUserId },
      params: { id: fakeCityId },
      body: { notes: "Updated notes", date: "2024-02-26" },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await updateCity(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: "City updated successfully" })).to.be.true;
  });

  it("should delete a city", async () => {
    sinon.stub(City, "findByIdAndDelete").resolves(fakeCity);

    const req = { user: { userId: fakeUserId }, params: { id: fakeCityId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await deleteCity(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: "City deleted successfully" })).to.be.true;
  });

  afterEach(() => {
    sinon.restore();
  });
});
