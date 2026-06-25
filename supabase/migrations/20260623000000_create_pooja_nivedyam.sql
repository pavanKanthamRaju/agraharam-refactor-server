CREATE TABLE IF NOT EXISTS pooja_nivedyam (
  id SERIAL PRIMARY KEY,
  pooja_id INTEGER REFERENCES poojas(id) ON DELETE CASCADE,
  nivedyam_id INTEGER REFERENCES nivedyam(id) ON DELETE CASCADE,
  price NUMERIC NOT NULL,
  quantity TEXT,
  units VARCHAR(50)
);
