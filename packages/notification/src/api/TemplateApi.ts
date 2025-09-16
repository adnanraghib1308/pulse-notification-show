import { templateService } from "../service/TemplateService";

export const templateApi = {
  /** Process some data in response to an HTTP request. I'm not sure exactly
      what this will look like yet as it will need to be invoked from the
      gateway app's Express server. For now we'll just have it proxy to the
      service layer. */
  processDataEndpoint: (name: string) => {
    return templateService.processData(name);
  },
};
