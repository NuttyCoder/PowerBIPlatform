import React, { useState, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye, Calendar, Filter, Download, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for different time periods
  const revenueData = {
    '7d': [
      { date: 'Mon', revenue: 4200, orders: 24, visitors: 890 },
      { date: 'Tue', revenue: 3800, orders: 19, visitors: 756 },
      { date: 'Wed', revenue: 5100, orders: 31, visitors: 1120 },
      { date: 'Thu', revenue: 4700, orders: 28, visitors: 980 },
      { date: 'Fri', revenue: 6200, orders: 35, visitors: 1340 },
      { date: 'Sat', revenue: 7800, orders: 42, visitors: 1580 },
      { date: 'Sun', revenue: 5900, orders: 33, visitors: 1200 }
    ],
    '30d': [
      { date: 'Week 1', revenue: 28400, orders: 168, visitors: 6200 },
      { date: 'Week 2', revenue: 32100, orders: 195, visitors: 7100 },
      { date: 'Week 3', revenue: 29800, orders: 182, visitors: 6800 },
      { date: 'Week 4', revenue: 35600, orders: 218, visitors: 7900 }
    ],
    '90d': [
      { date: 'Month 1', revenue: 125900, orders: 763, visitors: 27900 },
      { date: 'Month 2', revenue: 142300, orders: 856, visitors: 31200 },
      { date: 'Month 3', revenue: 138700, orders: 821, visitors: 29800 }
    ]
  };

  const productData = [
    { name: 'Laptops', value: 35, revenue: 45200, color: '#8b5cf6' },
    { name: 'Smartphones', value: 28, revenue: 38900, color: '#06b6d4' },
    { name: 'Tablets', value: 18, revenue: 22100, color: '#10b981' },
    { name: 'Accessories', value: 12, revenue: 15800, color: '#f59e0b' },
    { name: 'Software', value: 7, revenue: 9200, color: '#ef4444' }
  ];

  const regionData = [
    { region: 'North America', sales: 125000, growth: 12.5 },
    { region: 'Europe', sales: 98000, growth: 8.2 },
    { region: 'Asia Pacific', sales: 87000, growth: 15.7 },
    { region: 'Latin America', sales: 43000, growth: 6.3 },
    { region: 'Middle East', sales: 28000, growth: 4.1 }
  ];

  const currentData = revenueData[selectedPeriod];
  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);
  const totalVisitors = currentData.reduce((sum, item) => sum + item.visitors, 0);
  const conversionRate = ((totalOrders / totalVisitors) * 100).toFixed(2);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Intelligence Dashboard</h1>
              <p className="text-gray-600">Monitor your key business metrics and performance indicators</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

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
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="lg:ml-4 mt-4 lg:mt-0">
                {productData.map((item, index) => (
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
              <BarChart data={regionData} layout="horizontal">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
