import { api } from "./api";

export interface Composition extends Record<string, number> {}

export const compositionService = {
  async getComposition(input: string): Promise<Composition> {
    return api.get<Composition>("/", {
      query: { formula: input },
    });
  },
};
