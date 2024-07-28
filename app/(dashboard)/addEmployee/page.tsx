'use client';
import { useState } from 'react';
import { Select, TextInput, Button, Group, Center } from '@mantine/core';
import classes from './FloatingLabelInput.module.css';

export default function FloatingLabelInput() {
  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (!userInfo || !userInfo.id) {
        console.log('User ID not found in localStorage');
        alert('User ID not found. Please log in again.');
        return;
      }
      console.log("sup")
      console.log(userInfo.id)

      const response = await fetch('/api/addEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userInfo.id,
          name,
          job,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      const newEmployee = await response.json();
      console.log(newEmployee);
      alert('Employee created successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the employee');
    } finally {
      setLoading(false);
    }
  };

  const floatingName = name.trim().length !== 0 || focusedName || undefined;
  const floatingEmail = email.trim().length !== 0 || focusedEmail || undefined;

  return (
    <>
      <h1>Create Employee</h1>
      <p>Name</p>
      <TextInput
        label=""
        placeholder=""
        required
        classNames={classes}
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        onFocus={() => setFocusedName(true)}
        onBlur={() => setFocusedName(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floatingName}
        labelProps={{ 'data-floating': floatingName }}
      />
      <p>Job Position</p>
      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={['CNA', 'Doctor', 'Manager']}
        placeholder="Pick one"
        label=""
        classNames={classes}
        value={job}
        onChange={setJob}
      />
      <p>Email</p>
      <TextInput
        label=""
        placeholder=""
        required
        classNames={classes}
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
        onFocus={() => setFocusedEmail(true)}
        onBlur={() => setFocusedEmail(false)}
        mt="md"
        autoComplete="nope"
        data-floating={floatingEmail}
        labelProps={{ 'data-floating': floatingEmail }}
      />
      <Group style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', padding: '10 20px' }}>
        <Button 
          onClick={handleSubmit} 
          disabled={loading} >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
        <Button 
          onClick={() => window.location.href = './employees'}>
          Back
        </Button>
      </Group>
    </>
  );
}
