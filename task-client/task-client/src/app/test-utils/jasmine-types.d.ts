/**
 * Jasmine type definitions for testing utilities
 * This file provides simplified type definitions for Jasmine testing framework
 */

declare namespace jasmine {
  type SpyObj<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? jasmine.Spy : T[K];
  };

  interface Spy {
    (...args: any[]): any;
    and: jasmine.SpyAnd;
    calls: jasmine.Calls;
  }

  interface SpyAnd {
    returnValue(val: any): jasmine.Spy;
    callFake(fn: Function): jasmine.Spy;
    callThrough(): jasmine.Spy;
    stub(): jasmine.Spy;
  }

  interface Calls {
    all(): any[];
    count(): number;
    reset(): void;
  }

  function createSpyObj<T>(baseName: string, methodNames: (keyof T)[]): SpyObj<T>;
  function createSpy(name: string, originalFn?: Function): Spy;
  let DEFAULT_TIMEOUT_INTERVAL: number;
}
