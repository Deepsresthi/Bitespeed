import Contact from '../models/contact.js';

export const identifyContact = async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res
      .status(400)
      .json({ error: 'Either email or phoneNumber is required' });
  }

  const contacts = await Contact.find({
    $or: [{ email }, { phoneNumber }],
  });

  if (contacts.length === 0) {
    const newContact = new Contact({
      email,
      phoneNumber,
      linkPrecedence: 'primary',
    });

    await newContact.save();

    return res.json({
      contact: {
        primaryContatctId: newContact.id,
        emails: [newContact.email],
        phoneNumbers: [newContact.phoneNumber],
        secondaryContactIds: [],
      },
    });
  }

  let primaryContact = contacts.find(
    (contact) => contact.linkPrecedence === 'primary',
  );
  if (!primaryContact) {
    primaryContact = contacts[0];
    primaryContact.linkPrecedence = 'primary';
    await primaryContact.save();
  }

  const secondaryContacts = contacts.filter(
    (contact) => contact.id !== primaryContact.id,
  );
  const newSecondaryContact = new Contact({
    email,
    phoneNumber,
    linkedId: primaryContact.id,
    linkPrecedence: 'secondary',
  });

  await newSecondaryContact.save();

  primaryContact.updatedAt = new Date();
  await primaryContact.save();

  const response = {
    primaryContatctId: primaryContact.id,
    emails: Array.from(
      new Set(
        [
          primaryContact.email,
          ...secondaryContacts.map((c) => c.email),
          email,
        ].filter(Boolean),
      ),
    ),
    phoneNumbers: Array.from(
      new Set(
        [
          primaryContact.phoneNumber,
          ...secondaryContacts.map((c) => c.phoneNumber),
          phoneNumber,
        ].filter(Boolean),
      ),
    ),
    secondaryContactIds: [
      newSecondaryContact.id,
      ...secondaryContacts.map((c) => c.id),
    ],
  };

  res.json({ contact: response });
};
