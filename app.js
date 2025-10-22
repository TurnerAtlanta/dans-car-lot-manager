import React, { useState } from 'react';
import { Clock, CheckSquare, Car, Wrench, Plus, Edit2, Trash2, Save, X, Download, Share2, Upload, Calendar, Mail, MessageSquare, History } from 'lucide-react';

export default function CarLotManager() {
  const [activeTab, setActiveTab] = useState('timeLog');
  const [userRole, setUserRole] = useState('employee');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showVehicleDetail, setShowVehicleDetail] = useState(null);
  const [showDMSModal, setShowDMSModal] = useState(false);
  const [showDMSGuide, setShowDMSGuide] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [dmsConnected, setDmsConnected] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showFinancialModal, setShowFinancialModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [scheduleFrequency, setScheduleFrequency] = useState('daily');
  const [scheduleTime, setScheduleTime] = useState('17:00');
  const [shareMethod, setShareMethod] = useState('email');
  const [recipientEmail, setRecipientEmail] = useState('boss@carlot.com');
  const [recipientPhone, setRecipientPhone] = useState('555-0123');

  // Time Log State
  const [timeEntries, setTimeEntries] = useState([
    { id: 1, time: '09:00 AM', activity: 'Opened lot, checked inventory', duration: '30 min', editable: false },
    { id: 2, time: '10:15 AM', activity: 'Customer walkthrough - 2018 Honda Accord', duration: '45 min', editable: false },
  ]);
  const [newActivity, setNewActivity] = useState('');
  const [editingEntry, setEditingEntry] = useState(null);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Detail 2020 Toyota Camry', completed: false, assignedBy: 'boss', priority: 'high' },
    { id: 2, task: 'Follow up with customer - John Smith', completed: false, assignedBy: 'employee', priority: 'medium' },
    { id: 3, task: 'Update prices on lot signs', completed: true, assignedBy: 'boss', priority: 'low' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');

  // Vehicles State with Photos
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      year: '2020',
      make: 'Toyota',
      model: 'Camry',
      status: 'Available',
      price: '$22,500',
      purchasePrice: '$18,000',
      reconCost: '$800',
      stock: 'TC-2020-01',
      photos: ['🚗', '📸', '📸'],
      soldDate: null,
      soldPrice: null,
      maintenanceHistory: [
        { date: '2025-10-15', service: 'Interior detailing', status: 'Completed', notes: 'Ready for showroom', photos: ['🧽'], cost: '$150' },
        { date: '2025-09-20', service: 'Full inspection', status: 'Completed', notes: 'Passed all checks', photos: [], cost: '$75' }
      ]
    },
    {
      id: 2,
      year: '2018',
      make: 'Honda',
      model: 'Accord',
      status: 'In Service',
      price: '$18,900',
      purchasePrice: '$15,500',
      reconCost: '$650',
      stock: 'HA-2018-02',
      photos: ['🚙', '📸'],
      soldDate: null,
      soldPrice: null,
      maintenanceHistory: [
        { date: '2025-10-18', service: 'Oil change and inspection', status: 'In Progress', notes: 'Due back by 2 PM', photos: ['🔧'], cost: '$125' }
      ]
    },
  ]);

  // Maintenance State
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    { id: 1, vehicleId: 1, vehicle: 'TC-2020-01', date: '2025-10-15', service: 'Interior detailing', status: 'Completed', notes: 'Ready for showroom', photos: ['🧽'], cost: '$150' },
    { id: 2, vehicleId: 2, vehicle: 'HA-2018-02', date: '2025-10-18', service: 'Oil change and inspection', status: 'In Progress', notes: 'Due back by 2 PM', photos: ['🔧'], cost: '$125' },
  ]);

  // Follow-up Reminders State
  const [followUps, setFollowUps] = useState([
    { id: 1, customer: 'John Smith', vehicle: 'TC-2020-01', type: 'Test Drive Follow-up', dueDate: '2025-10-20', status: 'pending', notes: 'Interested in Camry, wants to think about financing', phone: '555-0101', email: 'john.smith@email.com' },
    { id: 2, customer: 'Sarah Johnson', vehicle: 'HA-2018-02', type: 'Price Quote Follow-up', dueDate: '2025-10-19', status: 'pending', notes: 'Requested quote for Accord, compare with competitors', phone: '555-0102', email: 'sarah.j@email.com' },
    { id: 3, customer: 'Mike Williams', vehicle: 'N/A', type: 'General Inquiry', dueDate: '2025-10-18', status: 'completed', notes: 'Looking for trucks, called back already', phone: '555-0103', email: 'mike.w@email.com' },
  ]);
  const [newFollowUp, setNewFollowUp] = useState({
    customer: '',
    vehicle: '',
    type: 'Test Drive Follow-up',
    dueDate: '',
    notes: '',
    phone: '',
    email: ''
  });

  // Customer Database State
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Smith', phone: '555-0101', email: 'john.smith@email.com', status: 'Hot Lead', lastContact: '2025-10-17', vehicleInterest: 'TC-2020-01', notes: 'Interested in financing options', testDrive: true },
    { id: 2, name: 'Sarah Johnson', phone: '555-0102', email: 'sarah.j@email.com', status: 'Warm Lead', lastContact: '2025-10-16', vehicleInterest: 'HA-2018-02', notes: 'Price shopping', testDrive: false },
    { id: 3, name: 'Mike Williams', phone: '555-0103', email: 'mike.w@email.com', status: 'Cold Lead', lastContact: '2025-10-10', vehicleInterest: 'FF-2021-03', notes: 'Looking for trucks', testDrive: false },
  ]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    status: 'Warm Lead',
    vehicleInterest: '',
    notes: '',
    testDrive: false
  });

  // Sales Tracking State
  const [sales, setSales] = useState([
    { id: 1, date: '2025-10-15', customer: 'Robert Davis', vehicle: '2019 Ford Escape', stock: 'FE-2019-05', soldPrice: '$19,500', purchasePrice: '$16,000', profit: '$3,500', paymentMethod: 'Finance', salesperson: 'Dan' },
    { id: 2, date: '2025-10-12', customer: 'Lisa Martinez', vehicle: '2020 Nissan Altima', stock: 'NA-2020-06', soldPrice: '$21,000', purchasePrice: '$17,500', profit: '$3,500', paymentMethod: 'Cash', salesperson: 'Dan' },
  ]);

  // Auto Schedule State
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, frequency: 'daily', time: '17:00', method: 'email', recipient: 'boss@carlot.com', active: true },
  ]);

  // DMS Integration
  const [dmsConfig, setDmsConfig] = useState({
    apiKey: '',
    dealershipId: '',
    endpoint: 'https://api.waynereeves.com/v1'
  });

  const syncWithDMS = () => {
    setIsSyncing(true);
    // Simulate API call
    setTimeout(() => {
      // Simulate adding vehicles from DMS
      const dmsVehicles = [
        {
          id: 3,
          year: '2021',
          make: 'Ford',
          model: 'F-150',
          status: 'Available',
          price: '$35,900',
          purchasePrice: '$30,000',
          reconCost: '$1,200',
          stock: 'FF-2021-03',
          photos: ['🚚', '📸'],
          soldDate: null,
          soldPrice: null,
          maintenanceHistory: [
            { date: '2025-10-10', service: 'Pre-delivery inspection', status: 'Completed', notes: 'All systems checked', photos: ['✅'], cost: '$200' }
          ]
        },
        {
          id: 4,
          year: '2019',
          make: 'Chevrolet',
          model: 'Silverado',
          status: 'Available',
          price: '$28,500',
          purchasePrice: '$24,000',
          reconCost: '$900',
          stock: 'CS-2019-04',
          photos: ['🚙'],
          soldDate: null,
          soldPrice: null,
          maintenanceHistory: []
        }
      ];

      // Add new vehicles without duplicating existing ones
      const existingStocks = vehicles.map(v => v.stock);
      const newVehicles = dmsVehicles.filter(v => !existingStocks.includes(v.stock));
      setVehicles([...vehicles, ...newVehicles]);
      
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString());
      setDmsConnected(true);
      alert(`Successfully synced! Added ${newVehicles.length} vehicles from Wayne Reeves DMS`);
    }, 2000);
  };

  // Follow-up Functions
  const addFollowUp = () => {
    if (newFollowUp.customer && newFollowUp.dueDate) {
      setFollowUps([...followUps, {
        id: Date.now(),
        ...newFollowUp,
        status: 'pending'
      }]);
      setNewFollowUp({
        customer: '',
        vehicle: '',
        type: 'Test Drive Follow-up',
        dueDate: '',
        notes: '',
        phone: '',
        email: ''
      });
      setShowFollowUpModal(false);
    }
  };

  const completeFollowUp = (id) => {
    setFollowUps(followUps.map(f => f.id === id ? { ...f, status: 'completed' } : f));
  };

  const deleteFollowUp = (id) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  // Customer Functions
  const addCustomer = () => {
    if (newCustomer.name) {
      const customer = {
        id: Date.now(),
        ...newCustomer,
        lastContact: new Date().toISOString().split('T')[0]
      };
      setCustomers([...customers, customer]);
      setNewCustomer({
        name: '',
        phone: '',
        email: '',
        status: 'Warm Lead',
        vehicleInterest: '',
        notes: '',
        testDrive: false
      });
    }
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const getLeadStats = () => {
    return {
      hot: customers.filter(c => c.status === 'Hot Lead').length,
      warm: customers.filter(c => c.status === 'Warm Lead').length,
      cold: customers.filter(c => c.status === 'Cold Lead').length
    };
  };

  const getSalesStats = () => {
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, s) => sum + parseFloat(s.soldPrice.replace(/[$,]/g, '')), 0);
    const totalProfit = sales.reduce((sum, s) => sum + parseFloat(s.profit.replace(/[$,]/g, '')), 0);
    const avgProfit = totalSales > 0 ? totalProfit / totalSales : 0;

    return { totalSales, totalRevenue, totalProfit, avgProfit };
  };

  // Financial Calculations
  const calculateVehicleProfit = (vehicle) => {
    const price = parseFloat(vehicle.price.replace(/[$,]/g, ''));
    const purchase = parseFloat(vehicle.purchasePrice.replace(/[$,]/g, ''));
    const recon = parseFloat(vehicle.reconCost.replace(/[$,]/g, ''));
    const maintenanceCosts = vehicle.maintenanceHistory.reduce((sum, record) => {
      return sum + (record.cost ? parseFloat(record.cost.replace(/[$,]/g, '')) : 0);
    }, 0);

    const totalCost = purchase + recon + maintenanceCosts;
    const projectedProfit = price - totalCost;

    return {
      listPrice: price,
      totalCost: totalCost,
      projectedProfit: projectedProfit,
      profitMargin: ((projectedProfit / price) * 100).toFixed(1)
    };
  };

  const getInventoryStats = () => {
    const available = vehicles.filter(v => v.status === 'Available').length;
    const inService = vehicles.filter(v => v.status === 'In Service').length;
    const totalInvestment = vehicles.reduce((sum, v) => {
      return sum + parseFloat(v.purchasePrice.replace(/[$,]/g, '')) + parseFloat(v.reconCost.replace(/[$,]/g, ''));
    }, 0);
    const totalValue = vehicles.reduce((sum, v) => {
      return sum + parseFloat(v.price.replace(/[$,]/g, ''));
    }, 0);
    const projectedProfit = totalValue - totalInvestment;

    return { available, inService, totalInvestment, totalValue, projectedProfit };
  };

  // Time Log Functions
  const addTimeEntry = () => {
    if (newActivity.trim()) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setTimeEntries([...timeEntries, {
        id: Date.now(),
        time: timeStr,
        activity: newActivity,
        duration: 'Just started',
        editable: false
      }]);
      setNewActivity('');
    }
  };

  const deleteTimeEntry = (id) => {
    setTimeEntries(timeEntries.filter(e => e.id !== id));
  };

  const startEditEntry = (entry) => {
    setEditingEntry({ ...entry });
  };

  const saveEditEntry = () => {
    setTimeEntries(timeEntries.map(e => e.id === editingEntry.id ? editingEntry : e));
    setEditingEntry(null);
  };

  // Task Functions
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        task: newTask,
        completed: false,
        assignedBy: userRole,
        priority: taskPriority
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Export Functions
  const generateReport = () => {
    const today = new Date().toLocaleDateString();
    let report = `CAR LOT DAILY REPORT - ${today}\n`;
    report += `Generated by: ${userRole === 'employee' ? 'Dan' : 'Boss'}\n`;
    report += `\n${'='.repeat(50)}\n`;

    report += `\nTIME LOG (${timeEntries.length} entries)\n`;
    report += `${'-'.repeat(50)}\n`;
    timeEntries.forEach(entry => {
      report += `${entry.time} | ${entry.duration} | ${entry.activity}\n`;
    });

    report += `\n\nTASKS (${tasks.filter(t => !t.completed).length} pending, ${tasks.filter(t => t.completed).length} completed)\n`;
    report += `${'-'.repeat(50)}\n`;
    tasks.forEach(task => {
      const status = task.completed ? '✓' : '○';
      report += `${status} [${task.priority.toUpperCase()}] ${task.task}\n`;
    });

    report += `\n\nVEHICLE STATUS\n`;
    report += `${'-'.repeat(50)}\n`;
    vehicles.forEach(v => {
      report += `${v.stock} - ${v.year} ${v.make} ${v.model} - ${v.status} - ${v.price}\n`;
    });

    report += `\n\nMAINTENANCE RECORDS\n`;
    report += `${'-'.repeat(50)}\n`;
    maintenanceRecords.forEach(r => {
      report += `${r.date} | ${r.vehicle} | ${r.service} - ${r.status}\n`;
      if (r.notes) report += `  Notes: ${r.notes}\n`;
    });

    return report;
  };

  const exportReport = () => {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carlot-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const printReport = () => {
    const report = generateReport();
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Car Lot Report</title>');
    printWindow.document.write('<style>body{font-family:monospace;padding:20px;} h1{color:#1e40af;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<pre>' + report + '</pre>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    setShowExportModal(false);
  };

  const scheduleReport = () => {
    const newSchedule = {
      id: Date.now(),
      frequency: scheduleFrequency,
      time: scheduleTime,
      method: shareMethod,
      recipient: shareMethod === 'email' ? recipientEmail : recipientPhone,
      active: true
    };
    setScheduledReports([...scheduledReports, newSchedule]);
    setShowScheduleModal(false);
    alert(`Report scheduled! Will be sent ${scheduleFrequency} at ${scheduleTime} via ${shareMethod}`);
  };

  const deleteSchedule = (id) => {
    setScheduledReports(scheduledReports.filter(s => s.id !== id));
  };

  const handlePhotoUpload = (vehicleId) => {
    // Simulated photo upload
    alert(`Photo upload feature activated for vehicle ${vehicleId}. In production, this would open your device camera or file picker.`);
    // Add emoji as placeholder photo
    setVehicles(vehicles.map(v =>
      v.id === vehicleId ? { ...v, photos: [...v.photos, '📷'] } : v
    ));
  };

  const addMaintenanceToVehicle = (vehicleId, maintenance) => {
    setVehicles(vehicles.map(v =>
      v.id === vehicleId
        ? { ...v, maintenanceHistory: [...v.maintenanceHistory, maintenance] }
        : v
    ));
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Car Lot Manager</h1>
              <p className="text-gray-600 mt-1">Time Tracking & Task Management</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDMSModal(true)}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
              >
                <Share2 size={18} />
                {dmsConnected ? 'DMS Connected' : 'Sync with DMS'}
              </button>
              <button
                onClick={() => setShowFollowUpModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Clock size={18} />
                Follow-ups ({followUps.filter(f => f.status === 'pending').length})
              </button>
              <button
                onClick={() => setShowFinancialModal(true)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2"
              >
                💰 Financials
              </button>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition flex items-center gap-2"
              >
                👥 Customers ({customers.length})
              </button>
              <button
                onClick={() => setShowSalesModal(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition flex items-center gap-2"
              >
                📈 Sales ({sales.length})
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Download size={18} />
                Export
              </button>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
              >
                <Calendar size={18} />
                Schedule
              </button>
              <button
                onClick={() => setUserRole('employee')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  userRole === 'employee'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Dan
              </button>
              <button
                onClick={() => setUserRole('boss')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  userRole === 'boss'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Boss
              </button>
            </div>
          </div>
        </div>

        {/* Scheduled Reports Display */}
        {scheduledReports.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <Calendar size={18} />
              Active Report Schedules
            </h3>
            <div className="space-y-2">
              {scheduledReports.map(schedule => (
                <div key={schedule.id} className="flex items-center justify-between bg-white p-3 rounded">
                  <div className="flex items-center gap-3 text-sm">
                    {schedule.method === 'email' ? <Mail size={16} /> : <MessageSquare size={16} />}
                    <span className="font-medium capitalize">{schedule.frequency}</span>
                    <span className="text-gray-600">at {schedule.time}</span>
                    <span className="text-gray-600">to {schedule.recipient}</span>
                  </div>
                  <button
                    onClick={() => deleteSchedule(schedule.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DMS Sync Status */}
        {dmsConnected && lastSyncTime && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-green-900">Wayne Reeves DMS Connected</span>
              </div>
              <span className="text-sm text-green-700">Last synced: {lastSyncTime}</span>
            </div>
          </div>
        )}

        {/* Pending Follow-ups Alert */}
        {followUps.filter(f => f.status === 'pending' && new Date(f.dueDate) <= new Date()).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-red-600" />
                <span className="font-bold text-red-900">
                  {followUps.filter(f => f.status === 'pending' && new Date(f.dueDate) <= new Date()).length} Follow-up(s) Due Today!
                </span>
              </div>
              <button
                onClick={() => setShowFollowUpModal(true)}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                View Now
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('timeLog')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'timeLog'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Clock size={20} />
              Time Log
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'tasks'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <CheckSquare size={20} />
              Tasks
            </button>
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'vehicles'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Car size={20} />
              Vehicles
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'maintenance'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Wrench size={20} />
              Maintenance
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Time Log Tab */}
            {activeTab === 'timeLog' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Daily Time Log</h2>
                
                <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTimeEntry()}
                      placeholder="What are you working on?"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={addTimeEntry}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Log Activity
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {timeEntries.map(entry => (
                    <div key={entry.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      {editingEntry?.id === entry.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingEntry.activity}
                            onChange={(e) => setEditingEntry({ ...editingEntry, activity: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={saveEditEntry}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                            >
                              <Save size={16} />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingEntry(null)}
                              className="bg-gray-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-blue-600">{entry.time}</span>
                              <span className="text-sm text-gray-600">{entry.duration}</span>
                            </div>
                            <p className="text-gray-800">{entry.activity}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditEntry(entry)}
                              className="text-gray-600 hover:text-blue-600"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => deleteTimeEntry(entry.id)}
                              className="text-gray-600 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
                
                <div className="mb-6 bg-green-50 p-4 rounded-lg">
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      placeholder="Add a new task..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                    <button
                      onClick={addTask}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Add Task
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                              task.completed
                                ? 'bg-green-600 border-green-600 text-white'
                                : 'border-gray-300 hover:border-green-600'
                            }`}
                          >
                            {task.completed && '✓'}
                          </button>
                          <div className="flex-1">
                            <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {task.task}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                Assigned by: {task.assignedBy}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vehicles Tab */}
            {activeTab === 'vehicles' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Inventory</h2>
                
                <div className="grid gap-6">
                  {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h3>
                          <p className="text-gray-600">Stock: {vehicle.stock}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              vehicle.status === 'Available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {vehicle.status}
                            </span>
                            <span className="text-2xl font-bold text-blue-600">{vehicle.price}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowVehicleDetail(vehicle)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          View Details
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Purchase Price</p>
                          <p className="font-semibold text-gray-800">{vehicle.purchasePrice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Recon Cost</p>
                          <p className="font-semibold text-gray-800">{vehicle.reconCost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Maintenance Records</p>
                          <p className="font-semibold text-gray-800">{vehicle.maintenanceHistory.length} records</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {vehicle.photos.map((photo, idx) => (
                            <span key={idx} className="text-2xl">{photo}</span>
                          ))}
                          <button
                            onClick={() => handlePhotoUpload(vehicle.id)}
                            className="w-10 h-10 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-blue-600 transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">
                          {vehicle.maintenanceHistory.length > 0 && (
                            <span>
                              Last service: {vehicle.maintenanceHistory[vehicle.maintenanceHistory.length - 1].date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Maintenance Records</h2>
                
                <div className="space-y-4">
                  {maintenanceRecords.map(record => (
                    <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-gray-800">{record.service}</h4>
                          <p className="text-gray-600">Vehicle: {record.vehicle}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{record.date}</p>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            record.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                      </div>
                      
                      {record.notes && (
                        <p className="text-gray-700 text-sm mb-2">Notes: {record.notes}</p>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {record.photos.map((photo, idx) => (
                            <span key={idx} className="text-lg">{photo}</span>
                          ))}
                        </div>
                        {record.cost && (
                          <span className="font-semibold text-gray-800">Cost: {record.cost}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Follow-up Modal */}
      {showFollowUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Customer Follow-ups</h2>
                <p className="text-gray-600 mt-1">Manage customer communication reminders</p>
              </div>
              <button
                onClick={() => setShowFollowUpModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Add Follow-up */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-purple-900 mb-3">Schedule New Follow-up</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Customer Name *"
                  value={newFollowUp.customer}
                  onChange={(e) => setNewFollowUp({...newFollowUp, customer: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select
                  value={newFollowUp.vehicle}
                  onChange={(e) => setNewFollowUp({...newFollowUp, vehicle: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Vehicle (Optional)</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.stock}>
                      {v.stock} - {v.year} {v.make} {v.model}
                    </option>
                  ))}
                </select>
                <select
                  value={newFollowUp.type}
                  onChange={(e) => setNewFollowUp({...newFollowUp, type: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Test Drive Follow-up">Test Drive Follow-up</option>
                  <option value="Price Quote Follow-up">Price Quote Follow-up</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Financing Discussion">Financing Discussion</option>
                </select>
                <input
                  type="date"
                  value={newFollowUp.dueDate}
                  onChange={(e) => setNewFollowUp({...newFollowUp, dueDate: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newFollowUp.phone}
                  onChange={(e) => setNewFollowUp({...newFollowUp, phone: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newFollowUp.email}
                  onChange={(e) => setNewFollowUp({...newFollowUp, email: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <textarea
                placeholder="Notes about this follow-up..."
                value={newFollowUp.notes}
                onChange={(e) => setNewFollowUp({...newFollowUp, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                rows="2"
              />
              <button
                onClick={addFollowUp}
                className="w-full bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Schedule Follow-up
              </button>
            </div>

            {/* Pending Follow-ups */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Clock size={18} />
                Pending Follow-ups ({followUps.filter(f => f.status === 'pending').length})
              </h3>
              <div className="space-y-3">
                {followUps.filter(f => f.status === 'pending').map(followUp => {
                  const isOverdue = new Date(followUp.dueDate) < new Date();
                  const isDueToday = new Date(followUp.dueDate).toDateString() === new Date().toDateString();
                  
                  return (
                    <div key={followUp.id} className={`border rounded-lg p-4 hover:shadow-md transition ${
                      isOverdue ? 'border-red-300 bg-red-50' : isDueToday ? 'border-orange-300 bg-orange-50' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-800">{followUp.customer}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              isOverdue ? 'bg-red-100 text-red-800' : 
                              isDueToday ? 'bg-orange-100 text-orange-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {followUp.type}
                            </span>
                            {isOverdue && <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">OVERDUE</span>}
                            {isDueToday && <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">DUE TODAY</span>}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <p>📞 {followUp.phone}</p>
                            <p>📧 {followUp.email}</p>
                            <p>🚗 Vehicle: {followUp.vehicle || 'General'}</p>
                            <p>📅 Due: {followUp.dueDate}</p>
                          </div>
                          {followUp.notes && (
                            <p className="text-sm text-gray-700 italic">"{followUp.notes}"</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => completeFollowUp(followUp.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => deleteFollowUp(followUp.id)}
                            className="text-gray-600 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {followUps.filter(f => f.status === 'pending').length === 0 && (
                  <p className="text-gray-500 text-center py-4 text-sm">No pending follow-ups</p>
                )}
              </div>
            </div>

            {/* Completed Follow-ups */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <History size={18} />
                Completed Follow-ups ({followUps.filter(f => f.status === 'completed').length})
              </h3>
              <div className="space-y-2">
                {followUps.filter(f => f.status === 'completed').map(followUp => (
                  <div key={followUp.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-green-600">✓</span>
                        <div>
                          <span className="font-medium text-gray-800">{followUp.customer}</span>
                          <span className="text-sm text-gray-600 ml-2">- {followUp.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteFollowUp(followUp.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                {followUps.filter(f => f.status === 'completed').length === 0 && (
                  <p className="text-gray-500 text-center py-4 text-sm">No completed follow-ups</p>
                )}
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Follow-ups can be automatically created from customer interactions. 
                Set reminders to ensure no customer inquiry is missed!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Customer Database Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Customer Database</h2>
                <p className="text-gray-600 mt-1">Manage leads and customer relationships</p>
              </div>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Lead Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {(() => {
                const stats = getLeadStats();
                return (
                  <>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-red-600 font-medium">🔥 Hot Leads</p>
                      <p className="text-3xl font-bold text-red-900">{stats.hot}</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-600 font-medium">🌤️ Warm Leads</p>
                      <p className="text-3xl font-bold text-yellow-900">{stats.warm}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-600 font-medium">❄️ Cold Leads</p>
                      <p className="text-3xl font-bold text-blue-900">{stats.cold}</p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Add Customer */}
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-pink-900 mb-3">Add New Customer</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Customer Name *"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <select
                  value={newCustomer.status}
                  onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Hot Lead">🔥 Hot Lead</option>
                  <option value="Warm Lead">🌤️ Warm Lead</option>
                  <option value="Cold Lead">❄️ Cold Lead</option>
                </select>
                <select
                  value={newCustomer.vehicleInterest}
                  onChange={(e) => setNewCustomer({...newCustomer, vehicleInterest: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Vehicle Interest (Optional)</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.stock}>
                      {v.stock} - {v.year} {v.make} {v.model}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Notes"
                  value={newCustomer.notes}
                  onChange={(e) => setNewCustomer({...newCustomer, notes: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={newCustomer.testDrive}
                  onChange={(e) => setNewCustomer({...newCustomer, testDrive: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Test Drive Completed</span>
              </label>
              <button
                onClick={addCustomer}
                className="w-full bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Customer
              </button>
            </div>

            {/* Customer List */}
            <div className="space-y-3">
              {customers.map(customer => (
                <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-800 text-lg">{customer.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          customer.status === 'Hot Lead' ? 'bg-red-100 text-red-800' :
                          customer.status === 'Warm Lead' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {customer.status}
                        </span>
                        {customer.testDrive && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            ✓ Test Drive
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <p>📞 {customer.phone}</p>
                        <p>📧 {customer.email}</p>
                        <p>🚗 Interest: {customer.vehicleInterest || 'General'}</p>
                        <p>📅 Last Contact: {customer.lastContact}</p>
                      </div>
                      {customer.notes && (
                        <p className="text-sm text-gray-700 mt-2 italic">"{customer.notes}"</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      className="text-gray-600 hover:text-red-600 ml-4"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sales Tracker Modal */}
      {showSalesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Sales Tracker</h2>
                <p className="text-gray-600 mt-1">Track completed sales and revenue</p>
              </div>
              <button
                onClick={() => setShowSalesModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Sales Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {(() => {
                const stats = getSalesStats();
                return (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-600 font-medium">Total Sales</p>
                      <p className="text-3xl font-bold text-blue-900">{stats.totalSales}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-600 font-medium">Revenue</p>
                      <p className="text-2xl font-bold text-green-900">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <p className="text-sm text-emerald-600 font-medium">Total Profit</p>
                      <p className="text-2xl font-bold text-emerald-900">${stats.totalProfit.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-purple-600 font-medium">Avg Profit/Sale</p>
                      <p className="text-2xl font-bold text-purple-900">${stats.avgProfit.toLocaleString()}</p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Sales List */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Recent Sales</h3>
              <div className="space-y-3">
                {sales.map(sale => (
                  <div key={sale.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-gray-800">{sale.vehicle}</h4>
                        <p className="text-sm text-gray-600">Customer: {sale.customer}</p>
                        <p className="text-sm text-gray-600">Stock: {sale.stock}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Sale Date</p>
                        <p className="font-medium text-gray-800">{sale.date}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-3 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600">Sold Price</p>
                        <p className="font-bold text-green-600">{sale.soldPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Cost</p>
                        <p className="font-medium text-gray-800">{sale.purchasePrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Profit</p>
                        <p className="font-bold text-emerald-600">{sale.profit}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Payment</p>
                        <p className="font-medium text-gray-800">{sale.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-600">Salesperson: </span>
                      <span className="text-xs font-medium text-blue-600">{sale.salesperson}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <p className="text-sm text-cyan-800">
                <strong>📊 Sales Performance:</strong> Track all completed sales with profit margins. 
                Use this data to analyze monthly performance and set goals.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Financial Reports Modal */}
      {showFinancialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Financial Reports</h2>
                <p className="text-gray-600 mt-1">Income and costs per vehicle</p>
              </div>
              <button
                onClick={() => setShowFinancialModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Inventory Overview */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {(() => {
                const stats = getInventoryStats();
                return (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-600 font-medium">Total Inventory</p>
                      <p className="text-2xl font-bold text-blue-900">{vehicles.length}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-600 font-medium">Available</p>
                      <p className="text-2xl font-bold text-green-900">{stats.available}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <p className="text-sm text-orange-600 font-medium">In Service</p>
                      <p className="text-2xl font-bold text-orange-900">{stats.inService}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-purple-600 font-medium">Total Investment</p>
                      <p className="text-2xl font-bold text-purple-900">${stats.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <p className="text-sm text-emerald-600 font-medium">Projected Profit</p>
                      <p className="text-2xl font-bold text-emerald-900">${stats.projectedProfit.toLocaleString()}</p>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Per Vehicle Breakdown */}
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Per Vehicle Financial Breakdown</h3>
              <div className="space-y-4">
                {vehicles.map(vehicle => {
                  const financials = calculateVehicleProfit(vehicle);
                  return (
                    <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h4>
                          <p className="text-sm text-gray-600">Stock: {vehicle.stock}</p>
                          <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                            vehicle.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{vehicle.price}</p>
                          <p className={`font-semibold ${financials.projectedProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Profit: ${financials.projectedProfit.toLocaleString()} ({financials.profitMargin}%)
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600">Purchase Price</p>
                          <p className="font-semibold text-gray-800">{vehicle.purchasePrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Recon Cost</p>
                          <p className="font-semibold text-gray-800">{vehicle.reconCost}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Maintenance Costs</p>
                          <p className="font-semibold text-gray-800">
                            ${vehicle.maintenanceHistory.reduce((sum, record) => {
                              return sum + (record.cost ? parseFloat(record.cost.replace(/[$,]/g, '')) : 0);
                            }, 0).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Total Investment</p>
                          <p className="font-semibold text-gray-800">${financials.totalCost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-sm text-emerald-800">
                <strong>💰 Financial Insights:</strong> Track profit margins per vehicle to identify the most profitable inventory. 
                Factor in all costs including maintenance to get accurate projections.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Export Report</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={exportReport}
                className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download as Text File
              </button>
              <button
                onClick={printReport}
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Print Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">Schedule Automatic Reports</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={scheduleFrequency}
                  onChange={(e) => setScheduleFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
                <select
                  value={shareMethod}
                  onChange={(e) => setShareMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </div>

              {shareMethod === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="boss@carlot.com"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="555-0123"
                  />
                </div>
              )}

              <button
                onClick={scheduleReport}
                className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Calendar size={18} />
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DMS Integration Modal */}
      {showDMSModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">DMS Integration</h2>
                <p className="text-gray-600 mt-1">Connect with Wayne Reeves DMS</p>
              </div>
              <button
                onClick={() => setShowDMSModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {!dmsConnected ? (
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-bold text-orange-900 mb-2">Wayne Reeves DMS Setup</h3>
                  <p className="text-sm text-orange-800 mb-4">
                    Connect your lot to Wayne Reeves DMS to automatically sync vehicle inventory, 
                    pricing, and maintenance records.
                  </p>
                  <button
                    onClick={() => setShowDMSGuide(true)}
                    className="text-orange-600 hover:text-orange-800 text-sm underline"
                  >
                    View Setup Guide
                  </button>
                </div>

                {showDMSGuide && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-900 mb-2">Setup Instructions:</h4>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Log into your Wayne Reeves DMS account</li>
                      <li>Navigate to Settings → API Access</li>
                      <li>Generate a new API key for "Car Lot Manager"</li>
                      <li>Copy your Dealership ID from the account settings</li>
                      <li>Enter the credentials below and click "Connect"</li>
                    </ol>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                    <input
                      type="password"
                      value={dmsConfig.apiKey}
                      onChange={(e) => setDmsConfig({...dmsConfig, apiKey: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter your Wayne Reeves API key"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dealership ID</label>
                    <input
                      type="text"
                      value={dmsConfig.dealershipId}
                      onChange={(e) => setDmsConfig({...dmsConfig, dealershipId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your dealership ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">API Endpoint</label>
                    <input
                      type="url"
                      value={dmsConfig.endpoint}
                      onChange={(e) => setDmsConfig({...dmsConfig, endpoint: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100"
                      disabled
                    />
                  </div>

                  <button
                    onClick={syncWithDMS}
                    disabled={!dmsConfig.apiKey || !dmsConfig.dealershipId || isSyncing}
                    className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSyncing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Share2 size={18} />
                        Connect to DMS
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-bold text-green-900">Connected to Wayne Reeves DMS</h3>
                  </div>
                  <p className="text-sm text-green-800">
                    Successfully connected to dealership "{dmsConfig.dealershipId}". 
                    Last sync: {lastSyncTime || 'Never'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={syncWithDMS}
                    disabled={isSyncing}
                    className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSyncing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Syncing...
                      </>
                    ) : (
                      <>
                        <Share2 size={18} />
                        Sync Now
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => {
                      setDmsConnected(false);
                      setLastSyncTime(null);
                      setDmsConfig({...dmsConfig, apiKey: '', dealershipId: ''});
                    }}
                    className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    Disconnect
                  </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">Sync Features:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✅ Vehicle inventory and pricing</li>
                    <li>✅ Maintenance and service records</li>
                    <li>✅ Customer information and leads</li>
                    <li>✅ Sales transactions and financing</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vehicle Detail Modal */}
      {showVehicleDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {showVehicleDetail.year} {showVehicleDetail.make} {showVehicleDetail.model}
                </h2>
                <p className="text-gray-600">Stock: {showVehicleDetail.stock}</p>
              </div>
              <button
                onClick={() => setShowVehicleDetail(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Vehicle Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      showVehicleDetail.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {showVehicleDetail.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">List Price:</span>
                    <span className="font-bold text-blue-600">{showVehicleDetail.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purchase Price:</span>
                    <span className="font-semibold">{showVehicleDetail.purchasePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recon Cost:</span>
                    <span className="font-semibold">{showVehicleDetail.reconCost}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-bold text-gray-800 mb-3">Photos</h4>
                  <div className="flex gap-2 flex-wrap">
                    {showVehicleDetail.photos.map((photo, idx) => (
                      <span key={idx} className="text-4xl">{photo}</span>
                    ))}
                    <button
                      onClick={() => handlePhotoUpload(showVehicleDetail.id)}
                      className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-blue-600 transition"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-3">Maintenance History</h3>
                <div className="space-y-3">
                  {showVehicleDetail.maintenanceHistory.map((record, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-800">{record.service}</h5>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          record.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{record.date}</p>
                      {record.notes && (
                        <p className="text-sm text-gray-700">{record.notes}</p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-1">
                          {record.photos.map((photo, photoIdx) => (
                            <span key={photoIdx} className="text-lg">{photo}</span>
                          ))}
                        </div>
                        {record.cost && (
                          <span className="font-semibold text-gray-800">{record.cost}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
