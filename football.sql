CREATE DATABASE football;
USE football;
CREATE TABLE teams (
    id INT AUTO_INCREMENT,
    location VARCHAR(255),
    mascot VARCHAR(255),
    abbreviation VARCHAR(255),
    conference ENUM('AFC', 'NFC'),
    division ENUM('North', 'South', 'East', 'West'),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME DEFAULT NOW(),
    PRIMARY KEY(id)
);