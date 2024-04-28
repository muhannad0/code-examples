import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();
app.get('/', (c) => c.text('Hello from Node.js!'));

const server = serve(
  { fetch: app.fetch, port: Number(process.env.PORT) || 3000 },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

function shutdown() {
  console.log('Server is shutting down...');
  server.close();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
