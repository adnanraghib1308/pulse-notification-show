import { beforeEach, describe, expect, it, vi } from "vitest";

import { templateApi } from "./TemplateApi";

//serviceTemplate is an internal depenency of the api. Importing the mock in this way will give you 2 benefits:
// 1. the mod variable is correctly typed
// 2. you can just mocks the method you need, the rest of the methods will be the original ones
const mocks = vi.hoisted(() => {
  return {
    processDataMock: vi.fn(),
  };
});

vi.mock(import("../service/TemplateService"), async (importOriginal) => {
  const mod = await importOriginal();

  return {
    ...mod,
    templateService: {
      ...mod.templateService,
      processData: mocks.processDataMock,
    },
  };
});

describe("ApiRouterEndpoints", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("should work when service.processData resolve", async () => {
    const mockResultValue = undefined;
    mocks.processDataMock.mockResolvedValue(mockResultValue);
    const actual = await templateApi.processDataEndpoint("test-client");
    expect(mocks.processDataMock).toHaveBeenCalledWith("test-client");
    expect(actual).toEqual(mockResultValue);
  });

  it("should fail when service.processData reject", async () => {
    const mockError = "this is an error";
    mocks.processDataMock.mockRejectedValue(mockError);
    expect(async () => {
      return templateApi.processDataEndpoint("test-client");
    }).to.rejects.toEqual(mockError);
  });
});
