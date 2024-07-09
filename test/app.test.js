import request from 'supertest';
import app from '../app.js'; // Ensure the correct path to your app file

describe('POST /identify', () => {
  it('should create a new contact and return the consolidated contact', async () => {
    const response = await request(app)
      .post('/identify')
      .send({ email: 'newuser@example.com', phoneNumber: '1234567890' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('contact');
    expect(response.body.contact).toHaveProperty('primaryContatctId');
    expect(response.body.contact.emails).toContain('newuser@example.com');
    expect(response.body.contact.phoneNumbers).toContain('1234567890');
    expect(response.body.contact.secondaryContactIds).toEqual([]);
  });

  it('should link an existing contact and return the consolidated contact', async () => {
    // Assuming you have a contact in your database with email: 'existing@example.com' and phoneNumber: '9876543210'
    const response = await request(app)
      .post('/identify')
      .send({ email: 'existing@example.com', phoneNumber: '9876543210' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('contact');
    expect(response.body.contact).toHaveProperty('primaryContatctId');
    expect(response.body.contact.emails).toContain('existing@example.com');
    expect(response.body.contact.phoneNumbers).toContain('9876543210');
    expect(response.body.contact.secondaryContactIds.length).toBeGreaterThan(0);
  });

  it('should link multiple existing contacts and return the consolidated contact', async () => {
    // Assuming you have multiple contacts with overlapping email and phoneNumber
    const response = await request(app)
      .post('/identify')
      .send({ email: 'overlap@example.com', phoneNumber: '5555555555' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('contact');
    expect(response.body.contact).toHaveProperty('primaryContatctId');
    expect(response.body.contact.emails).toContain('overlap@example.com');
    expect(response.body.contact.phoneNumbers).toContain('5555555555');
    expect(response.body.contact.secondaryContactIds.length).toBeGreaterThan(0);
  });
});
