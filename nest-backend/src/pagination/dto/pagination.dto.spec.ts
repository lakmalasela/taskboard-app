import { PaginationDto } from './pagination.dto';

describe('PaginationDto', () => {
  it('should be defined', () => {
    expect(PaginationDto).toBeDefined();
  });

  it('should create an instance with valid data', () => {
    const dto = new PaginationDto();
    dto.page = 1;
    dto.limit = 10;
    dto.search = 'test';

    expect(dto.page).toBe(1);
    expect(dto.limit).toBe(10);
    expect(dto.search).toBe('test');
  });

  it('should allow undefined values', () => {
    const dto = new PaginationDto();

    expect(dto.page).toBeUndefined();
    expect(dto.limit).toBeUndefined();
    expect(dto.search).toBeUndefined();
  });

  it('should allow partial data', () => {
    const dto = new PaginationDto();
    dto.page = 2;

    expect(dto.page).toBe(2);
    expect(dto.limit).toBeUndefined();
    expect(dto.search).toBeUndefined();
  });

  it('should allow string numbers for page and limit', () => {
    const dto = new PaginationDto();
    dto.page = '1' as any;
    dto.limit = '10' as any;

    expect(dto.page).toBe('1');
    expect(dto.limit).toBe('10');
  });

  it('should allow empty search string', () => {
    const dto = new PaginationDto();
    dto.search = '';

    expect(dto.search).toBe('');
  });
});
