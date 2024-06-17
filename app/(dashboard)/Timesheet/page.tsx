'use client'
import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './tableDesign.module.css';
import Link from 'next/link';

const data = [
  {
    startDate: '2024-06-01',
    endDate:'2024-06-07',
    hoursWorked: 8,
    submissionDate: '2024-06-07',
  },
  {
    startDate: '2024-06-08',
    endDate:'2024-06-15',
    hoursWorked: 8,
    submissionDate: '2024-06-16',
  },
  {
    startDate: '2024-06-016',
    endDate:'2024-06-23',
    hoursWorked: 8,
    submissionDate: '2024-06-23',
  },
  {
    startDate: '2024-06-24',
    endDate:'2024-06-31',
    hoursWorked: 8,
    submissionDate: '2024-07-01',
  },
  {
    startDate: '2024-07-01',
    endDate:'2024-07-07',
    hoursWorked: 8,
    submissionDate: '2024-07-07',
  },
];

export default function Timesheet() {
  const rows = data.map((row, index) => {
    return (
      <Table.Tr key={index}>
        <Table.Td>{row.startDate}</Table.Td>
        <Table.Td>{row.endDate}</Table.Td>
        <Table.Td>{row.hoursWorked}</Table.Td>
        <Table.Td>{row.submissionDate}</Table.Td>
        <Table.Td>
            <Link href='./inDepth'>In-depth</Link>
        </Table.Td>
      </Table.Tr>
    );
  });


  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Start Date</Table.Th>
            <Table.Th>End Date</Table.Th>
            <Table.Th>Hours Worked</Table.Th>
            <Table.Th>Submission Date</Table.Th>
            <Table.Th>In-depth</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
