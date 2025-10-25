
interface Env {
  VEHICLES: KVNamespace;
  CUSTOMERS: KVNamespace;
  SALES: KVNamespace;
  TASKS: KVNamespace;
  TIME_LOGS: KVNamespace;
  MAINTENANCES: KVNamespace;
  FOLLOW_UPS: KVNamespace;
  APPOINTMENTS: KVNamespace;
  SCHEDULES: KVNamespace;
  PHOTOS: R2Bucket;
  DMS_API_ENDPOINT: string;
  SENDGRID_API_KEY: string;
  TWILIO_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_PHONE_NUMBER: string;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  purchasePrice: number;
  reconditioningCost: number;
  mileage: number;
  status: 'available' | 'sold' | 'maintenance';
  stockNumber: string;
  vin?: string;
  photos?: string[];
  dateAdded: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'hot' | 'warm' | 'cold';
  vehicleInterest?: number[];
  lastContactDate?: string;
  testDrive: boolean;
  notes?: string;
}

export interface Sale {
  id: number;
  vehicleId: number;
  customerId: number;
  saleDate: string;
  salePrice: number;
  purchasePrice: number;
  paymentMethod: 'cash' | 'finance';
  salesperson: string;
}

export interface Task {
  id: number;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in progress' | 'completed';
  assignedTo: 'Dan' | 'Boss';
  notes?: string;
}

export interface TimeLog {
  id: number;
  taskId: number;
  startTime: string;
  endTime: string;
  duration: number;
  description?: string;
  user: 'Dan' | 'Boss';
}

export interface Maintenance {
  id: number;
  vehicleId: number;
  description: string;
  date: string;
  cost: number;
  status: 'completed' | 'in progress';
  photos?: string[];
  notes?: string;
}

export interface FollowUp {
  id: number;
  customerId: number;
  date: string;
  notes: string;
  type: 'test_drive' | 'price_quote' | 'trade_in' | 'financing' | 'general' | 'service';
  status: 'pending' | 'completed';
  vehicleId?: number;
}

export interface Appointment {
  id: number;
  type: 'test_drive' | 'service' | 'consultation';
  date: string;
  time: string;
  customerId: number;
  vehicleId?: number;
}

export interface ReportSchedule {
  id: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  deliveryMethod: 'email' | 'sms';
  recipient: string;
}

export interface User {
  role: 'Dan' | 'Boss';
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const authHeader = request.headers.get('Authorization');

    // Mock role-based access; replace with JWT or API key in production
    const user: User = { role: authHeader === 'Bearer boss-token' ? 'Boss' : 'Dan' };

    // Generic handler for CRUD operations
    const handleEntity = async <T>(namespace: KVNamespace, id?: string): Promise<Response> => {
      if (request.method === 'GET' && !id) {
        const list = await namespace.list();
        const items: T[] = [];
        for (const key of list.keys) {
          const item = await namespace.get(key.name, { type: 'json' });
          if (item) items.push(item as T);
        }
        return new Response(JSON.stringify({ data: items }), { status: 200 });
      } else if (request.method === 'GET' && id) {
        const item = await namespace.get(id, { type: 'json' });
        return item
          ? new Response(JSON.stringify({ data: item }), { status: 200 })
          : new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
      } else if (request.method === 'POST') {
        const body = await request.json<T>();
        const newId = Date.now().toString();
        await namespace.put(newId, JSON.stringify({ ...body, id: Number(newId) }));
        return new Response(JSON.stringify({ data: { id: Number(newId) } }), { status: 201 });
      } else if (request.method === 'PUT' && id) {
        const body = await request.json<T>();
        await namespace.put(id, JSON.stringify({ ...body, id: Number(id) }));
        return new Response(null, { status: 204 });
      } else if (request.method === 'DELETE' && id) {
        if (user.role !== 'Boss') {
          return new Response(JSON.stringify({ error: 'Unauthorized: Boss role required' }), { status: 403 });
        }
        await namespace.delete(id);
        return new Response(null, { status: 204 });
      }
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    };

    // Handle photo uploads to R2
    const handlePhotoUpload = async (): Promise<Response> => {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
      }
      const formData = await request.formData();
      const file = formData.get('photo') as File;
      if (!file) {
        return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
      }
      const key = `photo-${Date.now()}-${file.name}`;
      await env.PHOTOS.put(key, file.stream());
      const url = `https://${url.host}/r2/${key}`;
      return new Response(JSON.stringify({ data: { url } }), { status: 201 });
    };

    // Handle scheduled report delivery
    const handleScheduledReport = async (): Promise<Response> => {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
      }
      if (user.role !== 'Boss') {
        return new Response(JSON.stringify({ error: 'Unauthorized: Boss role required' }), { status: 403 });
      }
      const schedules = await env.SCHEDULES.list();
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().slice(0, 5);

      for (const key of schedules.keys) {
        const schedule = await env.SCHEDULES.get(key.name, { type: 'json' }) as ReportSchedule;
        if (schedule.time === currentTime) {
          // Generate report (simplified; fetch data from KV)
          const vehicles = (await (await env.VEHICLES.list()).keys.map(k => env.VEHICLES.get(k.name, { type: 'json' }))) as Vehicle[];
          const reportContent = `Daily Report (${today}):\nVehicles: ${vehicles.length}\n...`; // Add more data as needed
          if (schedule.deliveryMethod === 'email') {
            sgMail.setApiKey(env.SENDGRID_API_KEY);
            await sgMail.send({
              to: schedule.recipient,
              from: 'reports@danscarlot.com',
              subject: `Car Lot Report - ${schedule.frequency}`,
              text: reportContent,
            });
          } else if (schedule.deliveryMethod === 'sms') {
            const client = new Twilio(env.TWILIO_SID, env.TWILIO_AUTH_TOKEN);
            await client.messages.create({
              body: reportContent,
              from: env.TWILIO_PHONE_NUMBER,
              to: schedule.recipient,
            });
          }
        }
      }
      return new Response(JSON.stringify({ data: { success: true } }), { status: 200 });
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
      } else if (path.startsWith('/appointments')) {
        const id = path.split('/')[2];
        return handleEntity<Appointment>(env.APPOINTMENTS, id);
      } else if (path.startsWith('/schedules')) {
        const id = path.split('/')[2];
        return handleEntity<ReportSchedule>(env.SCHEDULES, id);
      } else if (path === '/upload-photo') {
        return handlePhotoUpload();
      } else if (path === '/dms-sync') {
        if (user.role !== 'Boss') {
          return new Response(JSON.stringify({ error: 'Unauthorized: Boss role required' }), { status: 403 });
        }
        const response = await fetch(env.DMS_API_ENDPOINT);
        if (!response.ok) throw new Error('DMS fetch failed');
        const data = await response.json();
        // Store data in respective KV namespaces (simplified)
        return new Response(JSON.stringify({ data: { success: true } }), { status: 200 });
      } else if (path === '/send-report') {
        return handleScheduledReport();
      }
      return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    } catch (error) {
      return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
    }
  },

  // Scheduled handler for report delivery
  async scheduled(event: ScheduledEvent, env: Env): Promise<void> {
    const response = await fetch(`https://${event.cron.includes('daily') ? 'daily' : event.cron.includes('weekly') ? 'weekly' : 'monthly'}.dans-car-lot-manager.workers.dev/send-report`, {
      method: 'POST',
      headers: { Authorization: 'Bearer boss-token' },
    });
    if (!response.ok) {
      console.error('Scheduled report failed:', await response.text());
    }
  },
};
