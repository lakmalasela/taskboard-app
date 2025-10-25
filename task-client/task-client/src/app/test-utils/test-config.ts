/**
 * Test configuration for the Task Management Application
 * This file contains test-specific configurations and constants
 */

export const TEST_CONFIG = {
  // Test timeouts
  TIMEOUT: {
    DEFAULT: 10000,
    LONG: 30000,
    SHORT: 5000
  },

  // Test data constants
  DATA: {
    VALID_TASK: {
      title: 'Test Task',
      description: 'Test Description'
    },
    INVALID_TASK: {
      title: '',
      description: ''
    },
    LONG_TITLE: 'A'.repeat(100),
    LONG_DESCRIPTION: 'B'.repeat(500)
  },

  // Mock API responses
  API_RESPONSES: {
    SUCCESS: {
      message: 'Operation successful',
      data: {}
    },
    ERROR: {
      message: 'Operation failed',
      error: 'Test error'
    },
    VALIDATION_ERROR: {
      message: 'Validation failed',
      errors: ['Field is required']
    }
  },

  // Test categories
  CATEGORIES: {
    COMPONENTS: 'components',
    SERVICES: 'services',
    INTEGRATION: 'integration',
    E2E: 'e2e'
  },

  // Test patterns
  PATTERNS: {
    COMPONENT_SPEC: '**/*.component.spec.ts',
    SERVICE_SPEC: '**/*.service.spec.ts',
    ALL_SPECS: '**/*.spec.ts'
  }
};

/**
 * Test environment setup
 */
export function setupTestEnvironment(): void {
  // Set up global test configurations
  if (typeof jasmine !== 'undefined' && (jasmine as any).DEFAULT_TIMEOUT_INTERVAL !== undefined) {
    (jasmine as any).DEFAULT_TIMEOUT_INTERVAL = TEST_CONFIG.TIMEOUT.DEFAULT;
  }
  
  // Configure console for better test output
  if (typeof console !== 'undefined') {
    console.log('Test environment initialized');
  }
}

/**
 * Test data generators
 */
export class TestDataGenerator {
  static createMockTask(overrides: any = {}) {
    return {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'Pending',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      ...overrides
    };
  }

  static createMockTasks(count: number) {
    return Array.from({ length: count }, (_, index) => 
      this.createMockTask({
        id: `${index + 1}`,
        title: `Test Task ${index + 1}`,
        description: `Test Description ${index + 1}`,
        status: index % 2 === 0 ? 'Pending' : 'Completed'
      })
    );
  }

  static createMockCreateTaskDto(overrides: any = {}) {
    return {
      title: 'Test Task',
      description: 'Test Description',
      ...overrides
    };
  }
}
