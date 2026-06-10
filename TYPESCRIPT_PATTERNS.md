# TypeScript Patterns & Best Practices

## Common Patterns Used in This Project

### 1. Typed Express Controllers

```typescript
import { Request, Response } from 'express';

// Option A: Simple typed response
const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Option B: Using custom types
import { AuthenticatedRequest, User } from '../types/index.js';

const getAuthenticatedUser = (req: AuthenticatedRequest, res: Response): void => {
    const user = req.user; // TypeScript knows this is JWTPayload
    res.json({ userId: user.id });
};
```

### 2. Typed Middlewares

```typescript
import { Request, Response, NextFunction } from 'express';

const myMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Middleware logic
    next();
};

// Or with custom request type
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    next();
};
```

### 3. Database Model Pattern

```typescript
import db from '../config/db.js';
import { User } from '../types/index.js';

// Type-safe database queries
const getAllUsers = async (): Promise<User[]> => {
    const res = await db.query("SELECT * FROM users");
    return res.rows; // Type is User[]
};

// Parameterized queries prevent SQL injection
const findUser = async (email: string): Promise<User | undefined> => {
    const res = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return res.rows[0];
};
```

### 4. Error Handling Pattern

```typescript
import { AppError } from '../middlewares/errorHandler.js';

// Throw typed errors
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        throw new AppError("Email and password required", 400);
    }
    
    const user = await User.findUser(email);
    if (!user) {
        throw new AppError("User not found", 401);
    }
    
    // ... more logic
};

// Error handler catches all AppErrors automatically
// Express 5.0 catches async errors
```

### 5. Async Handler Pattern

```typescript
import asyncHandler from '../middlewares/asyncHandler.js';

// Wraps controller to catch async errors
const myRoute = express.Router();
myRoute.get('/users', asyncHandler(async (req, res) => {
    const users = await User.getAllUsers();
    res.json(users);
}));
```

### 6. Service Layer Pattern

```typescript
// Service layer for business logic
export const askRag = async (question: string): Promise<string> => {
    const queryEmbedding = await createEmbedding(question);
    const docs = await searchChunks(queryEmbedding);
    
    if (!docs.length) {
        return "No information found";
    }
    
    const answer = await askGemini(question, docs);
    return answer;
};

// Used in controller
const ragController = async (req: Request, res: Response) => {
    const answer = await askRag(req.body.question);
    res.json({ answer });
};
```

### 7. Type Union for Flexible Parameters

```typescript
// Accept multiple parameter types
export interface SendSmsOptions {
    to: string;
    body: string;
    from?: string;
}

async function sendSms(options: SendSmsOptions): Promise<any> {
    const { to, body, from = process.env.TWILIO_FROM_NUMBER } = options;
    return client.messages.create({ to, from, body });
}

// Usage
await sendSms({ to: "+919876543210", body: "Hello" });
```

### 8. Generic Types for Reusable Code

```typescript
// Generic query result type
export interface QueryResult<T> {
    rows: T[];
    rowCount: number;
}

// Used everywhere
const result: QueryResult<User> = await db.query(query, params);
const users: User[] = result.rows;

// Generic API response
export interface ApiResponse<T = any> {
    success?: boolean;
    message?: string;
    data?: T;
    error?: string;
}

// Usage
res.json<ApiResponse<User>>({ success: true, data: user });
```

### 9. Route Pattern

```typescript
import { Router, Request, Response } from 'express';
import { getUsers } from '../controllers/userController.js';
import verifyToken from '../middlewares/jwtMiddleware.js';

const router = Router();

// Protected route
router.get('/', verifyToken, getUsers);

// Public route
router.post('/', createUser);

export default router;
```

### 10. Configuration Pattern

```typescript
// Type-safe configuration
interface DbConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

const dbConfig: DbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'agraharam',
};
```

## Adding New Features (TypeScript Way)

### Step 1: Define Types
```typescript
// src/types/index.ts
export interface NewFeature {
    id: string;
    name: string;
    description: string;
}
```

### Step 2: Create Model
```typescript
// src/models/newFeatureModel.ts
import { NewFeature } from '../types/index.js';

export const createNewFeature = async (data: Omit<NewFeature, 'id'>): Promise<NewFeature> => {
    return db.insert("new_features", data);
};
```

### Step 3: Create Service (if complex logic)
```typescript
// src/services/newFeatureService.ts
import { NewFeature } from '../types/index.js';

export const processNewFeature = async (feature: NewFeature): Promise<void> => {
    // Business logic here
};
```

### Step 4: Create Controller
```typescript
// src/controllers/newFeatureController.ts
import { Request, Response } from 'express';
import { createNewFeature } from '../models/newFeatureModel.js';

export const addNewFeature = async (req: Request, res: Response): Promise<void> => {
    try {
        const feature = await createNewFeature(req.body);
        res.status(201).json(feature);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
```

### Step 5: Create Route
```typescript
// src/routes/newFeatureRoutes.ts
import { Router } from 'express';
import { addNewFeature } from '../controllers/newFeatureController.js';

const router = Router();
router.post('/', addNewFeature);

export default router;
```

### Step 6: Register Route
```typescript
// src/routes/routesConfig.ts
import newFeatureRoutes from './newFeatureRoutes.js';

router.use('/newFeatures', newFeatureRoutes);
```

## Common Type Patterns

### 1. Partial Updates
```typescript
// Update only some fields
export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    return db.update("users", id, data);
};
```

### 2. Required Parameters
```typescript
// Ensure all fields present
export const createUser = async (data: Required<User>): Promise<User> => {
    return db.insert("users", data);
};
```

### 3. Omitting Fields
```typescript
// Omit sensitive fields from response
export type UserResponse = Omit<User, 'password'>;

const getUser = async (id: string): Promise<UserResponse> => {
    const user = await User.findById(id);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
```

### 4. Union Types
```typescript
// Multiple possible types
type LoginResponse = 
    | { success: true; token: string; user: User }
    | { success: false; error: string };

const login = async (email: string, password: string): Promise<LoginResponse> => {
    // ...
};
```

### 5. Tuple Types
```typescript
// Fixed length array with specific types
type JWTHeader = [string, string, string]; // [algorithm, type, signature]
```

## Casting & Type Guards

### Safe Type Casting
```typescript
// Type guard
function isUser(obj: any): obj is User {
    return (
        typeof obj.id === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.name === 'string'
    );
}

const parseUser = (data: unknown): User => {
    if (isUser(data)) {
        return data;
    }
    throw new Error("Invalid user data");
};
```

### Asserting Types
```typescript
// When you're sure about the type
const user = await User.findById(id) as User;

// Or in Express
const authReq = req as AuthenticatedRequest;
console.log(authReq.user.id);
```

## Performance Tips

1. **Use `const` for parameters** - Prevents reassignment
2. **Avoid `any` type** - Use specific types or `unknown` with type guards
3. **Use strict null checking** - Enabled by default
4. **Leverage discriminated unions** - For better type narrowing

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express + TypeScript](https://github.com/typestack/routing-controllers)
- [Type-safe Database Queries](https://orm.drizzle.team/)
- [Advanced Types Guide](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
