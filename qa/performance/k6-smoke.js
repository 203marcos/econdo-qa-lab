import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    http_req_failed: ['rate<0.02'],
    http_req_duration: ['p(95)<700'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const health = http.get(`${BASE_URL}/health`);
  check(health, {
    'health status 200': (res) => res.status === 200,
    'health body ok': (res) => res.json('status') === 'ok',
  });

  const validLogin = http.post(
    `${BASE_URL}/api/login`,
    JSON.stringify({ email: 'admin@econdo.com', password: 'admin123' }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(validLogin, {
    'valid login status 200': (res) => res.status === 200,
    'set-cookie returned': (res) => String(res.headers['Set-Cookie'] || '').includes('session_token='),
  });

  sleep(1);
}
