CREATE DATABASE jobapps;

CREATE TABLE application (
    jobapp_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    picturelink varchar(255),
    extrainfo varchar(MAX),
    date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);