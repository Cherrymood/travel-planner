import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import User from '../models/User.js';
import authentication from '../controllers/authentication.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication', () => {
  let req, res, statusStub, jsonStub;

  beforeEach(() => {
    req = {
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

  it('should return BAD_REQUEST if email or password is missing', async () => {
    await authentication(req, res);

    expect(statusStub.calledWith(StatusCodes.BAD_REQUEST)).to.be.true;
    expect(jsonStub.calledWith({ error: "Email and password are required" })).to.be.true;
  });

  it('should return UNAUTHORIZED if user does not exist and username is not provided', async () => {
    req.body = { email: 'test@example.com', password: 'password123' };
    sinon.stub(User, 'checkExistUser').resolves(null);

    await authentication(req, res);

    expect(statusStub.calledWith(StatusCodes.UNAUTHORIZED)).to.be.true;
    expect(jsonStub.calledWith({ error: "Unauthorized: User is not authenticated." })).to.be.true;
  });

  it('should create a new user if user does not exist and username is provided', async () => {
    req.body = { email: 'test@example.com', password: 'password123', username: 'testuser' };
    sinon.stub(User, 'checkExistUser').resolves(null);
    const createStub = sinon.stub(User, 'create').resolves({
      username: 'testuser',
      createJWT: () => 'faketoken'
    });

    await authentication(req, res);

    expect(statusStub.calledWith(StatusCodes.CREATED)).to.be.true;
    expect(jsonStub.calledWith({ user: { name: 'testuser' }, token: 'faketoken' })).to.be.true;
    expect(createStub.calledOnce).to.be.true;
  });

  it('should return OK with user info if user exists', async () => {
    req.body = { email: 'test@example.com', password: 'password123' };
    sinon.stub(User, 'checkExistUser').resolves({
      username: 'existinguser',
      createJWT: () => 'faketoken'
    });

    await authentication(req, res);

    expect(statusStub.calledWith(StatusCodes.OK)).to.be.true;
    expect(jsonStub.calledWith({ user: { name: 'existinguser' }, token: 'faketoken' })).to.be.true;
  });
});