"use client"
import { Table } from '@mantine/core';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

const data = [
  {
    date: 'Monday',
    hoursWorked: 14,
    submissionDate: '2024-06-01',
    rate: 2,
    total: 0,
  },
  {
    date: 'Tuesday',
    hoursWorked: 5,
    submissionDate: '2024-06-02',
    rate: 2,
    total: 0,
  },
  {
    date: 'Wednesday',
    hoursWorked: 9,
    submissionDate: '2024-06-03',
    rate: 2,
    total: 0,
  },
  {
    date: 'Thursday',
    hoursWorked: 0,
    submissionDate: '2024-06-04',
    rate: 2,
    total: 0,
  },
  {
    date: 'Friday',
    hoursWorked: 8,
    submissionDate: '2024-06-05',
    rate: 2,
    total: 0,
  },
  {
    date: 'Saturday',
    hoursWorked: 7,
    submissionDate: '2024-06-06',
    rate: 15.63,
    total: 0,
  },
  {
    date: 'Sunday',
    hoursWorked: 8,
    submissionDate: '2024-06-07',
    rate: 17.5,
    total: 0,
  },
];

data.forEach((item) => {
  item.total = item.rate * item.hoursWorked;
});

const chartOptions = {
  scales: {
    y: {
      suggestedMin: 0,
    },
  },
};

const chartData = {
  labels: data.map((item) => item.date),
  datasets: [
    {
      label: 'Hours Worked',
      data: data.map((item) => item.hoursWorked),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.5,
    },
  ],
};

export default function Timesheet() {
  const rows = data.map((row, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{row.date}</Table.Td>
        <Table.Td>{row.hoursWorked}</Table.Td>
        <Table.Td>{row.submissionDate}</Table.Td>
        <Table.Td>
          <Link href="/inDepth">In-depth</Link>
        </Table.Td>
        <Table.Td>{row.rate}</Table.Td>
        <Table.Td>{row.total}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Hours Worked</Table.Th>
              <Table.Th>Submission Date</Table.Th>
              <Table.Th>In-depth</Table.Th>
              <Table.Th>Rate</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
