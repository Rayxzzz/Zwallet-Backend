const chai = require('chai');
const chaiHttp = require('chai-http');
const { equal } = require('should');
const app = require('../index');
const expect = chai.expect
chai.use(chaiHttp);
chai.should()

let TOKEN


describe("Login /POST", () => {
    const data = {
        email: 'rayyy@gmail.com',
        password: '123'
    }
    it("expect output", (done) => {
        chai.request(app)
            .post(`/auth/login`)
            .send(data)
            .end((err, res, req) => {
                TOKEN = res.body.data[0].token
                // console.log(res.body)
                expect(res.body).to.have.property('status')
                expect(res.body).to.have.property('data')
                expect(res.body).to.have.property('code')
                expect(res.body).to.have.property('message')
                done()
            })
    })
    it("should return 401 when failed to login", (done) => {
        chai.request(app)
            .post(`/auth/login`)
            .send(data)
            .end((err, res, req) => {
                expect(res).to.have.status(401)
                done()
            })
    })
    it("expect type data object", (done) => {
        chai.request(app)
            .post(`/auth/login`)
            .send(data)
            .end((err, res, req) => {
                expect(res.body).to.be.a('object')
                done()
            })
    })
})

describe("List User /GET", () => {
    it("expect 500 when query less than 1", (done) => {
        const req = chai.request(app).get('/admin/users-list')
        chai.request(app)
            .get("/admin/users-list")
            .set({ Authorization: `Bearer ${TOKEN}` })
            .query({ page: -1, lmit: 4 })
            .end((err, res) => {
                expect(res.status).equal(500)
                done()
            })
    })
})

describe("Delete User  /DELETE", () => {
    const id = 335;
    it("expect failed when data empty", (done) => {
        chai.request(app)
            .delete(`/admin/users/delete/${id}`)
            .set({ Authorization: `Bearer ${TOKEN}` })
            .end((err, res) => {
                // console.log(TOKEN)
                // console.log(res.body)
                expect(res.body.data).to.be.empty;
                // expect(res.body).to.have.property('status')
                done()
            })
    })
})

describe("Top-Up /PUT", () => {
    const id = 764;
    it("expect output success top-up", (done) => {
        chai.request(app)
            .put(`/user/${id}/top-up`)
            .set({ Authorization: `Bearer ${TOKEN}` })
            .send({
                balance: 1000
            })
            .end((err, res) => {
                // console.log(TOKEN)
                expect(res.body.message).equal('success top-up')
                done()
            })
    })
})