const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

describe('Auth Middleware', () => {
  it('should attach userId to request with valid token', () => {
    const userId = 'test-user-id';
    const token = jwt.sign({ userId }, 'your-secret-key');
    
    const req = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };
    
    const res = {};
    const next = jest.fn();
    
    authMiddleware(req, res, next);
    
    expect(req.userId).toBe(userId);
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 without token', () => {
    const req = {
      headers: {}
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    const next = jest.fn();
    
    authMiddleware(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
  });

  it('should return 401 with invalid token', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalid-token'
      }
    };
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    const next = jest.fn();
    
    authMiddleware(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
  });
});
