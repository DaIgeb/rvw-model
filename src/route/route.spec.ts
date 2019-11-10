import { validate } from "../route";

test("validate", done => {
  expect(
    validate(
      { id: "Carl" },
      {
        error: args => {
          expect(args.length).toBe(1);
          expect(args[0].schemaPath).toBe("#/properties/id/format");
          expect(args[0].message).toBe('should match format "uuid"');
          done();
        }
      }
    )
  ).toBe(false);
});

test("validate", done => {
  expect(
    validate(1, {
      error: args => {
        expect(typeof args).toBe("string");
        expect(args).toBe("Not an object");
        done();
      }
    })
  ).toBe(false);
});
