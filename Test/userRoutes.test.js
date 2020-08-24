const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const user = require("../Model/User");
let res;

afterAll(done => {
    console.log("closing test app");
    user.deleteMany({username : "dummy"}, (err,deletedDoc) => {
        if(err) throw err;
    })
    .then(() => {
        mongoose.connection.close();
    })
    done();
})

it("should be true when thruthy", async done => {
    expect(true).toBe(true);
    done();
})

it("should create a user with username katana", async done => {
    res = await supertest(app)
    .post("/api/user/create")
    .type("application/json")
    .send(JSON.stringify(
        {
            username : "dummy",
            email : "dummy",
            password : "dummy"
        }
    ))
    expect(res.type).toBe("application/json");
    expect(res.body.loginStatus).toBe(true);
    done();
})

it("should return loginStatus == 1", async done => {
    res = await supertest(app)
    .post("/api/user/login")
    .type("application/json")
    .send(JSON.stringify(
        {
            username : "dummy",
            password : "dummy"
        }
    ))
    expect(res.type).toBe("application/json");
    expect(res.body.loginStatus).toBe(true);
    done();
})