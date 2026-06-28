import { render } from '@testing-library/react-native';
import ApiService from '../src/services/api';

describe('ApiService', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should set and use token', () => {
    const testToken = 'test-jwt-token';
    ApiService.setToken(testToken);
    
    const headers = ApiService.getHeaders();
    expect(headers.Authorization).toBe(`Bearer ${testToken}`);
  });

  it('should include Content-Type header', () => {
    const headers = ApiService.getHeaders();
    expect(headers['Content-Type']).toBe('application/json');
  });

  it('should construct proper authorization header', () => {
    const token = 'my-token';
    ApiService.setToken(token);
    
    const headers = ApiService.getHeaders();
    expect(headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('should not include auth header when no token set', () => {
    ApiService.token = null;
    const headers = ApiService.getHeaders();
    expect(headers.Authorization).toBeUndefined();
  });
});
