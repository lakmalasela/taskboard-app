import { UpdateTaskDto } from './update-task.dto';

describe('UpdateTaskDto', () => {
  it('should be defined', () => {
    expect(UpdateTaskDto).toBeDefined();
  });

  it('should create an instance with valid data', () => {
    const dto = new UpdateTaskDto();
    dto.title = 'Updated Task';
    dto.description = 'Updated Description';

    expect(dto.title).toBe('Updated Task');
    expect(dto.description).toBe('Updated Description');
  });

  it('should allow undefined values', () => {
    const dto = new UpdateTaskDto();

    expect(dto.title).toBeUndefined();
    expect(dto.description).toBeUndefined();
  });

  it('should allow partial updates', () => {
    const dto = new UpdateTaskDto();
    dto.title = 'Updated Title Only';

    expect(dto.title).toBe('Updated Title Only');
    expect(dto.description).toBeUndefined();
  });

  it('should allow empty strings', () => {
    const dto = new UpdateTaskDto();
    dto.title = '';
    dto.description = '';

    expect(dto.title).toBe('');
    expect(dto.description).toBe('');
  });
});
