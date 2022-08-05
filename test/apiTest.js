import  chai from "chai";
import chaiHttp from "chai-http";
let server = "http://localhost:4000";

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('API TEST ', () => {

    /**
     * Test the GET route
     */
    describe("GET /users", () => {
        it("GET isteği bunları sağlamalı", (done) => {
            chai.request(server)
                .get("/users")
                .end((err, response) => {
                    response.should.have.status(200);
                   
                done();
                });
        });

        it("GET isteğinde sorun olursa bunları sağlamalı", (done) => {
            chai.request(server)
                .get("/user")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });


    /**
     * Test the GET (by id) route
     */
    describe("GET /users/:id", () => {
        it("GET BY ID isteği bunları sağlamalı", (done) => {
            const taskId = "71e7bd3ca9cb4a444454a69c";  
            chai.request(server)                
                .get("/users/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('FirstName');
                    response.body.should.have.property('LastName');
                    response.body.should.have.property('UserName');
                    response.body.should.have.property('Email');
                done();
                });
        });

        it("GET BY ID isteğinde sorun olursa bunları sağlamalı", (done) => {
            const taskId = "71e7bd3ca9cb4a444454a69cc"; 
            chai.request(server)                
                .get("/users/" + taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });

    });
    

    /**
     * Test the POST route
     */
    describe("POST /users", () => {
        it("POST isteği bunları sağlamalı", (done) => {
            const task = {
                "Audit": {
                    "CreationDate": "2022-08-01T14:55:00.000Z",
                    "CreationUser": "seda",
                    "LastUpdateDate": "2022-08-01T14:59:00.000Z",
                    "LastUpdateUser": "seda"
                },
                "_id": "89e7bd3ca9cb4a444454a69c",
                "FirstName": "Seda post 5",
                "LastName": "Şimşek post 5",
                "UserName": "sedasimsek post 5",
                "Email": "sdsmsdsm.post5@gmail.com",
                "Birthdate": "2016-05-18T16:00:00.000Z",
                "Password": "Seda12345",
                "LastConnectionDate": "2022-08-01T14:55:00.000Z",
                "__v": 0
            };
            chai.request(server)                
                .post("/users")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('msg').eq("Kayıt ,Mesaj ve Mail İşleminiz Başarılı.");
                done();
                });
        });

        it("POST isteğinde sorun olursa bunları sağlamalı", (done) => {
            const task = {
                "_id": "89e7bd3ca9cb4a444454a69c",
                "FirstName": "Seda post 5",
                "LastName": "Şimşek post 5",
                "UserName": "sedasimsek post 5",
                "Email": "sdsmsdsm.post5@gmail.com",
                "Birthdate": "2016-05-18T16:00:00.000Z",
                "Password": "Seda12345",
                "LastConnectionDate": "2022-08-01T14:55:00.000Z",
                "__v": 0
            };
            chai.request(server)                
                .post("/users")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(409);
                done();
                });
        });

    });
    

    /**
     * Test the PATCH route
     */

    describe("PATCH /users/:id", () => {
        it("UPDATE isteği bunları sağlamalı", (done) => {
            const taskId = "81e7bd3ca9cb4a444454a69c";
            const task = {
                "FirstName": "Seda update yaptı 3",
            };
            chai.request(server)                
                .patch("/users/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                });
        });

        it("UPDATE isteğinde sorun olursa bunları sağlamalı", (done) => {
            const taskId = "81e7bd3ca9cb4a444454a69c"; 
            const task =  {
                "Audit": {
                    "CreationDate": "2022-08-01T14:55:00.000Z",
                    "CreationUser": "seda",
                    "LastUpdateDate": "2022-08-01T14:59:00.000Z",
                    "LastUpdateUser": "seda"
                },
                "_id": "71e7bd3ca9cb4a444454a69c",
                "FirstName": "Sedaaaaa",
                "LastName": "Şimşekkkkkk",
                "UserName": "sedasimsekkkkkk",
                "Email": "sdsmsdsm.22111111@gmail.com",
                "Birthdate": "2016-05-18T16:00:00.000Z",
                "Password": "Seda12345",
                "LastConnectionDate": "2022-08-01T14:55:00.000Z",
                "__v": 0
            };
            chai.request(server)                
                .patch("/users/" + taskId)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(409);
                done();
                });
        });        
    });
    

    /**
     * Test the DELETE route
     */
    describe("DELETE /users/:id", () => {
        it("DELETE isteği bunları sağlamalı", (done) => {
            const taskId = "88e7bd3ca9cb4a444454a69c"; 
            chai.request(server)                
                .delete("/users/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("DELETE isteğinde sorun olursa bunları sağlamalı", (done) => {
            const taskId ="88e7bd3ca9cb4a444454a69cc";  
            chai.request(server)                
                .delete("/users/" + taskId)
                .end((err, response) => {
                    response.should.have.status(409);
                done();
                });
        });

    });




});

