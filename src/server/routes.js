const postPredictHandler = require('../server/handler').postPredictHandler;
const getPredictionHistory = require('../server/handler').getPredictionHistory;

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
    path: '/predict/histories',
    method: 'GET',
    handler: getPredictionHistory, 
  }
];

module.exports = routes;
