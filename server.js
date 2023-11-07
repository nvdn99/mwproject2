const http = require('http');
const { readCarData, writeCarData } = require('./fileOperations');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve an HTML page when accessing the root URL
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Car Management</title>
        </head>
        <body>
          <h1>Welcome to the Car Management System</h1>
          <p>This is a simple demonstration of a car management system.</p>
          <a href="/api/v1/cars">View Cars</a>
        </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  } else if (req.method === 'GET' && req.url === '/api/v1/cars') {
    readCarData((err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error: Could not read car data');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    });

  } else if (req.method === 'POST' && req.url === '/api/v1/cars') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const newCar = JSON.parse(body);
        readCarData((err, cars) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error: Could not read car data');
          } else {
            cars.push(newCar);
            writeCarData(cars, (writeErr) => {
              if (writeErr) {
                console.error(writeErr);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error: Could not write car data');
              } else {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newCar));
              }
            });
          }
        });
      } catch (parseError) {
        console.error(parseError);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
      }
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
