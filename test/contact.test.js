import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Contact from '../models/contact'; // Adjust the import path to your Contact model

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Contact.deleteMany({});
});

describe('Contact Model Test', () => {
  it('should create & save a new contact successfully', async () => {
    const validContact = new Contact({
      phoneNumber: '1234567890',
      email: 'test@example.com',
    });
    const savedContact = await validContact.save();

    expect(savedContact._id).toBeDefined();
    expect(savedContact.phoneNumber).toBe('1234567890');
    expect(savedContact.email).toBe('test@example.com');
    expect(savedContact.linkPrecedence).toBe('primary');
  });

  it('should not create a contact without required fields', async () => {
    const contactWithoutRequiredField = new Contact({}); // Empty object

    let err;
    try {
      await contactWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should update a contact successfully', async () => {
    const contact = new Contact({
      phoneNumber: '1234567890',
      email: 'test@example.com',
    });
    const savedContact = await contact.save();

    savedContact.phoneNumber = '0987654321';
    const updatedContact = await savedContact.save();

    expect(updatedContact.phoneNumber).toBe('0987654321');
  });

  it('should delete a contact successfully', async () => {
    const contact = new Contact({
      phoneNumber: '1234567890',
      email: 'test@example.com',
    });
    const savedContact = await contact.save();

    await Contact.deleteOne({ _id: savedContact._id });

    const deletedContact = await Contact.findById(savedContact._id);
    expect(deletedContact).toBeNull();
  });
});
