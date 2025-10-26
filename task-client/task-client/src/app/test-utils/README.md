# Testing Documentation

This directory contains testing utilities and documentation for the Task Management Application.

## Test Structure

### Component Tests
- **TaskManagerComponent**: Tests the main task management functionality
- **AddTaskFormComponent**: Tests the task creation form
- **TaskItemComponent**: Tests individual task display and interactions

### Service Tests
- **TaskService**: Tests API communication and data handling

## Test Utilities

### TestHelpers
Located in `test-helpers.ts`, provides:
- Mock service creation
- Test data generation
- Common test setup functions

### TestRunner
Located in `test-runner.ts`, provides:
- Test configuration constants
- Environment setup
- Test data generators

## Running Tests

### Unit Tests
```bash
npm test
```

### Coverage Report
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

## Test Coverage Goals

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## Test Categories

1. **Components**: UI component testing
2. **Services**: Business logic and API testing
3. **Integration**: Component interaction testing
4. **E2E**: End-to-end user flow testing

## Best Practices

1. **Arrange-Act-Assert**: Structure tests clearly
2. **Mock Dependencies**: Use spies and mocks for external dependencies
3. **Test Edge Cases**: Include error scenarios and boundary conditions
4. **Descriptive Names**: Use clear, descriptive test names
5. **Single Responsibility**: Each test should verify one specific behavior

## Common Test Patterns

### Component Testing
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
      providers: [/* mock providers */]
    }).compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Service Testing
```typescript
describe('ServiceName', () => {
  let service: ServiceName;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceName]
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

## Mock Data

Use the `TestHelpers` class to generate consistent mock data:

```typescript
import { TestHelpers } from './test-helpers';

const mockTask = TestHelpers.createMockTask();
const mockService = TestHelpers.createMockTaskService();
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all dependencies are properly imported
2. **Async Issues**: Use `fakeAsync` and `tick()` for async operations
3. **Mock Issues**: Verify mock setup and expectations
4. **Coverage Issues**: Check that all code paths are tested

### Debug Tips

1. Use `console.log()` for debugging test execution
2. Check browser console for detailed error messages
3. Use `fdescribe` and `fit` to focus on specific tests
4. Use `xdescribe` and `xit` to skip tests temporarily
