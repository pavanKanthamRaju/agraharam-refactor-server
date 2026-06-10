# Quick Start Guide - TypeScript Version

## Installation

```bash
# Install all dependencies (including TypeScript dev dependencies)
npm install
```

## Development

### Watch Mode (Recommended for Development)
```bash
# Starts TypeScript compiler in watch mode and runs with ts-node
npm run dev
```

This will:
- Monitor `src/` for changes
- Recompile automatically
- Restart the server on changes
- Show compilation errors immediately

### Development with Manual Compilation
```bash
# Terminal 1 - Compile TypeScript in watch mode
npm run dev:watch

# Terminal 2 - Run the compiled code
npm start
```

## Production

### Build
```bash
# Compile TypeScript to JavaScript in dist/
npm run build
```

### Run
```bash
# Start the compiled server
npm start
```

This runs `node dist/index.js` which executes the compiled JavaScript.

## Project Structure

```
src/                    # TypeScript source files
├── config/            # Configuration (DB, Razorpay, Redis)
├── controllers/       # Request handlers
├── middlewares/       # Express middlewares
├── models/            # Database queries
├── routes/            # API endpoints
├── services/          # Business logic
├── types/             # TypeScript interfaces
├── utils/             # Utility functions
└── index.ts          # Entry point
```

## Environment Variables

Ensure `.env` file exists with required variables:
```
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=agraharam

# JWT
JWT_SECRET=your_jwt_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# APIs
OPEN_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key
GOOGLE_CLIENT_ID=your_google_client_id

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_FROM_NUMBER=your_twilio_number

# Supabase (for production)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
```

## Available Scripts

```bash
npm run build      # Compile TypeScript to JavaScript
npm start         # Run the compiled server
npm run dev       # Run with ts-node (for development)
npm run dev:watch # Compile TypeScript in watch mode
```

## API Endpoints

### Authentication
```
POST /api/auth/signup      - Register new user
POST /api/auth/login       - Login user
POST /api/auth/google-login - Google OAuth login
```

### Users
```
GET  /api/users            - Get all users (protected)
POST /api/users            - Create user
```

### Poojas (Services)
```
GET  /api/poojas           - Get all poojas
POST /api/poojas           - Create pooja
PUT  /api/poojas/:id       - Update pooja
```

### Items
```
GET  /api/items            - Get all items
POST /api/items            - Create item
PUT  /api/items/:id        - Update item
DELETE /api/items/:id      - Delete item
```

### Orders
```
GET  /api/orders/getAllOrders     - Get all orders
GET  /api/orders/:user_id         - Get user orders
POST /api/orders                  - Place order
```

### Payments
```
POST /api/payment/create-order    - Create Razorpay order
POST /api/payment/verify-payment  - Verify payment
```

### Pooja Items
```
GET  /api/poojaItems              - Get all pooja items
GET  /api/poojaItems/:pooja_id    - Get items for a pooja
POST /api/poojaItems              - Add pooja item
PUT  /api/poojaItems/:id          - Update pooja item
DELETE /api/poojaItems/:id        - Delete pooja item
```

### Announcements
```
GET    /api/announcements         - Get all announcements
POST   /api/announcements         - Create announcement
PUT    /api/announcements/:id     - Update announcement
DELETE /api/announcements/:id     - Delete announcement
```

### RAG (Retrieval Augmented Generation)
```
POST /api/askAgraharam                - Ask RAG query
POST /api/askAgraharam/storeEmbed     - Store embedding
POST /api/askAgraharam/upload         - Upload PDF and process
```

## Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=3000 npm start
```

### TypeScript Compilation Errors
```bash
# Check for type errors
npm run build

# The error message will show the exact file and line with the issue
```

### Module Not Found
```bash
# Make sure all dependencies are installed
npm install

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues
- Ensure PostgreSQL is running
- Check `.env` variables for DB connection
- Verify database user permissions
- For Supabase, verify the RPC function exists

## Type Safety Benefits

With TypeScript, you get:
- **Compile-time error checking** - Catch bugs before runtime
- **IDE autocomplete** - Better development experience
- **Self-documenting code** - Types serve as documentation
- **Refactoring safety** - Breaking changes caught immediately

Example:
```typescript
// TypeScript will catch this at compile time
const user: User = {
  id: "123",
  email: "user@example.com"
  // ❌ Error: Missing required property 'name'
};
```

## Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express with TypeScript](https://expressjs.com/en/resources/middleware/cors.html)
- [tsconfig.json Reference](https://www.typescriptlang.org/tsconfig)
