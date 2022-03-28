import {
  CommandLineArgumentParser,
  CommandLineArgumentQuery,
} from "./commandLineArgumentParser";

describe("command line argument parser", () => {
  it("should parse nothing", () => {
    const args: string[] = [];
    const argQueries: CommandLineArgumentQuery[] = [];

    const commandLineArgumentParser = new CommandLineArgumentParser();
    const result: Record<string, any> = commandLineArgumentParser.parse(
      argQueries,
      args
    );

    expect(result).toMatchObject({});
  });

  it("should parse a date", () => {
    const args: string[] = ["--started-time", "2022-03-28T17:00:00.000"];
    const argQueries: CommandLineArgumentQuery[] = [
      {
        id: "startedTime",
        flag: "--started-time",
        type: "Date",
      },
    ];

    const commandLineArgumentParser = new CommandLineArgumentParser();
    const result: Record<string, any> = commandLineArgumentParser.parse(
      argQueries,
      args
    );

    expect(result).toMatchObject({
      startedTime: new Date("2022-03-28T21:00:00.000Z"),
    });
  });

  it("should parse multiple dates", () => {
    const args: string[] = [
      "--started-time",
      "2022-03-28T17:00:00.000",
      "--ended-time",
      "2022-03-28T17:00:00.000",
    ];
    const argQueries: CommandLineArgumentQuery[] = [
      {
        id: "startedTime",
        flag: "--started-time",
        type: "Date",
      },
      {
        id: "endedTime",
        flag: "--ended-time",
        type: "Date",
      },
    ];

    const commandLineArgumentParser = new CommandLineArgumentParser();
    const result: Record<string, any> = commandLineArgumentParser.parse(
      argQueries,
      args
    );

    expect(result).toMatchObject({
      startedTime: new Date("2022-03-28T21:00:00.000Z"),
      endedTime: new Date("2022-03-28T21:00:00.000Z"),
    });
  });

  it("should throw if missing", () => {
    const args: string[] = ["--started-date", "2022-03-28T17:00:00.000"];
    const argQueries: CommandLineArgumentQuery[] = [
      {
        id: "startedTime",
        flag: "--started-time",
        type: "Date",
      },
    ];

    const commandLineArgumentParser = new CommandLineArgumentParser();

    expect(() => {
      commandLineArgumentParser.parse(argQueries, args);
    }).toThrowError();
  });

  it("should throw if cannot parse value", () => {
    const args: string[] = ["--started-time", "2022-68-28T17:00:00.000"];
    const argQueries: CommandLineArgumentQuery[] = [
      {
        id: "startedTime",
        flag: "--started-time",
        type: "Date",
      },
    ];

    const commandLineArgumentParser = new CommandLineArgumentParser();

    expect(() => {
      commandLineArgumentParser.parse(argQueries, args);
    }).toThrowError();
  });
});
