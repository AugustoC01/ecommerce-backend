const config = {
  type: process.env.FirebaseType,
  project_id: process.env.FirebaseProject_id,
  private_key_id: process.env.FirebasePrivate_key_id,
  private_key: JSON.parse(process.env.FirebasePrivate_key),
  client_email: process.env.FirebaseClient_email,
  client_id: process.env.FirebaseClient_id,
  auth_uri: process.env.FirebaseAuth_uri,
  token_uri: process.env.FirebaseToken_uri,
  auth_provider_x509_cert_url: process.env.FirebaseAuth_provider_x509_cert_url,
  client_x509_cert_url: process.env.FirebaseClient_x509_cert_url,
};

const MONGO_URL = process.env.MONGO_URL;

module.exports = { config, MONGO_URL };
