let ObjectID = require('bson-objectid');

export default function generateRandomString() {
  const id = ObjectID();
  return id.toString();
}
