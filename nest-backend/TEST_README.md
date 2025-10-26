# Test Documentation

This document describes the comprehensive test suite for the NestJS Task Board Backend.

## Test Structure

### Unit Tests
- **Location**: `src/**/*.spec.ts`
- **Purpose**: Test individual components in isolation
- **Coverage**: Services, Controllers, DTOs, Entities, Enums

### Integration Tests (E2E)
- **Location**: `test/**/*.e2e-spec.ts`
- **Purpose**: Test complete API endpoints and workflows
- **Coverage**: HTTP requests, database interactions, full application flow

## Test Files

### Unit Tests
- `src/app.controller.spec.ts` - App controller unit tests
- `src/app.service.spec.ts` - App service unit tests
- `src/tasks/task.controller.spec.ts` - Task controller unit tests
- `src/tasks/task.service.spec.ts` - Task service unit tests
- `src/tasks/entities/task.entity.spec.ts` - Task entity unit tests
- `src/tasks/dto/create-task.dto.spec.ts` - Create task DTO unit tests
- `src/tasks/dto/update-task.dto.spec.ts` - Update task DTO unit tests
- `src/pagination/dto/pagination.dto.spec.ts` - Pagination DTO unit tests
- `src/shared/enum/status.enum.spec.ts` - Status enum unit tests

### Integration Tests
- `test/app.e2e-spec.ts` - App controller integration tests
- `test/task.e2e-spec.ts` - Task API integration tests

## Running Tests

### All Tests
```bash
npm run test
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

### With Coverage
```bash
npm run test:cov
```

### Watch Mode
```bash
npm run test:watch
```

### CI Mode (Unit + Integration + Coverage)
```bash
npm run test:ci
```

## Test Coverage

The test suite aims for comprehensive coverage with the following thresholds:
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Test Categories

### 1. Unit Tests

#### TaskService Tests
- ✅ Create task successfully
- ✅ Handle repository errors during creation
- ✅ Update task successfully
- ✅ Handle task not found during update
- ✅ Handle repository errors during update
- ✅ Find all tasks without search
- ✅ Find all tasks with search filter
- ✅ Handle repository errors during find
- ✅ Return only last 5 tasks
- ✅ Handle pagination correctly

#### TaskController Tests
- ✅ Create task endpoint
- ✅ Handle service errors in create
- ✅ Get all tasks endpoint
- ✅ Handle service errors in findAll
- ✅ Update task endpoint
- ✅ Handle service errors in update
- ✅ Proper error handling and status codes

#### AppController Tests
- ✅ Hello world endpoint
- ✅ Service integration

#### AppService Tests
- ✅ Hello world method
- ✅ Return type validation

#### DTO Tests
- ✅ CreateTaskDto validation
- ✅ UpdateTaskDto validation
- ✅ PaginationDto validation

#### Entity Tests
- ✅ Task entity properties
- ✅ Status enum values
- ✅ Date handling

### 2. Integration Tests

#### Task API Tests
- ✅ POST /task/create-post - Create task
- ✅ GET /task/all - Get all tasks
- ✅ GET /task/all?search=query - Search tasks
- ✅ PATCH /task/:id - Update task
- ✅ Error handling for all endpoints
- ✅ Validation error handling
- ✅ Database error handling

#### App API Tests
- ✅ GET / - Hello world
- ✅ Content type validation
- ✅ Health check

## Test Configuration

### Jest Configuration
- **Test Environment**: Node.js
- **Coverage Directory**: `../coverage`
- **Coverage Reporters**: text, lcov, html
- **Setup Files**: `test/setup.ts`
- **Module Mapping**: Configured for src imports

### Test Setup
- Global test timeout: 10 seconds
- Console output suppression for cleaner test runs
- Reflect-metadata import for decorators

## Mocking Strategy

### Repository Mocking
- TypeORM repository methods mocked
- Database operations simulated
- Error scenarios tested

### Service Mocking
- Service dependencies mocked in controller tests
- Error propagation tested
- Response format validation

## Error Testing

### Database Errors
- Connection failures
- Query failures
- Constraint violations

### Validation Errors
- Missing required fields
- Invalid data types
- Business rule violations

### HTTP Errors
- 400 Bad Request
- 404 Not Found
- 500 Internal Server Error

## Best Practices

1. **Isolation**: Each test is independent
2. **Mocking**: External dependencies are mocked
3. **Coverage**: All code paths are tested
4. **Error Handling**: Both success and error scenarios
5. **Documentation**: Tests serve as documentation
6. **Maintainability**: Tests are easy to understand and modify

## Running Coverage Reports

After running tests with coverage, reports are generated in:
- **HTML**: `coverage/index.html`
- **LCOV**: `coverage/lcov.info`
- **Text**: Console output

## Continuous Integration

The test suite is designed to run in CI environments with:
- Parallel test execution
- Coverage reporting
- Exit codes for pass/fail
- Timeout handling

