-- TABLES & SEQUENCES
CREATE TABLE "company" (
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR NOT NULL UNIQUE,
    "hostname" VARCHAR NOT NULL UNIQUE,
    "created" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE SEQUENCE company_sequence
	START WITH	1000110010000000000
	MAXVALUE	1000110019999999999
	INCREMENT BY 50 CACHE 1 NO CYCLE;

CREATE TABLE "users" (
  "id" BIGSERIAL NOT NULL PRIMARY KEY,
  "company_id" BIGSERIAL NOT NULL REFERENCES company (id),
  "username" VARCHAR NOT NULL,
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL, 
  "email" VARCHAR NOT NULL UNIQUE,
  "password" VARCHAR NOT NULL,
  "supervisor_id" BIGINT REFERENCES users (id),
  "created" TIMESTAMPTZ NOT NULL DEFAULT now(),
   UNIQUE (username, company_id)
);

CREATE SEQUENCE user_sequence
	START WITH	1000110030000000000
	MAXVALUE	1000110039999999999
	INCREMENT BY 50 CACHE 1 NO CYCLE;

CREATE TABLE "roles" (
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "is_user" BOOLEAN NOT NULL,
    "is_supervisor" BOOLEAN NOT NULL,
    "is_admin" BOOLEAN NOT NULL
);

CREATE SEQUENCE role_sequence
	START WITH	1000110140000000000
	MAXVALUE	1000110149999999999
	INCREMENT BY 50 CACHE 1 NO CYCLE;

CREATE TABLE "user_roles" (
    "company_id" BIGSERIAL NOT NULL REFERENCES company (id),
    "user_id" BIGSERIAL NOT NULL REFERENCES users (id),
    "role_id" BIGSERIAL NOT NULL REFERENCES roles (id),
    "created" TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (company_id, user_id, role_id)
);

CREATE TABLE "customer_feedback" (
    "id" BIGSERIAL NOT NULL PRIMARY KEY,
    "user_id" BIGSERIAL NOT NULL REFERENCES users (id),
    "company_id" BIGSERIAL NOT NULL REFERENCES company (id),
    "rating" INTEGER NOT NULL,
    "like" TEXT NOT NULL,
    "dislike" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "created" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE SEQUENCE feedback_sequence
	START WITH	1000110970000000000
	MAXVALUE	1000110979999999999
	INCREMENT BY 50 CACHE 1 NO CYCLE;

-- DATA
INSERT INTO roles (id, name, is_user, is_supervisor, is_admin) VALUES (nextval('role_sequence'), 'User', TRUE, FALSE, FALSE);
INSERT INTO roles (id, name, is_user, is_supervisor, is_admin) VALUES (nextval('role_sequence'), 'Supervisor', FALSE, TRUE, FALSE);
INSERT INTO roles (id, name, is_user, is_supervisor, is_admin) VALUES (nextval('role_sequence'), 'Admin', FALSE, FALSE, TRUE);