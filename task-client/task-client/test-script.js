#!/usr/bin/env node

/**
 * Test runner script for the Task Management Application
 * This script provides an easy way to run tests with different configurations
 */

const { execSync } = require('child_process');
const path = require('path');

// Test configurations
const testConfigs = {
  unit: {
    description: 'Run unit tests',
    command: 'ng test --watch=false --browsers=ChromeHeadless'
  },
  coverage: {
    description: 'Run tests with coverage report',
    command: 'ng test --watch=false --browsers=ChromeHeadless --code-coverage'
  },
  watch: {
    description: 'Run tests in watch mode',
    command: 'ng test --watch=true'
  },
  specific: {
    description: 'Run specific test file',
    command: (filename) => `ng test --include="**/${filename}" --watch=false`
  }
};

// Available test files
const testFiles = [
  'task-manager.component.spec.ts',
  'add-task-form.component.spec.ts',
  'task-item.component.spec.ts',
  'task.service.spec.ts'
];

function runTest(config) {
  try {
    console.log(`Running: ${config.description}`);
    console.log(`Command: ${config.command}`);
    console.log('---');
    
    execSync(config.command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('---');
    console.log('✅ Tests completed successfully!');
  } catch (error) {
    console.error('❌ Tests failed:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log('Task Management Application - Test Runner');
  console.log('==========================================');
  console.log('');
  console.log('Usage: node test-script.js [command]');
  console.log('');
  console.log('Available commands:');
  console.log('  unit       - Run all unit tests');
  console.log('  coverage   - Run tests with coverage report');
  console.log('  watch      - Run tests in watch mode');
  console.log('  specific   - Run a specific test file');
  console.log('  help       - Show this help message');
  console.log('');
  console.log('Available test files:');
  testFiles.forEach(file => {
    console.log(`  - ${file}`);
  });
}

function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'unit':
      runTest(testConfigs.unit);
      break;
    case 'coverage':
      runTest(testConfigs.coverage);
      break;
    case 'watch':
      runTest(testConfigs.watch);
      break;
    case 'specific':
      const filename = process.argv[3];
      if (!filename) {
        console.error('Please specify a test file name');
        console.log('Available files:', testFiles.join(', '));
        process.exit(1);
      }
      runTest({
        description: `Run specific test: ${filename}`,
        command: testConfigs.specific.command(filename)
      });
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main();
