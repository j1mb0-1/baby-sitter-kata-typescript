import { NamedError } from "./namedError";

export class CommandLineArgumentParser {
  parse(
    argQueries: CommandLineArgumentQuery[],
    args: string[]
  ): Record<string, any> {
    const results: Record<string, any> = {};
    const processed: Record<string, any> = {};

    for (let i = 0; i < argQueries.length; i++) {
      const argQuery: CommandLineArgumentQuery = argQueries[i];
      let found: boolean = false;
      for (let k = 0; k < args.length; k++) {
        const arg = args[k];
        if (!(arg in processed) && arg === argQuery.flag) {
          const value = args[k + 1];
          results[argQuery.id] = this.parseToType(value, argQuery.type);
          processed[arg] = undefined;
          found = true;
          break;
        }
      }
      if (!found && !argQuery.optional) {
        throw new ArgumentMissingError(`Missing argument ${argQuery.flag}`);
      }
    }

    return results;
  }

  private parseToType(value: string, type: string): any {
    if (type === "Date") {
      const parsed = Date.parse(value);
      if (isNaN(parsed)) {
        throw new ArgumentParseError(`Cannot parse date from value ${value}`);
      }
      return new Date(parsed);
    } else if (type === "number") {
      return Number(value);
    } else {
      throw new UnsupportedTypeError(`Unsupported type ${type}`);
    }
  }
}

export interface CommandLineArgumentQuery {
  id: string;
  flag: string;
  type: string;
  optional?: boolean | undefined;
}

abstract class CommandLineArgumentParserError extends NamedError {}

export class UnsupportedTypeError extends CommandLineArgumentParserError {
  constructor(message: string | undefined) {
    super(message, "UnsupportedTypeError");
  }
}

export class ArgumentParseError extends CommandLineArgumentParserError {
  constructor(message: string | undefined) {
    super(message, "ArgumentParseError");
  }
}

export class ArgumentMissingError extends CommandLineArgumentParserError {
  constructor(message: string | undefined) {
    super(message, "ArgumentMissingError");
  }
}
