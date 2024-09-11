import supertest from "supertest";
import createServer from "../../utils/createServer";
import { userService } from "../../services/userService";
import { authService } from "../../services/authService";
import { UserStatus } from "../../enums/userStatus";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthErrorMessage } from "../../enums/authErrorMessage";
import { AuthSuccessMessage } from "../../enums/authSuccessMessage";

const app = createServer();

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const bcryptCompare = jest.fn().mockRejectedValue(new Error("Random error"));
(bcrypt.compare as jest.Mock) = bcryptCompare;

describe("authService", () => {
  describe("registration route", () => {
    const authData = {
      name: "Test User",
      email: "test@email.com",
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
      username: "testuser",
      password: "password",
    };

    it("should create a user when valid data is provided", async () => {
      const mockUser = {
        _id: "123",
        name: "Test User",
        email: "test@email.com",
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
        username: "testuser",
        password: "password",
        status: UserStatus.ACTIVE,
      };

      jest.spyOn(userService, "createUser").mockResolvedValue(mockUser as any);

      const result = await authService.register(authData);

      expect(result).toEqual(mockUser);
      expect(userService.createUser).toHaveBeenCalledWith(authData);

      const { body, statusCode } = await supertest(app)
        .post("/api/register")
        .send(authData);

      expect(body).toEqual({
        message: AuthSuccessMessage.REGISTRATION_SUCCESS,
      });
      expect(statusCode).toBe(201);
    });

    it("should throw an error if the user already exists", async () => {
      const error = new Error("User already exists.");

      jest.spyOn(userService, "createUser").mockRejectedValue(error);

      await expect(authService.register(authData)).rejects.toThrow(
        "User already exists."
      );

      const { body, statusCode } = await supertest(app)
        .post("/api/register")
        .send(authData);

      expect(body).toEqual({ error: "User already exists." });
      expect(statusCode).toBe(400);
    });
  });

  describe("login route", () => {
    it("should return a token with valid credentials", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        password: "hashedpassword",
        status: UserStatus.ACTIVE,
        addresses: [],
        email: "test@email.com",
        name: "Test User",
        age: 20,
      };
      jest
        .spyOn(userService, "findUserByUsername")
        .mockResolvedValue(mockUser as any);
      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
      jest.spyOn(jwt, "sign").mockReturnValue("mockToken" as any);

      const result = await authService.login("testuser", "password");

      expect(result).toEqual({ token: "mockToken" });

      expect(userService.findUserByUsername).toHaveBeenCalledWith(
        mockUser.username
      );
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedpassword");
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id },
        expect.any(String),
        { expiresIn: "1h" }
      );

      const { body, statusCode } = await supertest(app)
        .post("/api/login")
        .send({ username: "testuser", password: "password" });

      expect(body).toEqual({ token: "mockToken" });
      expect(statusCode).toBe(200);
    });

    it("should throw an error if the user is inactive", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        password: "password",
        status: UserStatus.INACTIVE,
        addresses: [],
        email: "test@email.com",
        name: "Test User",
        age: 20,
      };

      jest
        .spyOn(userService, "findUserByUsername")
        .mockResolvedValue(mockUser as any);

      await expect(authService.login("testuser", "password")).rejects.toThrow(
        AuthErrorMessage.ACCOUNT_INACTIVE
      );

      const { body, statusCode } = await supertest(app)
        .post("/api/login")
        .send({ username: "testuser", password: "password" });

      expect(body).toEqual({ error: AuthErrorMessage.ACCOUNT_INACTIVE });
      expect(statusCode).toBe(403);
    });

    it("should throw an error if the password is incorrect", async () => {
      const mockUser = {
        _id: "123",
        username: "testuser",
        password: "password",
        status: UserStatus.ACTIVE,
        addresses: [],
        email: "test@email.com",
        name: "Test User",
        age: 20,
      };
      jest
        .spyOn(userService, "findUserByUsername")
        .mockResolvedValue(mockUser as any);
      const bcryptCompare = jest.fn().mockResolvedValue(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;
      jest.spyOn(jwt, "sign").mockReturnValue("mockToken" as any);

      await expect(
        authService.login("testuser", "wrongpassword")
      ).rejects.toThrow(AuthErrorMessage.AUTHENTICATION_FAILED);

      const { body, status } = await supertest(app)
        .post("/api/login")
        .send({ username: "testuser", password: "wrongpassword" });

      expect(body).toEqual({ error: AuthErrorMessage.AUTHENTICATION_FAILED });
      expect(status).toBe(401);
    });

    it("should throw an error if the user does not exist", async () => {
      jest.spyOn(userService, "findUserByUsername").mockResolvedValue(null);

      await expect(
        authService.login("unknownuser", "password")
      ).rejects.toThrow(AuthErrorMessage.AUTHENTICATION_FAILED);

      const { body, status } = await supertest(app)
        .post("/api/login")
        .send({ username: "unknownuser", password: "password" });

      expect(body).toEqual({ error: AuthErrorMessage.AUTHENTICATION_FAILED });
      expect(status).toBe(401);
    });
  });
});
