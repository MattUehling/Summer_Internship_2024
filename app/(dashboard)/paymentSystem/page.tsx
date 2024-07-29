'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Text, Group, Button, Container, TextInput, Select, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import './drop.module.css';
import Link from 'next/link';

export default function DropImagePage() {
  const [employee, setEmployee] = useState<any>({});
  const [paymentMode, setPaymentMode] = useState<string>('Automatic');
  const [hoursWorked, setHoursWorked] = useState<{ [key: string]: string }>({
    Monday: '0',
    Tuesday: '0',
    Wednesday: '0',
    Thursday: '0',
    Friday: '0',
    Saturday: '0',
    Sunday: '0'
  });
  const theme = useMantineTheme();
  const dropzoneRef = useRef<() => void>(null);
  const [loading, setLoading] = useState(false);

  const setInfo = async () => {
    const employeeInfo = JSON.parse(localStorage.getItem("employee") || '{}');
    if (!employeeInfo || !employeeInfo.id) {
      console.log('Employee ID not found in localStorage');
      alert('User ID not found. Please log in again.');
      return;
    }
    setLoading(true);
    console.log('info',employeeInfo)
    try {
      const response = await fetch(`/api/bankingInfo?employeeId=${employeeInfo.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0];
        console.log("Fetched User:", user);
        localStorage.setItem("employeeBanking", JSON.stringify(user));
        setEmployee(user);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const submitPay = async () => {
    try {
      const employeeInfo = JSON.parse(localStorage.getItem('employee') || '{}');
      if (!employeeInfo || !employeeInfo.id) {
        console.log('User ID not found in localStorage');
        alert('User ID not found. Please log in again.');
        return;
      }
      setLoading(true);

      const response = await fetch('/api/addWeek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: employeeInfo.id,
          ...hoursWorked,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit employee pay');
      }

      const newWeek = await response.json();
      console.log(newWeek);
      alert('Employee pay submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting the pay');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInfo();
    const employee = JSON.parse(localStorage.getItem("employeeBanking") || '{}');
    setEmployee(employee);
  }, []);

  const handleHoursWorkedChange = (day: string, value: string) => {
    if ((parseFloat(value) <= 24 && parseFloat(value)>=0 )|| value === '') {
      setHoursWorked({ ...hoursWorked, [day]: value });
    } else {
      alert('Hours worked in a day cannot exceed 24 hours');
    }
  };

  const calculatePayment = () => {
    const hourlyRate = employee?.hourlyRate || 0; // Use the employee's hourly rate
    const totalHours = Object.values(hoursWorked).reduce((sum, hours) => sum + (parseFloat(hours) || 0), 0);
    return (totalHours * hourlyRate).toFixed(2);
  };

  return (
    <Container size="sm">
      <TextInput
        label="Employee ID"
        value={employee?.id?.toString() || ''}
        readOnly
        mt="md"
      />
      <TextInput
        label="Routing Number"
        value={employee?.routingNumber || ''}
        readOnly
        mt="md"
      />
      <TextInput
        label="Account Number"
        value={employee?.accountNumber || ''}
        readOnly
        mt="md"
      />
      <Select
        label="Payment Mode"
        data={['Automatic', 'Manual']}
        value={paymentMode}
        onChange={(value) => setPaymentMode(value || 'Automatic')}
        mt="md"
      />

      {paymentMode === 'Automatic' ? (
        <div className="dropzone-wrapper">
          <Dropzone
            openRef={dropzoneRef}
            onDrop={() => {}}
            className="dropzone"
            radius="md"
            accept={[MIME_TYPES.pdf]}
            maxSize={30 * 1024 ** 2}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                </Dropzone.Idle>
              </Group>

              <Text style={{ textAlign: 'center' }} weight={700} size="lg" mt="xl">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>PDF file less than 30MB</Dropzone.Reject>
                <Dropzone.Idle>Upload your timesheet</Dropzone.Idle>
              </Text>
              <Text style={{ textAlign: 'center' }} size="sm" mt="xs" color="dimmed">
                Drag'n'drop files here to upload. We can accept only PDF files that are less than 30MB in size.
              </Text>
            </div>
          </Dropzone>

          <Button size="md" radius="xl" mt="md" onClick={() => dropzoneRef.current?.()}>
            Select files
          </Button>
        </div>
      ) : (
        <>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <TextInput
              key={day}
              label={`${day} Hours`}
              placeholder="0"
              value={hoursWorked[day]}
              onChange={(event) => handleHoursWorkedChange(day, event.currentTarget.value)}
              mt="md"
              type="number"
            />
          ))}
          <Text style={{ textAlign: 'center' }} weight={700} size="lg" mt="xl">
            Payment Amount: ${calculatePayment()}
          </Text>
          <Button onClick={submitPay} mt="md">
            Submit Pay
          </Button>
        </>
      )}
      <Button mt="md"
        component={Link}
          href="/employees" >
        back
      </Button>
    </Container>
  );
}
