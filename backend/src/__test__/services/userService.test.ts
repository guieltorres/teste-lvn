import supertest from "supertest";
import createServer from "../../utils/createServer";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { userService } from "../../services/userService";
import jwt from "jsonwebtoken";
import { Chance } from "chance";
import { secretKey } from "../../constants/secret";
import { AuthErrorMessage } from "../../enums/authErrorMessage";
import { UserSuccessMessage } from "../../enums/userSuccessMessage";
import { UserErrorMessage } from "../../enums/userErrorMessage";

const app = createServer();

const chance = new Chance();

const userPayload = {
  name: "Test User",
  email: chance.email(),
  age: 20,
  addresses: [
    {
      street: "123 Test St",
      city: "Test City",
      state: "TS",
      zip: "12345",
      country: "Test Country",
    },
  ],
  username: chance.word(),
  password: "password",
};

describe("userService", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    userPayload.username = chance.word();
    userPayload.email = chance.email();
  });

  describe("get user", () => {
    it("should return a user when a valid userId is provided", async () => {
      const user = await userService.createUser(userPayload);
      const token = jwt.sign({ userId: user._id.toString() }, secretKey, {
        expiresIn: "1h",
      });

      const { body, statusCode } = await supertest(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body._id).toBe(user._id.toString());
    });

    it("should throw an invalid error when an invalid userId is provided", async () => {
      const wrongUserId = chance.word();
      const token = jwt.sign({ userId: wrongUserId }, secretKey, {
        expiresIn: "1h",
      });

      const { body, statusCode } = await supertest(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toBe(401);
      expect(body.error).toBe(AuthErrorMessage.INVALID_TOKEN);
    });
  });

  describe("updateUser", () => {
    it("should update a user when a valid userId is provided", async () => {
      const user = await userService.createUser(userPayload);
      const token = jwt.sign({ userId: user._id.toString() }, secretKey, {
        expiresIn: "1h",
      });

      const updatedUserPayload = {
        name: "Updated User",
        age: 25,
      };

      const { body, statusCode } = await supertest(app)
        .patch("/api/user")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedUserPayload);

      expect(statusCode).toBe(200);
      expect(body.user.name).toBe(updatedUserPayload.name);
      expect(body.user.age).toBe(updatedUserPayload.age);
    });

    it("should throw an invalid error when an invalid userId is provided", async () => {
      const wrongUserId = chance.word();
      const token = jwt.sign({ userId: wrongUserId }, secretKey, {
        expiresIn: "1h",
      });

      const updatedUserPayload = { name: "Updated User", age: 25 };

      const { body, statusCode } = await supertest(app)
        .patch("/api/user")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedUserPayload);

      expect(statusCode).toBe(401);
      expect(body.error).toBe(AuthErrorMessage.INVALID_TOKEN);
    });

    it("should throw a error when update to a existing email", async () => {
      const user1 = await userService.createUser(userPayload);

      const user2 = await userService.createUser({
        ...userPayload,
        email: chance.email(),
        username: chance.word(),
      });

      const token = jwt.sign({ userId: user1._id.toString() }, secretKey, {
        expiresIn: "1h",
      });

      const updatedUserPayload = {
        email: user2.email,
      };

      const { body, statusCode } = await supertest(app)
        .patch("/api/user")
        .set("Authorization", `Bearer ${token}`)
        .send(updatedUserPayload);

      expect(statusCode).toBe(401);
      expect(body.error).toBe(UserErrorMessage.EMAIL_ALREADY_IN_USE);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user when a valid userId is provided", async () => {
      const user = await userService.createUser(userPayload);
      const token = jwt.sign({ userId: user._id.toString() }, secretKey, {
        expiresIn: "1h",
      });

      const { body, statusCode } = await supertest(app)
        .delete("/api/user")
        .set("Authorization", `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body.message).toBe(UserSuccessMessage.USER_DELETED);
    });
  });
});
