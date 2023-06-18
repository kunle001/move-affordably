import { app } from '../../../app';
import request from 'supertest'
import { apartmentType, room } from '../../models/roomSpec';


it('should create an apartment', async () => {
  const res = await request(app)
    .post('/api/apartments/create')
    .set('Cookie', global.signin('admin'))
    .send({
      location: 'abc',
      checkpoints: ['ikeja'],
      annualPackage: 300000,
      totalPackage: 700000,
      distanceFromCheckPoints: [30],
      landlordSpecs: 'female',
      roomCategory: room.Small,
      apartmentType: apartmentType['Three Bedroom Flat']
    })
    .expect(201)
})