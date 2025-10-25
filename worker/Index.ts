interface Env {
  VEHICLES: KVNamespace;
  CUSTOMERS: KVNamespace;
  SALES: KVNamespace;
  TASKS: KVNamespace;
  TIME_LOGS: KVNamespace;
  MAINTENANCES: KVNamespace;
  FOLLOW_UPS: KVNamespace;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  status: 'available' | 'sold' | 'maintenance';
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Sale {
  id: number;
  vehicleId: number;
  customerId: number;
  saleDate: string;
  salePrice: number;
}

export interface Task {
  id: number;
  description: string;
  dueDate: string;
  status: 'pending' | 'in progress' | 'completed';
}

export interface TimeLog {
  id: number;
  taskId: number;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface Maintenance {
  id: number;
  vehicleId: number;
  description: string;
  date: string;
  cost: number;
}

export interface FollowUp {
  id: number;
  customerId: number;
  date: string;
  notes: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    const handleEntity = async <T>(namespace: KVNamespace, id?: string): Promise<Response> => {
      if (request.method === 'GET' && !id) {
        const list = await namespace.list();
        const items: T[] = [];
        for (const key of list.keys) {
          const item = await namespace.get(key.name, { type: 'json' });
          if (item) items.push(item as T);
        }
        return new Response(JSON.stringify(items), { status: 200 });
      } else if (request.method === 'GET' && id) {
        const item = await namespace.get(id, { type: 'json' });
        return item
          ? new Response(JSON.stringify(item), { status: 200 })
          : new Response('Not found', { status: 404 });
      } else if (request.method === 'POST') {
        const body = await request.json<T>();
        const newId = Date.now().toString();
        await namespace.put(newId, JSON.stringify({ ...body, id: Number(newId) }));
        return new Response(JSON.stringify({ id: Number(newId) }), { status: 201 });
      } else if (request.method === 'PUT' && id) {
        const body = await request.json<T>();
        await namespace.put(id, JSON.stringify({ ...body, id: Number(id) }));
        return new Response(null, { status: 204 });
      } else if (request.method === 'DELETE' && id) {
        await namespace.delete(id);
        return new Response(null, { status: 204 });
      }
      return new Response('Method not allowed', { status: 405 });
    };

    try {
      if (path.startsWith('/vehicles')) {
        const id = path.split('/')[2];
        return handleEntity<Vehicle>(env.VEHICLES, id);
      } else if (path.startsWith('/customers')) {
        const id = path.split('/')[2];
        return handleEntity<Customer>(env.CUSTOMERS, id);
      } else if (path.startsWith('/sales')) {
        const id = path.split('/')[2];
        return handleEntity<Sale>(env.SALES, id);
      } else if (path.startsWith('/tasks')) {
        const id = path.split('/')[2];
        return handleEntity<Task>(env.TASKS, id);
      } else if (path.startsWith('/time-logs')) {
        const id = path.split('/')[2];
        return handleEntity<TimeLog>(env.TIME_LOGS, id);
      } else if (path.startsWith('/maintenances')) {
        const id = path.split('/')[2];
        return handleEntity<Maintenance>(env.MAINTENANCES, id);
      } else if (path.startsWith('/follow-ups')) {
        const id = path.split('/')[2];
        return handleEntity<FollowUp>(env.FOLLOW_UPS, id);
      } else if (path === '/dms-sync') {
        // Mock DMS sync: fetch external data and store in KV
        const endpoint = env.DMS_API_ENDPOINT || 'https://mock-dms-api.example.com';
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('DMS fetch failed');
        const data = await response.json();
        // Store data in respective KV namespaces (simplified)
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      return new Response('Not found', { status: 404 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
  },
};
