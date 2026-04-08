const request = require('supertest');
const { app } = require('../../../src/server');

describe('Auth API', () => {
  it('GET /health should return ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('POST /api/login should return 400 for invalid email format', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'email-invalido',
      password: 'admin123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('invalid email format');
  });

  it('POST /api/register should reject weak password', async () => {
    const response = await request(app).post('/api/register').send({
      name: 'QA Fraco',
      email: `qa.fraco.${Date.now()}@econdo.com`,
      password: '123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('password must have at least 8 characters');
  });

  it('POST /api/login should set auth cookie on success', async () => {
    const response = await request(app).post('/api/login').send({
      email: 'admin@econdo.com',
      password: 'admin123',
    });

    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
  });

  it('POST /api/register should create account with normalized email', async () => {
    const response = await request(app).post('/api/register').send({
      name: 'QA Novo',
      email: ` QA.NOVO.${Date.now()}@ECONDO.COM `,
      password: 'qa123456',
    });

    expect(response.status).toBe(201);
    expect(response.body.user.email).toMatch(/qa\.novo\..*@econdo\.com/);
  });

  it('POST /api/register should reject duplicate email', async () => {
    const email = `qa.duplicado.${Date.now()}@econdo.com`;

    await request(app).post('/api/register').send({
      name: 'QA Duplicado 1',
      email,
      password: 'qa123456',
    });

    const duplicated = await request(app).post('/api/register').send({
      name: 'QA Duplicado 2',
      email,
      password: 'qa123456',
    });

    expect(duplicated.status).toBe(409);
    expect(duplicated.body.message).toBe('email already registered');
  });

  it('GET /api/me should return 401 without session', async () => {
    const response = await request(app).get('/api/me');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('token missing');
  });

  it('POST /api/logout should clear cookie and invalidate protected route', async () => {
    const agent = request.agent(app);

    const login = await agent.post('/api/login').send({
      email: 'admin@econdo.com',
      password: 'admin123',
    });

    expect(login.status).toBe(200);

    const meBeforeLogout = await agent.get('/api/me');
    expect(meBeforeLogout.status).toBe(200);

    const logout = await agent.post('/api/logout');
    expect(logout.status).toBe(200);

    const meAfterLogout = await agent.get('/api/me');
    expect(meAfterLogout.status).toBe(401);
  });
});
