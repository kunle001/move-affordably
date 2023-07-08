import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';
import '../../public/css/Charts.css'

const ChartsSection = () => {
  // Dummy chart data
  // Replace this with actual chart data and options
  const chartData = [
    { name: 'January', sales: 12 },
    { name: 'February', sales: 19 },
    { name: 'March', sales: 3 },
    { name: 'April', sales: 5 },
    { name: 'May', sales: 2 },
    { name: 'June', sales: 3 },
    { name: 'July', sales: 7 },
  ];

  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };



  return (
    <section className="charts-section mt-4">
      <div className="contain">
        <div className="row">
          {/* Bar Chart */}
          <div className="col-md-6">
            <div className="chart-card">
              <h2 className="chart-title">Sales</h2>
              <BarChart width={400} height={300} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="rgba(75, 192, 192, 0.2)" />
              </BarChart>
            </div>
          </div>

          {/* Line Chart */}
          <div className="col-md-6">
            <div className="chart-card">
              <h2 className="chart-title">sales trend</h2>
              <LineChart width={400} height={300} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="rgba(75, 192, 192, 1)" />
              </LineChart>
              <Brush dataKey="name" height={30} stroke="#8884d8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;
