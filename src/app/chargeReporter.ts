export class ChargeReporter {
  report(charge: number): void {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    console.log(`Babysitter charge: ${formatter.format(charge)}`);
  }
}
