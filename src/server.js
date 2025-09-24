const viewApp = require('./view-app');
const apiApp = require('./api-app');

const viewPort = 3000||process.env.VIEW_PORT; // Port for the view app
const apiPort = 8080||process.env.API_PORT; // Port for the API app

// Start the view app server
viewApp.listen(viewPort, () => {
  console.log(`View app is running on port ${viewPort}`);
});

// Start the API app server
apiApp.listen(apiPort, () => {
  console.log(`API app is running on port ${apiPort}`);
});
