import { describe, expect, it } from "vitest";

import { handlers, server } from "../../tests/setup";
import { templateApi } from "./TemplateApi";

describe("TemplateApi", () => {
  it("should call processDataEndpoint and return the correct response", async () => {
    server.use(...handlers);
    const result = await templateApi.processDataEndpoint("test");
    expect(result).toEqual({ message: "Processed Data" });
  });
});
