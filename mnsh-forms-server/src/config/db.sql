CREATE DATABASE mnsh_forms;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userName VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stats(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forms_created INT NOT NULL DEFAULT 0,
  responses INT NOT NULL DEFAULT 0,
  responded_to INT NOT NULL DEFAULT 0,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_title TEXT NOT NULL DEFAULT 'Untitled Form',
  form_description TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  is_private BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE questions(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_title TEXT NOT NULL,
  question_description TEXT,
  question_type VARCHAR(255) NOT NULL,
  question_order INTEGER NOT NULL,
  is_required BOOLEAN NOT NULL,
  choices TEXT[] 
  form_id UUID REFERENCES forms(id) ON DELETE CASCADE
);

-- CREATE TABLE choices(
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   choice_title TEXT NOT NULL,
--   choice_order INTEGER NOT NULL,
--   question_id UUID REFERENCES questions(id) ON DELETE CASCADE
-- );