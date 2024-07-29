/*Author: Matt Uehling
* Purpose: Can see indepth how many hours were worked on a certain day ( called from the api) and a nice graph to see over a week
*/
'use client';
import React, { useEffect, useState } from 'react';
import { Center, Table, Text } from '@mantine/core';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import classes from './Indepth.module.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  scales: {
    y: {
      suggestedMin: 0,
    },
  },
};

const IndeptTable = () => {
  const [indepth, setIndepth] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const weekInfo = JSON.parse(localStorage.getItem("week"));
    if (!weekInfo || !weekInfo.id) {
      console.log('Week ID not found in localStorage');
      alert('Week ID not found. Please log in again.');
      return;
    }
    console.log(weekInfo.id);
    setLoading(true);
    console.log('Clicked');
    try {
      const response = await fetch(`/api/in-depth?weekId=${weekInfo.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log(data);
      setIndepth(data);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const transformDataToRows = (data: any[]) => {
    return data.flatMap((week) => {
      const startDate = new Date(week.startDate);
      const days = [
        { day: 'Monday', date: new Date(startDate).toISOString().split('T')[0], hoursWorked: week.monday },
        { day: 'Tuesday', date: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0], hoursWorked: week.tuesday },
        { day: 'Wednesday', date: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0], hoursWorked: week.wednesday },
        { day: 'Thursday', date: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0], hoursWorked: week.thursday },
        { day: 'Friday', date: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0], hoursWorked: week.friday },
        { day: 'Saturday', date: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0], hoursWorked: week.saturday },
        { day: 'Sunday', date: new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0], hoursWorked: week.sunday },
      ];

      return days;
    });
  };

  const transformedData = transformDataToRows(indepth);

  const chartData = {
    labels: transformedData.map((item) => item.date),
    datasets: [
      {
        label: 'Hours Worked',
        data: transformedData.map((item) => item.hoursWorked),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,
      },
    ],
  };

  const rows = transformedData.map((row, index) => (
    <tr key={index}>
      <td>{row.day}</td>
      <td>{row.date}</td>
      <td>{row.hoursWorked}</td>
    </tr>
  ));

  return (
    <div>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
              <thead>
                <tr className="center-text">
                  <th>Day</th>
                  <th>Date</th>
                  <th>Hours Worked</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Table.ScrollContainer>
          <Line data={chartData} options={chartOptions} />
        </>
      )}
    </div>
  );
};

export default IndeptTable;