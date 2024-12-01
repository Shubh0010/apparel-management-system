# Apparel Management System API

A RESTful API built with Node.js, Express, and TypeScript for managing apparel inventory and orders. The system allows vendors to manage their apparel stock and helps users check order fulfillment and calculate costs.

## Features

- Update stock quantity and price for individual apparel items
- Bulk update multiple apparel items simultaneously
- Check if customer orders can be fulfilled based on current stock
- Calculate the lowest possible cost for fulfilling orders
- Data persistence using local JSON storage
- Swagger API documentation
- Comprehensive test coverage

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd apparel-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 3000 (default) or the port specified in the PORT environment variable.

## API Documentation

The API documentation is available through Swagger UI at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Stock Management
- PUT `/api/apparel/stock` - Update stock for a single apparel item
- PUT `/api/apparel/stock/bulk` - Bulk update stock for multiple apparel items

### Order Management
- POST `/api/apparel/order/check` - Check if an order can be fulfilled
- POST `/api/apparel/order/cost` - Calculate the lowest cost for an order

## Example Requests

### Update Single Stock
```json
{
  "code": "TSHIRT001",
  "size": "M",
  "quantity": 10,
  "price": 29.99
}
```

### Check Order Fulfillment
```json
{
  "items": [
    {
      "code": "TSHIRT001",
      "size": "M",
      "quantity": 2
    }
  ]
}
```

## Testing

Run the test suite:
```bash
npm test
```

## Project Structure
```
apparel-management-system/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript interfaces
│   └── app.ts          # Application entry point
├── tests/              # Test files
├── data/              # JSON data storage
├── swagger.yml        # API documentation
├── package.json
└── tsconfig.json
```

## Data Persistence

The application stores all data in a local JSON file (`data/apparel.json`). This ensures data persistence across server restarts while maintaining simplicity.

## Error Handling

The API implements comprehensive error handling:
- Input validation
- Stock availability checks
- Server-side error logging
- Appropriate HTTP status codes and error messages

## Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm start` - Run the built application
- `npm test` - Run the test suite