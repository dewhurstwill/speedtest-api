# Speedtest Service - REST API
---

A simple REST API that exposes the data created by the [speedtest-cronjob service](https://github.com/dewhurstwill/speedtest-cronjob)

## Prerequisites
---

### Node modules:
---
```bash
yarn install
```

### Environment Variables
---

```bash
EXPORT MONGODB_URI=mongodb://localhost:27017/speedtest
or 
EXPORT MONGODB_URI=mongodb+srv://username:password@atlas-server-example.4t1ej.azure.mongodb.net/database_name?retryWrites=true&w=majority
```

## API Schema:
---

### GET

| Path | Query Params | Description |
| ---- | ----------- | ----------- |
| /api/v1/results | preset (Optional), offset (Optional), limit (Optional) | Returns a list of all the speedtest documents in the database. |
| /api/v1/results/:id | N/A | Returns a single speedtest document from the database. |

### DELETE

| Path | Query Params | Description |
| ---- | ----------- | ----------- |
| /api/v1/results/:id | N/A | Deletes a record with a given ID from the database. |
