import React from 'react';
import { Button, Group, Container, Text } from "@mantine/core";
import Link from "next/link";
import './homepage.css';

export default function HomePage(){
  return (
    <>
      <header/>
      <Container className="content" size="lg">
        <Text component="h1" size="xl" weight={700}>
          Welcome to DevObsessed
        </Text>
        <Text size="lg">
          Your go-to platform for all things development.
        </Text>
        <Text size="lg">
          Featuring <span className="highlight">AkuTime</span> - Time management redefined.
        </Text>
        <Button component={Link} href="/login" size="md" variant="outline" mt="xl" className="login-button">
          Login
        </Button>
      </Container>
      <footer />
      <Container className="button-group" size="lg" mt="xl">
        <Group position="center" spacing="md">
          <Button component={Link} href="/login">Home</Button>
          <Button component={Link} href="/helpPage">Help</Button>
          <Button component={Link} href="/userInfo">User Info</Button>
          <Button component={Link} href="/dropImages">Drop Images</Button>
          <Button component={Link} href="/Timesheet">Timesheet</Button>
          <Button component={Link} href="/employees">Employees</Button>
          <Button component={Link} href="/inDepth">In-depth</Button>
          <Button component={Link} href="/createAccount">Create Account</Button>
        </Group>
      </Container>
    </>
  );
};

