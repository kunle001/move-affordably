import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { ConnectOptions } from 'mongoose';
import { app } from '../../app';
import request, { Response } from 'supertest'
import jwt from 'jsonwebtoken';
import { Apartment } from '../models/apartment';
import { room, apartmentType } from '../models/roomSpec';

declare global {
  var signin: (role?: string) => string[]
}

declare global {
  var createApartment: () => Promise<mongoose.Document>
}


let mongo: any

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  await mongo.start()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
});


beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany()
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();

});

global.signin = (role?: string) => {
  let id = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id,
    email: 'test@test.com',
    role: undefined || role
  };
  //  Create the JWT 

  const token = jwt.sign(payload, process.env.JWT_KEY! || 'thisismykey');

  // Build Session object
  const session = { jwt: token }

  // Turn session to json
  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //  return a string thats the cookie with encoded data

  return [`secretoken=${token}`]

};

global.createApartment = async () => {

  const apartment = Apartment.build({
    location: 'abc',
    checkpoints: ['ikeja'],
    annualPackage: 300000,
    totalPackage: 700000,
    distanceFromCheckPoints: [30],
    landlordSpecs: 'female',
    roomCategory: room.Small,
    apartmentType: apartmentType['Three Bedroom Flat']
  });

  await apartment.save()
  return apartment

}

