import createServer from "../../utils/createServer";
import { userService } from "../../services/userService";
import { addressService } from "../../services/addressService";
import { AddressErrorMessage } from "../../enums/addressErrorMessage";
import { UserErrorMessage } from "../../enums/userErrorMessage";
const app = createServer();

jest.mock("../../services/userService");

describe("addressService", () => {
  describe("getAddresses", () => {
    const mockUser = {
      _id: "123",
      addresses: [
        {
          _id: "456",
          street: "123 Test St",
          city: "Test City",
          state: "TS",
          zip: "12345",
          country: "Test Country",
        },
        {
          _id: "789",
          street: "456 Test St",
          city: "Test City2",
          state: "SP",
          zip: "12345",
          country: "Test Country",
        },
      ],
    };

    it("should return filtered addresses when valid data is provided", async () => {
      jest.spyOn(userService, "getUserById").mockResolvedValue(mockUser as any);

      const result = await addressService.getAddresses("123", {
        city: "Test City",
      });

      expect(result).toEqual([mockUser.addresses[0]]);
      expect(userService.getUserById).toHaveBeenCalledWith("123");
    });

    it("should throw an error if the user is not found", async () => {
      jest
        .spyOn(userService, "getUserById")
        .mockRejectedValue(new Error(UserErrorMessage.USER_NOT_FOUND));

      await expect(
        addressService.getAddresses("123", { city: "Test City" })
      ).rejects.toThrow(UserErrorMessage.USER_NOT_FOUND);
    });

    it("should throw a general error if unable to retrieve addresses", async () => {
      jest
        .spyOn(userService, "getUserById")
        .mockRejectedValue(new Error("Random error"));

      await expect(
        addressService.getAddresses("123", { city: "Test City" })
      ).rejects.toThrow(AddressErrorMessage.UNABLE_TO_RETREIVE_ADDRESS);
    });
  });

  describe("getAddressById", () => {
    const mockUser = {
      _id: "123",
      addresses: [
        {
          _id: "456",
          street: "123 Test St",
          city: "Test City",
          state: "TS",
          zip: "12345",
          country: "Test Country",
        },
      ],
    };

    it("should return the address if it exists", async () => {
      jest.spyOn(userService, "getUserById").mockResolvedValue(mockUser as any);

      const result = await addressService.getAddressById("123", "456");

      expect(result).toEqual(mockUser.addresses[0]);
      expect(userService.getUserById).toHaveBeenCalledWith("123");
    });

    it("should throw an error if the address is not found", async () => {
      jest.spyOn(userService, "getUserById").mockResolvedValue(mockUser as any);

      await expect(addressService.getAddressById("123", "999")).rejects.toThrow(
        AddressErrorMessage.ADDRESS_NOT_FOUND
      );
    });

    it("should throw an error if the user is not found", async () => {
      jest
        .spyOn(userService, "getUserById")
        .mockRejectedValue(new Error(UserErrorMessage.USER_NOT_FOUND));

      await expect(addressService.getAddressById("123", "456")).rejects.toThrow(
        UserErrorMessage.USER_NOT_FOUND
      );
    });
  });
});
