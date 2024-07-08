'use client'
import React, { useEffect, useState } from 'react';
import { Avatar, Table, Group, Text, Select, Button, TextInput } from '@mantine/core';
import Link from 'next/link';

const rolesData = ['CNA', 'Doctor', 'Manager'];

const UsersRolesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    console.log('Clicked')
    try {
      // const response = await fetch('/api/employees?userId=${userId}', {
      const response = await fetch('/api/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const users = await response.json();
      console.log(users)
      setEmployees(users);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const rows = employees.map((employee) => (
    <Table.Tr key={employee.id}>
      <Table.Td>
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
      </Table.Td>
      <Table.Td>
        <Select
          data={rolesData}
          defaultValue={employee.job}
          variant="unstyled"
          allowDeselect={false}
        />
      </Table.Td>
      <Table.Td>{employee.lastsubmission}</Table.Td>
      <Table.Td>
        <Button component={Link} href="/dropImages">
          Submit Image
        </Button>
      </Table.Td>
      <Table.Td>
      <Button component={Link} href="/Timesheet">
          Timesheet
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <><Button onClick={handleSubmit}>Load</Button><Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Last Submission</Table.Th>
            <Table.Th>Submit</Table.Th>
            <Table.Th>TimeSheet</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer></>
  );
};

export default UsersRolesTable;
