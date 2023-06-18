import { app } from '../../../app';
import request from 'supertest'
import { apartmentType, room } from '../../models/roomSpec';


it('should create an apartment', async () => {
  const apartment = await global.createApartment()

  const res = await request(app)
    .delete(`/api/apartments/delete/${apartment._id}`)
    .set('Cookie', global.signin('admin'))
    .expect(200)
})