'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, Table, Group, Text, Select, Button } from '@mantine/core';
import Link from 'next/link';

const rolesData = ['CNA', 'Doctor', 'Manager'];

const UsersRolesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo || !userInfo.id) {
      console.log('User ID not found in localStorage');
      alert('User ID not found. Please log in again.');
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`/api/employees?userId=${userInfo.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const users = await response.json();
      console.log(users);
      setEmployees(users);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const saveInfo = (employee) => {
    localStorage.setItem("employee", JSON.stringify(employee));
    const savedEmployee = JSON.parse(localStorage.getItem("employee"));
    console.log(savedEmployee);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const rows = employees.map((employee) => (
    <tr key={employee.id}>
      <td>
        <Group gap="sm">
          <Avatar size={40} src={employee.avatar} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {employee.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {employee.email}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Select
          data={rolesData}
          defaultValue={employee.job}
          variant="unstyled"
          allowDeselect={false}
        />
      </td>
      <td>{employee.lastsubmission}</td>
      <td>
        <Button component={Link} href="/dropImages">
          Submit Image
        </Button>
      </td>
      <td>
        <Button
          onClick={() => saveInfo(employee)}
          component={Link}
          href="/Timesheet"
        >
          Timesheet
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
     
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Title</th>
              <th>Last Submission - modify</th>
              <th>Submit - modify</th>
              <th>Time Sheet</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Button component={Link} href='addEmployee'>Add employee- fix later</Button>
      </Table.ScrollContainer>
    </>
  );
};

export default UsersRolesTable;
