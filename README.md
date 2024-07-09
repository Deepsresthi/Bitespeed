# Sukasa Air

## Running the code

- Have a mongo server running
- Create `.env` file at root, add below variables

```
MONGODB_URI=mongodb://localhost:27017/bitespeed
```

- to run
  - `npm install`
  - `npm run`

## Code Structure

```
sukasa-air/
├── src/
│ ├── controllers/
│ │ ├── identifyController.js
│ ├── models/
│ │ ├── contact.js
│ ├── routes/
│ │ ├── identify.ts
│ ├── tests/
│ │ ├── app.test.js
│ │ ├── contact.test.ts
│ ├── app.js
├── .babelrc
├── .prettierrc
├── package.json
└── jest.config.js
```

## Data Model Descriptions

### Contact

A contact represents an entity storing contact information. Here are the properties of a contact:

- `phoneNumber`: The phone number associated with the contact.
- `email`: The email address associated with the contact.
- `linkedId`: A reference to another Contact document, representing a linked contact.
- `linkPrecedence`: Specifies the precedence of the contact link, either 'primary' or 'secondary'.
- `createdAt`: The date and time when the contact record was created.
- `updatedAt`: The date and time when the contact record was last updated.
- `deletedAt`: Optional. Date and time indicating when the contact record was deleted.


## API Documentation

[API Documentation](APIs.md)

## Tests

- run `npm run test` to run tests
- run `npm run test:coverage` to get coverage report
- Test Coverage [Report](coverage/lcov-report/index.html)
