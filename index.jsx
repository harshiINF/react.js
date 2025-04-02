import { useState, useEffect } from "react"; import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const fetchData = async () => { return new Promise((resolve) => { setTimeout(() => { resolve({ tickets: [ { date: "2023-12-16", created: 3800, resolved: 2800 }, { date: "2023-12-17", created: 3700, resolved: 2600 }, { date: "2023-12-18", created: 3900, resolved: 2900 }, { date: "2023-12-19", created: 3600, resolved: 2700 }, { date: "2023-12-20", created: 3500, resolved: 2500 }, ], sales: [ { name: "Operations", value: 12320, color: "#0088FE" }, { name: "Banking", value: 3260, color: "#00C49F" }, { name: "Refinance", value: 1320, color: "#FFBB28" }, ], }); }, 1000); }); };

const Dashboard = () => { const [data, setData] = useState({ tickets: [], sales: [] }); const [darkMode, setDarkMode] = useState(false); const [filterDate, setFilterDate] = useState(""); const [sortedTickets, setSortedTickets] = useState([]);

useEffect(() => { fetchData().then((res) => setData(res)); }, []);

useEffect(() => { let filtered = data.tickets; if (filterDate) { filtered = filtered.filter(ticket => ticket.date === filterDate); } setSortedTickets([...filtered].sort((a, b) => b.created - a.created)); }, [filterDate, data.tickets]);

return ( <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-gray-100 text-black min-h-screen p-6"}> <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setDarkMode(!darkMode)} > Toggle Dark Mode </button>

<div className="mb-4">
    <label className="mr-2">Filter by Date:</label>
    <select
      className="px-2 py-1 border rounded"
      onChange={(e) => setFilterDate(e.target.value)}
    >
      <option value="">All</option>
      {data.tickets.map(ticket => (
        <option key={ticket.date} value={ticket.date}>{ticket.date}</option>
      ))}
    </select>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-gray-800 dark:bg-gray-700 text-white p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Average Tickets Created</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sortedTickets}>
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Bar dataKey="created" fill="#8884d8" />
          <Bar dataKey="resolved" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-gray-800 dark:bg-gray-700 text-white p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sales Conversions</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data.sales} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.sales.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

); };

export default Dashboard;