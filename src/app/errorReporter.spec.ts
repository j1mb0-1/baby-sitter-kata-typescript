import { ErrorReporter } from "./errorReporter";

describe("error reporter", () => {
  it("should report error to console", () => {
    console.log = jest.fn();
    const error: Error = new Error("Test");

    const errorReporter: ErrorReporter = new ErrorReporter();
    errorReporter.report(error);

    expect(console.log).toHaveBeenCalledWith(`${error}`);
  });
});
