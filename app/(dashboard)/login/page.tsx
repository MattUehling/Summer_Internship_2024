'use client'
import React, { useState } from 'react';
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './login.module.css';

export default function AuthenticationTitle() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Demo />
      </Paper>
    </Container>
  );
}
function Demo() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const users = await response.json();
      const user = users.find((user) => user.email === values.email && user.password === values.password);

      if (user) {
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        try{
          console.log(user)
          console.log(localStorage.getItem("user"))
        }catch(error)
        {
          
          console.log("BAD")
        }
        // Navigate to employees page
        window.location.href = '/employees';
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('/api/CreateUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const user = await response.json();

      if (user) {
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        try{
          console.log(user)
          console.log(localStorage.getItem("user"))
        }catch(error)
        {
          
          console.log("BAD")
        }
        // Navigate to employees page
        window.location.href = '/employees';
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput withAsterisk label="Email" placeholder="your@email.com" {...form.getInputProps('email')} />

      <PasswordInput
        withAsterisk
        label="Password"
        placeholder="Your password"
        {...form.getInputProps('password')}
        required
        mt="md"
      />
      <Group align="apart" mt="lg">
        <Checkbox label="Remember me" {...form.getInputProps('rememberMe', { type: 'checkbox' })} />
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Checkbox
        mt="md"
        label="I agree to sell my privacy - REMOVE LATER...maybe"
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />
      <Button type="submit" fullWidth mt="xl" loading={loading}>
        Sign in
      </Button>
    </form>
  );
}
