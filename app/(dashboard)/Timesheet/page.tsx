/*Author: Matt Uehling
* Purpose: calls the api and displays all the hours worked for an employee
*Links to a more indepth view 
*/
'use client';
import React, { useEffect, useState } from 'react';
import { Table, Text, Group } from '@mantine/core';
import Link from 'next/link';

const TimesheetTable = () => {
  const [timesheet, setTimesheet] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const timesheetInfo = JSON.parse(localStorage.getItem("employee"));
    if (!timesheetInfo || !timesheetInfo.id) {
      console.log('employee ID not found in localStorage');
      alert('User ID not found. Please log in again.');
      return;
    }
    console.log(timesheetInfo.id);
    setLoading(true);
    console.log('Clicked');
    try {
      const response = await fetch(`/api/Timesheet?employeeId=${timesheetInfo.id}`, {
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
  const saveInfo = (week: any) => {
    localStorage.setItem("week", JSON.stringify(week));
    const savedWeek = JSON.parse(localStorage.getItem("week"));
    console.log(savedWeek);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const rows = timesheet.flatMap((row, index) =>
    row.week.map((week: { startDate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; endDate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; hoursWorked: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; submissionDate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, weekIndex: any) => (
      <tr key={`${index}-${weekIndex}`}>
        <td>{week.startDate}</td>
        <td>{week.endDate}</td>
        <td>{week.hoursWorked}</td>
        <td>{week.submissionDate}</td>
        <td>
          <Link href='./inDepth' onClick={() => saveInfo(week)}>In-depth</Link>
        </td>
      </tr>
    ))
  );

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
