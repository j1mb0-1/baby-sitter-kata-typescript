import { ChargeReporter } from "./chargeReporter";

describe("charge reporter", () => {
  it("should report charge to console", () => {
    console.log = jest.fn();
    const charge: number = 140;

    const chargeReporter: ChargeReporter = new ChargeReporter();
    chargeReporter.report(charge);

    expect(console.log).toHaveBeenCalledWith("Babysitter charge: $140.00");
  });
});
