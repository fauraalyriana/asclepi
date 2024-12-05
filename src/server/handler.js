const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

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

let predictionHistory = [];  // Tempat menyimpan riwayat prediksi

// Fungsi untuk mendapatkan riwayat prediksi
async function getPredictionHistory(request, h) {
    try {
        if (predictionHistory.length === 0) {
            return h.response({
                status: 'success',
                message: 'Tidak ada riwayat prediksi',
                data: []
            }).code(200);
        }

        return h.response({
            status: 'success',
            data: predictionHistory
        }).code(200);
    } catch (error) {
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam mengambil riwayat prediksi',
        }).code(500);
    }
}

module.exports = { postPredictHandler, getPredictionHistory };

