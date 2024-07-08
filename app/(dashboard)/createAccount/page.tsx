'use client';

import { useState } from 'react';
import { TextInput, rem, Box, Progress, PasswordInput, Group, Text, Center, Button } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';
import classes from './createAccount.module.css';

function PasswordRequirement({ meets, label }) {
  return (
    <Text component="div" color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useInputState('');
  const [name, setName] = useState('');
  const strength = getStrength(password);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
  ));

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? '' : 'Invalid email');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting user:', { name, email, password });
  
    if (!emailError && email && password && name) {
      try {
        const response = await fetch('/api/CreateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        });
  
        let data;
        try {
          data = await response.json();
        } catch (error) {
          data = null;
          console.error('Failed to parse JSON:', error);
        }
  
        if (response.ok) {
          alert('Account created successfully!');
          console.log('Server response:', data);
        } else {
          console.error('Error response:', data);
          alert('Error creating account. Please try again.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('Error creating account. Please try again.');
      }
    } else {
      alert('Please correct the errors and try again.');
    }
  };
  

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
        />
        <TextInput
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          placeholder="you@example.com"
          required
          classNames={{ input: emailError && classes.invalid }}
          rightSection={
            emailError ? (
              <IconAlertTriangle
                stroke={1.5}
                style={{ width: rem(18), height: rem(18) }}
                className={classes.icon}
              />
            ) : null
          }
        />
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Your password"
          label="Password"
          required
        />
        <Group gap={5} grow mt="xs" mb="md">
          {bars}
        </Group>
        <PasswordRequirement label="Has at least 6 characters" meets={password.length > 5} />
        {checks}
        <Group position="right" mt="md">
          <Button type="submit">Create Account</Button>
        </Group>
      </form>
    </Box>
  );
}
