'use client';
import React, { useEffect, useState } from 'react';
import { Table, Progress, Anchor, Text, Group } from '@mantine/core';
import classes from './tableDesign.module.css';
import Link from 'next/link';

const TimesheetTable = () => {
  const [timesheet, setTimesheet] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    console.log('Clicked');
    try {
      const response = await fetch('/api/timesheet', {
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
      setTimesheet(data);
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

  const rows = timesheet.map((row, index) => (
    <tr key={index}>
      <td>{row.startDate}</td>
      <td>{row.endDate}</td>
      <td>{row.hoursWorked}</td>
      <td>{row.submissionDate}</td>
      <td>
        <Link href='./inDepth'>In-depth</Link>
      </td>
    </tr>
  ));

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Hours Worked</th>
                <th>Submission Date</th>
                <th>In-depth</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </>
  );
};

export default TimesheetTable;
