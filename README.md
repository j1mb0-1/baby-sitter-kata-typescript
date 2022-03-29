# Babysitter Kata TypeScript

An attempted solution of the [Babysitter Kata](https://gist.github.com/jameskbride/5482722) written in TypeScript and ran as a simple command-line app via node.js.

## Description

For the babysitter to calculate their charge for a single night of work, the program is currently configured as follows:

- The babysitter can use this program to calculate their charge for a job on any night - past, present, or future.
- The information they need to provide:
  - The date and time they started the job\*
  - The date and time they ended the job\*
  - The date and time they put the kid(s) to bed\*
  - Optionally, the timezone they work in if it differs from the one of the system the program runs on\*
- The constraints:
  - They must start the job between 5:00 PM and midnight in their time zone\*
  - They must finish the job between midnight and 4:00 AM in their time zone the day after they started\*
  - They must put the kid(s) to bed between their started time and midnight in their time zone\*
  - They cannot finish the job before they start
- The pay:
  - $12.00 an hour from the started time they entered to the bedtime they entered\*
  - $8.00 an hour from the bedtime they entered to midnight in their time zone\*
  - $16.00 an hour from midnight in their time zone to their entered ended time\*
  - If they are late within an hour, they will not be paid for that hour
  - If they finish early within an hour, they will be paid for that hour
  - If they put the kid(s) to bed within an hour, they will be paid the higher rate of $12.00 for that hour

\* The program will attempt to parse dates entered by the babysitter and set inferred babysitter availability and
midnight times based on the environment it is run in. All dates should be provided in a valid ISO string format `YYYY-MM-DDTHH:mm:ss.sssZ` to ensure consistent results.
Additionally, the optional `-time-zone-offset-min` can be provided to override the environment's
current time zone to ensure inferred times are in line with expectations.

## Getting Started

### Dependencies

- Running the program requires [node.js](https://nodejs.org/en/). The program has been tested using node.js v16.14.2 LTS.

### Setup

```
npm install

npm run build
```

### Tests

```
npm test

npm run coverage
```

### Usage

```
node dist/index.js -started-time "YYYY-MM-DDTHH:mm:ss.sssZ" -ended-time "YYYY-MM-DDTHH:mm:ss.sssZ" -bed-time "YYYY-MM-DDTHH:mm:ss.sssZ" [-time-zone-offset-min "mmm"]
```

Some examples

```
// Happy path
node dist/index.js -started-time "2022-03-28T21:00:00.000Z" -ended-time "2022-03-29T08:00:00.000Z" -bed-time "2022-03-29T02:00:00.000Z" -time-zone-offset-min "240"

// Babysitter was late
node dist/index.js -started-time "2022-03-28T21:00:00.001Z" -ended-time "2022-03-29T08:00:00.000Z" -bed-time "2022-03-29T02:00:00.000Z" -time-zone-offset-min "240"

// Babysitter was early
node dist/index.js -started-time "2022-03-28T20:00:00.000Z" -ended-time "2022-03-29T08:00:00.000Z" -bed-time "2022-03-29T02:00:00.000Z" -time-zone-offset-min "240"
```

## Future Considerations

- A simple UI, or use of a date/time library would ease the input of dates and time zone information.
- The rates and charge amount are currently represented as numbers. A libary or new class could be used to represent them as monetary values to avoid floating point issues in the future.

## Acknowledgments

- [Typescript VSCode Setup](https://code.visualstudio.com/docs/typescript/typescript-tutorial)
- [Jest Typescript Setup](https://jestjs.io/docs/getting-started#using-typescript-via-ts-jest)
