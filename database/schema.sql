CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(255),
  role VARCHAR(20)
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  sender VARCHAR(50),
  receiver VARCHAR(50),
  amount DECIMAL,
  note TEXT
);