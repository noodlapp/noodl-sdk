import { TypeProperty } from "../src/types/types";

type TypePropertyList = {
  [x: string]: {
    type: TypeProperty;
  };
};

test("Compile Test", () => {
  const willMeCompile: TypePropertyList = {
    myObject: {
      type: "object",
    },
    myString: {
      type: "string",
    },
    myEnum: {
      type: {
        name: "enum",
        enums: [
          {
            label: "test",
            value: "test",
          },
        ],
      },
    },
  };
});
