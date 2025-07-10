# API End Points Documentation

## Measurements

### POST /api/measurements

##### Body

```json
{
  "date": "2024-01-15T10:00:00Z",
  "type": "BLOOD",
  "observations": [
    {
      "loincCode": "33747-0",
      "value": 140,
      "unit": "mmHg"
    },
    {
      "loincCode": "8462-4",
      "value": 90,
      "unit": "mmHg"
    }
  ]
}
```

##### Response (201):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "date": "2024-01-15T10:00:00.000Z",
  "type": "BLOOD",
  "observations": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "loincCode": "33747-0",
      "value": 140,
      "unit": "mmHg"
    }
  ]
}
```
