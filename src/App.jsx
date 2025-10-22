import React from 'react'
import { Clock, Car, Wrench } from 'lucide-react'

export default function App() {
  return (
    <div>
      <header className="p-4 bg-carlot-primary text-white">
        <h1 className="text-3xl font-bold">Car Lot Manager</h1>
      </header>
      <main className="p-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">Welcome to the app</h2>
          <Clock className="inline-block mr-2" />
          <Car className="inline-block mr-2" />
          <Wrench className="inline-block" />
        </section>
      </main>
    </div>
  )
}
