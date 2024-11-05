import * as chai from 'chai';
import request from 'supertest'; 
import app from '../index.js'; 

const { expect } = chai;

describe('GET /files/data', () => {
    it('debería devolver un JSON con la lista de archivos procesados', (done) => {
        request(app)
            .get('/files/data')
            .end((err, res) => {
                if (err) {
                    console.error("Error en la solicitud:", err);
                    return done(err);
                }
                console.log("Respuesta del servidor:", res.body); 
                expect(res.status).to.equal(200);
                expect(res.type).to.equal('application/json');
                expect(res.body).to.be.an('array');
                done();
            });
    });
});
