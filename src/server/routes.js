const postPredictHandler = require('../server/handler').postPredictHandler;
const getPredictionHistoriesHandler = require('../server/handler').getPredictionHistoriesHandler;

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000, 
      }
    }
  },
  {
    method: 'GET',
    path: '/predict/histories',
    handler: getPredictionHistoriesHandler,
},
];

module.exports = routes;
