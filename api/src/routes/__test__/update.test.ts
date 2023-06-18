import { app } from '../../../app';
import request from 'supertest'
import { apartmentType, room } from '../../models/roomSpec';


it('should create an apartment', async () => {
  const apartment = await global.createApartment()

  const res = await request(app)
    .patch(`/api/apartments/update/${apartment._id}`)
    .set('Cookie', global.signin('admin'))
    .send({
      annualPackage: 700000,
    })
    .expect(200)
})