import chai, { expect, should } from "chai";
import chaiHttp from "chai-http";

import { describe, it } from "mocha";
import app from "../app.js";
chai.use(chaiHttp);

let password = "13023";
let username = "3442f8959a84dea7ee197c632cb2df15";
let basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

describe('User', () => {
    it("It should return Unauthorized", (done) => {
        chai.request(app)
        .get('/api/v1/account')
        .end((err, res) => {
            expect(res).to.have.status(401);
            done();
        })
    })

    it("It should return User Profile", (done) => {
     
        chai.request(app)
        .get('/api/v1/account')
        .set('Authorization', basicAuth)
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    })
})


describe("Order Items", () => {
    it("Should return User Orders", (done) => {
        
        chai.request(app)
        .get('/api/v1/order_items')
        .set('Authorization', basicAuth)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            done();
        })
    })
})


describe("Products", () => {
    it("Should return Products", (done) => {
        
        chai.request(app)
        .get('/api/v1/products')
        // .set('Authorization', basicAuth)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            done();
        })
    })
})
after((done) => {
    console.log('Finished');
    process.exit();
})