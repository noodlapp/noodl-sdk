import { parseColor } from "../src";

test("Parse Color", () => {
  // Colors
  expect(parseColor("purple")).toBe("component");
  expect(parseColor("green")).toBe("data");
  expect(parseColor("blue")).toBe("visual");
  expect(parseColor("default")).toBe("default");
  expect(parseColor("grey")).toBe("default");

  // Types
  expect(parseColor("component")).toBe("purple");
  expect(parseColor("data")).toBe("green");
  expect(parseColor("visual")).toBe("blue");
  expect(parseColor("default")).toBe("default");
  // expect(parseColor("default")).toBe("grey");
});
