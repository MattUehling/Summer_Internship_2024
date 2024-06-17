'use client'
import { AppShell, Burger, Group, Skeleton, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

const data = [
  { link: '/login', label: 'Home Page'},
  { link: '/helpPage', label: 'Help Page'},
  { link: '/userInfo', label: 'User Info'},
  { link: '/employees', label: 'Employees'},
  { link: '', label: 'Log Out'}
];

export default function BasicAppShell({children}:{children:any}) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {data.map(({ link, label }) => (
          <Link key={label} href={link}>
            <Button variant="link" color="gray" size="sm" style={{ margin: 10 }}>
              {label}
            </Button>
          </Link>
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
