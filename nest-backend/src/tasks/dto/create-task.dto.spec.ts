import { CreateTaskDto } from './create-task.dto';

describe('CreateTaskDto', () => {
  it('should be defined', () => {
    expect(CreateTaskDto).toBeDefined();
  });

  it('should create an instance with valid data', () => {
    const dto = new CreateTaskDto();
    dto.title = 'Test Task';
    dto.description = 'Test Description';

    expect(dto.title).toBe('Test Task');
    expect(dto.description).toBe('Test Description');
  });

  it('should allow empty strings', () => {
    const dto = new CreateTaskDto();
    dto.title = '';
    dto.description = '';

    expect(dto.title).toBe('');
    expect(dto.description).toBe('');
  });

  it('should allow long strings', () => {
    const dto = new CreateTaskDto();
    const longString = 'a'.repeat(1000);
    dto.title = longString;
    dto.description = longString;

    expect(dto.title).toBe(longString);
    expect(dto.description).toBe(longString);
  });
});
