# API Documentation

## Identify Contact

### POST /identify

Identifies or creates a contact based on provided email or phone number.

#### Request Body

```json
{
  "email": "user@example.com"
  "phoneNumber: "99994048920"
}
```

#### Response

1. 200 OK

```json
{
  "contact": {
    "primaryContatctId": "6150a1b02f1e0f001e34389d",
    "emails": ["test@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
```

1. 400 Bad Request

```json
{
  "error": "Either email or phoneNumber is required"
}
```

This documentation outlines how the API works, what it expects in terms of input, and what users can expect in terms of output. Adjust the endpoint path (/identify) and any other specific details as per your project setup.
