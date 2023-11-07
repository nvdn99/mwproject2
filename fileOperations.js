const fs = require('fs');
const path = require('path');

const carDataFilePath = path.join(__dirname, 'carData.json');

function readCarData(callback) {
  fs.readFile(carDataFilePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      try {
        const cars = JSON.parse(data);
        callback(null, cars);
      } catch (parseError) {
        callback(parseError, null);
      }
    }
  });
}

function writeCarData(cars, callback) {
  const jsonData = JSON.stringify(cars);
  fs.writeFile(carDataFilePath, jsonData, 'utf8', (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
}

module.exports = { readCarData, writeCarData };

