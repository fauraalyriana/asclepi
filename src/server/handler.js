const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const { Firestore } = require('@google-cloud/firestore');

async function postPredictHandler(request, h) {
    const { image } = request.payload; 
    const { model } = request.server.app; 

    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        id,
        result: label,
        suggestion,
        createdAt
    };

    await storeData(id, data);
    
    const response = h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data
    });

    response.code(201);
    return response;
} 

const firestore = new Firestore();

async function getPredictionHistoriesHandler(request, h) {
    try {
      const snapshot = await firestore.collection('predictions').get();
  
      if (snapshot.empty) {
        return h.response({
          status: 'success',
          data: [],
        }).code(200);
      }
  
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        history: doc.data(),
      }));
  
      return h.response({
        status: 'success',
        data,
      }).code(200);
    } catch (error) {
      console.error('Error fetching prediction histories:', error);
      return h.response({
        status: 'fail',
        message: 'Terjadi kesalahan saat mengambil riwayat prediksi.',
      }).code(500);
    }
  }

module.exports = { postPredictHandler, getPredictionHistoriesHandler };

