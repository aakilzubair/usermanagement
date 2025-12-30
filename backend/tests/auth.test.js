process.env.JWT_SECRET = "test_jwt_secret";
process.env.JWT_EXPIRES_IN = "1d";

const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../src/app");
const User = require("../src/models/User");

let mongoServer;

describe("Auth APIs", () => {

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  /* Signup */
  it("should signup a user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "test@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  /*  Login success */
  it("should login user with correct credentials", async () => {
    const hashed = await bcrypt.hash("password123", 10);

    await User.create({
      fullName: "Test User",
      email: "test@test.com",
      password: hashed,
      status: "active",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  /* Wrong password */
  it("should fail login with wrong password", async () => {
    const hashed = await bcrypt.hash("password123", 10);

    await User.create({
      fullName: "Test User",
      email: "test@test.com",
      password: hashed,
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "wrongpass",
      });

    expect(res.statusCode).toBe(401);
  });

  /*  Inactive user blocked */
  it("should block inactive user", async () => {
    const hashed = await bcrypt.hash("password123", 10);

    await User.create({
      fullName: "Inactive User",
      email: "inactive@test.com",
      password: hashed,
      status: "inactive",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "inactive@test.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(403);
  });

  /* Change password */
  it("should change password successfully", async () => {
    const hashed = await bcrypt.hash("password123", 10);

    await User.create({
      fullName: "Test User",
      email: "test@test.com",
      password: hashed,
      status: "active",
    });

    const login = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "password123",
      });

    const token = login.body.token;

    const res = await request(app)
      .put("/api/auth/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: "password123",
        newPassword: "newpass123",
      });

    expect(res.statusCode).toBe(200);
  });

});
