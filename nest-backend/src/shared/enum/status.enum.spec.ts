import { Status } from './status.enum';

describe('Status', () => {
  it('should be defined', () => {
    expect(Status).toBeDefined();
  });

  it('should have all required status values', () => {
    expect(Status.PENDING).toBe('Pending');
    expect(Status.INPROGRESS).toBe('In-progress');
    expect(Status.COMPLETED).toBe('Completed');
    expect(Status.OVERDUE).toBe('Overdue');
    expect(Status.DELETED).toBe('Deleted');
  });

  it('should have correct string values', () => {
    expect(typeof Status.PENDING).toBe('string');
    expect(typeof Status.INPROGRESS).toBe('string');
    expect(typeof Status.COMPLETED).toBe('string');
    expect(typeof Status.OVERDUE).toBe('string');
    expect(typeof Status.DELETED).toBe('string');
  });

  it('should be usable as enum values', () => {
    const status = Status.PENDING;
    expect(status).toBe('Pending');
  });

  it('should have all expected enum keys', () => {
    const expectedKeys = ['PENDING', 'INPROGRESS', 'COMPLETED', 'OVERDUE', 'DELETED'];
    const actualKeys = Object.keys(Status);
    
    expectedKeys.forEach(key => {
      expect(actualKeys).toContain(key);
    });
  });
});
