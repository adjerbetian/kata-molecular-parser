export interface Composition extends Record<string, number> {}

export const Composition = {
  add(c1: Composition, c2: Composition): Composition {
    const result = { ...c1 };
    Object.entries(c2).forEach(([element, count]) => {
      result[element] = (result[element] || 0) + count;
    });
    return result;
  },
  multiply(composition: Composition, n: number): Composition {
    return Object.fromEntries(
      Object.entries(composition).map(([element, count]) => [
        element,
        count * n,
      ])
    );
  },
};
