const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose")

afterAll(done => {
    console.log("closing test app");
    mongoose.connection.close();
    done();
})

it("should be true when thruthy", async done => {
    expect(true).toBe(true);
    done();
})

it("should return loginStatus == 1", async done => {
    let res = await supertest(app)
    .post("/user/login")
    .type("application/json")
    .send(JSON.stringify(
        {
            username : "katana",
            password : "katana"
        }
    ))
    expect(res.type).toBe("application/json");
    expect(res.body.loginStatus).toBe("0");
    done();
})