"use client";

import React, { useState } from "react";
import { TextInput, PasswordInput, Paper, Title, Text, Container, Anchor, Button, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./login.module.css";

export default function AuthenticationTitle() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button" onClick={() => (window.location.href = './createAccount')}>
          Create account
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm />
      </Paper>
    </Container>
  );
}

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch('/api/user', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const { accessToken, refreshToken, user } = await response.json();
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      window.location.href = '/employees';
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        withAsterisk
        label="Password"
        placeholder="Your password"
        {...form.getInputProps('password')}
        required
        mt="md"
      />
      <Button type="submit" fullWidth mt="xl" loading={loading}>
        Sign in
      </Button>
    </form>
  );
}

// Add Employee Page
