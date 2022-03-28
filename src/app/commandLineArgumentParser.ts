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
        try {
          if (!(arg in processed) && arg === argQuery.flag) {
            const value = args[k + 1];
            results[argQuery.id] = this.parseToType(value, argQuery.type);
            processed[arg] = undefined;
            found = true;
            break;
          }
        } catch {
          throw Error(`Error parsing value for argument: ${argQuery.flag}`);
        }
      }
      if (!found) {
        throw Error(`Missing argument: ${argQuery.flag}`);
      }
    }

    return results;
  }

  private parseToType(value: string, type: string): any {
    if (type === "Date") {
      const parsed = Date.parse(value);
      if (isNaN(parsed)) {
        throw new Error("Cannot parse date");
      }
      return new Date(parsed);
    } else {
      throw Error("Unsupported type");
    }
  }
}

export interface CommandLineArgumentQuery {
  id: string;
  flag: string;
  type: string;
}
