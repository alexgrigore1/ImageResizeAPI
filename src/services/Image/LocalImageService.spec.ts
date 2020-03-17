import {ImageResizeParams} from "../../models/ImageResizeParams";
import {LocalImageService} from "./LocalImageService";
import fs from 'fs';

jest.mock("sharp");
jest.mock('./LocalImageCacheService');

describe("services/Image/LocalImageCacheService", () => {
  describe("getImage", () => {
    const localImageService = new LocalImageService();

    it("should return the expected result when no resizeParams provided", async () => {
      const imagePath = "1.jpg";
      const resizeParams = null;
      const mockReadFile = jest.spyOn(fs.promises, 'readFile');
      mockReadFile.mockResolvedValueOnce("original image"); // original file

      const {imageBuffer, fromCache} = await localImageService.getImage(imagePath, resizeParams);
      expect(imageBuffer).toBe("original image");
      expect(fromCache).toBe(false);
    });

    it("should return the expected result when resizeParams provided no cached image found", async () => {
      const imagePath = "1.jpg";
      const resizeParams = new ImageResizeParams(20, 20);
      const mockReadFile = jest.spyOn(fs.promises, 'readFile');
      mockReadFile.mockRejectedValueOnce(null); // cached file
      mockReadFile.mockResolvedValueOnce("1.jpg"); // original file

      const {imageBuffer, fromCache} = await localImageService.getImage(imagePath, resizeParams);
      expect(imageBuffer).toBe("resized image");
      expect(fromCache).toBe(false);
    });

    it("should return the expected result when resizeParams provided and cached image found", async () => {
      const imagePath = "1.jpg";
      const resizeParams = new ImageResizeParams(20, 20);
      const mockReadFile = jest.spyOn(fs.promises, 'readFile');
      mockReadFile.mockResolvedValueOnce("cached resized image"); // cached file

      const {imageBuffer, fromCache} = await localImageService.getImage(imagePath, resizeParams);
      expect(imageBuffer).toBe("cached resized image");
      expect(fromCache).toBe(true);
    });
  });
});