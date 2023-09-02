CREATE DATABASE jobapps;

CREATE TABLE application (
    jobapp_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    picturelink VARCHAR(255),
    extrainfo TEXT,
    date_applied DATE DEFAULT CURRENT_DATE
);