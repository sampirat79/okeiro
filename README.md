# Okeiro - Senior TypeScript/Node Engineer - Medical Observation API Coding Test

## Launch database

```sh
cd database
docker-compose up -d
```

## Server

- [Server documentation](./api/README.md)

## Client

- [Client documentation](./app/README.md)

### Challenges

- [Challenges answers](./CHALLENGES.md)

### Next and didn't handled

#### Server

- Fix Prisma that does not work actually
- Complete API End Points Documentation
- Add more tests to handle edge cases
- Reference ranges: create a `References` table with columns: `LOINC code`, `min age`, `max age`, `gender`, `min value`, `max value`, `unit`. `Observations` table rows should this way contain a `referenceId` foreign key.
- List measurements: handle filtering and sorting
- Unit conversion: create a converter that handle multiplier (ie: mg = g*1000, cg = g*100, ..., kg = g*0.001) and divider (ie: mg/dL = g*1000 / L\*10)

#### Client

- Add measurement observations form
- Add area chart representing observations
- Was thinking about a LOINC codes reference that should provide names & default unit for each observations. For example:
  ```json
  {
    "code": "718-7",
    "names": ["Hemoglobin", "Hémoglobine"],
    "defaultUnit": "g/dL"
  },
  ```
- Delta calculation: Apply converter to get uniform unit for all observations (ie: convert mg/dL in g/L, convert kg/hL in g/L) to compute deltas.
