const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');

 
  if (req.url === '/') {
    res.end(`
      <html>
        <head>
          <title>Choose a Color</title>
        </head>
        <body>
          <h1>Select Your Favorite Color</h1>
          <form action="/submit" method="POST">
            <select name="color">
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
  } 

  else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';

   
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const color = new URLSearchParams(body).get('color');
      res.end(`
        <html>
          <head>
            <title>Your Color</title>
            <style>
              body { background-color: ${color}; }
            </style>
          </head>
          <body>
            <h1>Your favorite color is ${color}</h1>
            <a href="/">Go Back</a>
          </body>
        </html>
      `);
    });
  } 
 
  else {
    res.end(`
      <h1>404 Not Found</h1>
      <p>Page not found.</p>
      <a href="/">Back home</a>
    `);
  }
});


server.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});
