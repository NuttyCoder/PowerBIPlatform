import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building2, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Calendar,
  Target,
  Briefcase,
  Activity,
  ChevronRight,
  Settings,
  Bell,
  User
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const kpiData = [
    {
      title: "Active Reports",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "from-pink-500 to-purple-600"
    },
    {
      title: "Total Users",
      value: "2,847",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Client Orgs",
      value: "42",
      change: "+3",
      trend: "up",
      icon: Building2,
      color: "from-blue-500 to-teal-500"
    },
    {
      title: "Utilization",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: Target,
      color: "from-teal-500 to-green-500"
    }
  ];

  const reportCategories = [
    { id: 'all', name: 'All Reports', count: 156 },
    { id: 'financial', name: 'Financial', count: 45 },
    { id: 'operations', name: 'Operations', count: 38 },
    { id: 'hr', name: 'HR Analytics', count: 29 },
    { id: 'sales', name: 'Sales & Marketing', count: 44 }
  ];

  const recentReports = [
    {
      name: "Q4 Financial Performance",
      client: "TechCorp Industries",
      lastUpdated: "2 hours ago",
      views: 1245,
      status: "active",
      category: "financial"
    },
    {
      name: "Employee Engagement Survey",
      client: "Global Logistics Ltd",
      lastUpdated: "4 hours ago",
      views: 892,
      status: "active",
      category: "hr"
    },
    {
      name: "Supply Chain Analytics",
      client: "Manufacturing Plus",
      lastUpdated: "6 hours ago",
      views: 567,
      status: "active",
      category: "operations"
    },
    {
      name: "Sales Pipeline Dashboard",
      client: "StartupX",
      lastUpdated: "1 day ago",
      views: 334,
      status: "active",
      category: "sales"
    },
    {
      name: "Cost Optimization Report",
      client: "RetailChain Co",
      lastUpdated: "1 day ago",
      views: 445,
      status: "pending",
      category: "financial"
    },
    {
      name: "Digital Transformation KPIs",
      client: "Enterprise Solutions",
      lastUpdated: "2 days ago",
      views: 678,
      status: "active",
      category: "operations"
    }
  ];

  const topClients = [
    { name: "TechCorp Industries", reports: 24, users: 156, revenue: "$2.4M" },
    { name: "Global Logistics Ltd", reports: 18, users: 89, revenue: "$1.8M" },
    { name: "Manufacturing Plus", reports: 15, users: 67, revenue: "$1.5M" },
    { name: "Enterprise Solutions", reports: 12, users: 45, revenue: "$1.2M" },
    { name: "RetailChain Co", reports: 10, users: 34, revenue: "$980K" }
  ];

  const filteredReports = recentReports.filter(report => 
    (activeTab === 'all' || report.category === activeTab) &&
    (report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     report.client.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Power BI Hub</h1>
                <p className="text-slate-400 text-sm">Centralized Reporting Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Settings className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>{kpi.change}</span>
                </div>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-white">{kpi.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search reports or clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                  <Filter className="w-5 h-5" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {reportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeTab === category.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Reports</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="space-y-4">
                {filteredReports.map((report, index) => (
                  <div key={index} className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-semibold group-hover:text-pink-400 transition-colors">{report.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            report.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-1">{report.client}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{report.lastUpdated}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{report.views} views</span>
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-pink-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Clients */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Top Clients</h2>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{client.name}</h4>
                        <p className="text-slate-400 text-xs">{client.reports} reports • {client.users} users</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-semibold text-sm">{client.revenue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Platform Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Revenue</span>
                  <span className="text-white font-semibold">$12.8M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Avg. Report Views</span>
                  <span className="text-white font-semibold">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Data Sources</span>
                  <span className="text-white font-semibold">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Uptime</span>
                  <span className="text-green-400 font-semibold">99.9%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                  <BarChart3 className="w-5 h-5" />
                  <span>Create New Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300">
                  <Briefcase className="w-5 h-5" />
                  <span>Add Client</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-slate-700/50 text-slate-400 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300">
                  <Activity className="w-5 h-5" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;