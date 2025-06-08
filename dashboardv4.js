import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye, Calendar, Filter, Download, RefreshCw, Upload, LogOut, Settings, FileText, Database } from 'lucide-react';
import Papa from 'papaparse';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [userData, setUserData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  // Sample users for demo (in production, this would be encrypted/hashed)
  const sampleUsers = [
    { id: 1, email: 'client1@example.com', password: 'demo123', name: 'Acme Corp', subscription: 'active' },
    { id: 2, email: 'client2@example.com', password: 'demo123', name: 'Tech Solutions', subscription: 'active' },
    { id: 3, email: 'demo@example.com', password: 'demo123', name: 'Demo Company', subscription: 'trial' }
  ];

  // Default data structure for new users
  const defaultData = {
    revenueData: {
      '7d': [
        { date: 'Mon', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Tue', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Wed', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Thu', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Fri', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Sat', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Sun', revenue: 0, orders: 0, visitors: 0 }
      ],
      '30d': [
        { date: 'Week 1', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Week 2', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Week 3', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Week 4', revenue: 0, orders: 0, visitors: 0 }
      ],
      '90d': [
        { date: 'Month 1', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Month 2', revenue: 0, orders: 0, visitors: 0 },
        { date: 'Month 3', revenue: 0, orders: 0, visitors: 0 }
      ]
    },
    productData: [
      { name: 'Product 1', value: 0, revenue: 0, color: '#8b5cf6' },
      { name: 'Product 2', value: 0, revenue: 0, color: '#06b6d4' }
    ],
    regionData: [
      { region: 'Region 1', sales: 0, growth: 0 },
      { region: 'Region 2', sales: 0, growth: 0 }
    ]
  };

  // Initialize user data from memory
  useEffect(() => {
    if (user && !userData) {
      const savedData = JSON.parse(localStorage.getItem(`userData_${user.id}`) || 'null');
      setUserData(savedData || defaultData);
    }
  }, [user]);

  // Save user data to memory
  const saveUserData = (data) => {
    if (user) {
      localStorage.setItem(`userData_${user.id}`, JSON.stringify(data));
      setUserData(data);
    }
  };

  // Authentication functions
  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = sampleUsers.find(u => 
      u.email === loginForm.email && u.password === loginForm.password
    );
    
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setLoginForm({ email: '', password: '' });
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserData(null);
    setUploadedFiles([]);
  };

  // File upload handler
  const handleFileUpload = (event, dataType) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          Papa.parse(e.target.result, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              processUploadedData(results.data, dataType, file.name);
            }
          });
        } else if (file.type === 'application/json' || file.name.endsWith('.json')) {
          const jsonData = JSON.parse(e.target.result);
          processUploadedData(jsonData, dataType, file.name);
        }
      } catch (error) {
        alert('Error processing file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  // Process uploaded data
  const processUploadedData = (data, dataType, fileName) => {
    const currentData = userData || defaultData;
    let updatedData = { ...currentData };

    if (dataType === 'revenue') {
      // Assume CSV has columns: date, revenue, orders, visitors
      const processedData = data.map(row => ({
        date: row.date || row.Date || '',
        revenue: parseFloat(row.revenue || row.Revenue || 0),
        orders: parseInt(row.orders || row.Orders || 0),
        visitors: parseInt(row.visitors || row.Visitors || 0)
      }));
      
      updatedData.revenueData[selectedPeriod] = processedData;
    } else if (dataType === 'products') {
      // Assume CSV has columns: name, value, revenue
      const processedData = data.map((row, index) => ({
        name: row.name || row.Name || `Product ${index + 1}`,
        value: parseFloat(row.value || row.Value || 0),
        revenue: parseFloat(row.revenue || row.Revenue || 0),
        color: row.color || ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][index % 5]
      }));
      
      updatedData.productData = processedData;
    } else if (dataType === 'regions') {
      // Assume CSV has columns: region, sales, growth
      const processedData = data.map(row => ({
        region: row.region || row.Region || '',
        sales: parseFloat(row.sales || row.Sales || 0),
        growth: parseFloat(row.growth || row.Growth || 0)
      }));
      
      updatedData.regionData = processedData;
    }

    saveUserData(updatedData);
    setUploadedFiles(prev => [...prev, { name: fileName, type: dataType, timestamp: new Date() }]);
    alert(`${fileName} uploaded successfully!`);
  };

  // Calculate metrics from user data
  const currentData = userData?.revenueData?.[selectedPeriod] || [];
  const totalRevenue = currentData.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const totalOrders = currentData.reduce((sum, item) => sum + (item.orders || 0), 0);
  const totalVisitors = currentData.reduce((sum, item) => sum + (item.visitors || 0), 0);
  const conversionRate = totalVisitors > 0 ? ((totalOrders / totalVisitors) * 100).toFixed(2) : 0;

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const exportData = () => {
    const dataToExport = {
      user: user.name,
      exportDate: new Date().toISOString(),
      data: userData
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name}_dashboard_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const KPICard = ({ title, value, change, icon: Icon, color, prefix = '', suffix = '' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center mt-4">
        {change >= 0 ? (
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-gray-500 ml-1">vs last period</span>
      </div>
    </div>
  );

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BI Dashboard</h1>
            <p className="text-gray-600">Secure Business Intelligence Platform</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-500">Email: demo@example.com</p>
            <p className="text-xs text-gray-500">Password: demo123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Database className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name} Dashboard</h1>
                <p className="text-sm text-gray-600">Subscription: {user.subscription}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Data
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Upload Section */}
        {showUpload && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Your Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-2">Revenue Data</p>
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={(e) => handleFileUpload(e, 'revenue')}
                  className="hidden"
                  id="revenue-upload"
                />
                <label
                  htmlFor="revenue-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm"
                >
                  Upload CSV/JSON
                </label>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                <ShoppingCart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-2">Product Data</p>
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={(e) => handleFileUpload(e, 'products')}
                  className="hidden"
                  id="product-upload"
                />
                <label
                  htmlFor="product-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm"
                >
                  Upload CSV/JSON
                </label>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-2">Region Data</p>
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={(e) => handleFileUpload(e, 'regions')}
                  className="hidden"
                  id="region-upload"
                />
                <label
                  htmlFor="region-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm"
                >
                  Upload CSV/JSON
                </label>
              </div>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recently Uploaded:</h4>
                <div className="space-y-1">
                  {uploadedFiles.slice(-3).map((file, index) => (
                    <p key={index} className="text-xs text-gray-500">
                      {file.name} ({file.type}) - {file.timestamp.toLocaleString()}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Period:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Regions</option>
                <option value="na">North America</option>
                <option value="eu">Europe</option>
                <option value="ap">Asia Pacific</option>
              </select>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={totalRevenue}
            change={8.2}
            icon={DollarSign}
            color="bg-green-500"
            prefix="$"
          />
          <KPICard
            title="Total Orders"
            value={totalOrders}
            change={12.5}
            icon={ShoppingCart}
            color="bg-blue-500"
          />
          <KPICard
            title="Visitors"
            value={totalVisitors}
            change={-2.1}
            icon={Eye}
            color="bg-purple-500"
          />
          <KPICard
            title="Conversion Rate"
            value={conversionRate}
            change={5.8}
            icon={Users}
            color="bg-orange-500"
            suffix="%"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Orders vs Visitors */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Orders vs Visitors</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Performance */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Performance</h3>
            <div className="flex flex-col lg:flex-row items-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={userData?.productData || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(userData?.productData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="lg:ml-4 mt-4 lg:mt-0">
                {(userData?.productData || []).map((item, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">${item.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Sales */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Sales Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userData?.regionData || []} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis dataKey="region" type="category" stroke="#6b7280" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Sales']}
                />
                <Bar dataKey="sales" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Dashboard last updated: {new Date().toLocaleString()}</p>
          <p className="mt-1">Logged in as: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
