/**
 * Test runner utilities for the task management application
 * This file provides utilities for running and managing tests
 */

export class TestRunner {
  /**
   * Test configuration constants
   */
  static readonly TEST_CONFIG = {
    COVERAGE_THRESHOLD: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },
    TEST_TIMEOUT: 10000,
    BROWSER_OPTIONS: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  };

  /**
   * Test categories for organization
   */
  static readonly TEST_CATEGORIES = {
    COMPONENTS: 'components',
    SERVICES: 'services',
    INTEGRATION: 'integration',
    E2E: 'e2e'
  };

  /**
   * Common test patterns and utilities
   */
  static readonly PATTERNS = {
    COMPONENT_SPEC: '**/*.component.spec.ts',
    SERVICE_SPEC: '**/*.service.spec.ts',
    ALL_SPECS: '**/*.spec.ts'
  };

  /**
   * Test environment setup
   */
  static setupTestEnvironment(): void {
    // Set up global test configurations
    if (typeof jasmine !== 'undefined' && (jasmine as any).DEFAULT_TIMEOUT_INTERVAL !== undefined) {
      (jasmine as any).DEFAULT_TIMEOUT_INTERVAL = this.TEST_CONFIG.TEST_TIMEOUT;
    }
    
    // Configure console for better test output
    if (typeof console !== 'undefined') {
      console.log('Test environment initialized');
    }
  }

  /**
   * Test data generators for consistent testing
   */
  static generateTestData() {
    return {
      validTask: {
        title: 'Test Task',
        description: 'Test Description'
      },
      invalidTask: {
        title: '',
        description: ''
      },
      longTitle: 'A'.repeat(100),
      longDescription: 'B'.repeat(500)
    };
  }

  /**
   * Mock data for API responses
   */
  static getMockApiResponses() {
    return {
      successResponse: {
        message: 'Operation successful',
        data: {}
      },
      errorResponse: {
        message: 'Operation failed',
        error: 'Test error'
      },
      validationError: {
        message: 'Validation failed',
        errors: ['Field is required']
      }
    };
  }
}
