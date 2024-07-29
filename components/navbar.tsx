import { useState } from 'react';
import { Group, Code, Button } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';

const data = [
  { link: '/login', label: 'Home Page', icon: IconBellRinging },
  { link: '/helpPage', label: 'Help Page', icon: IconReceipt2 },
  { link: '/userInfo', label: 'User Info', icon: IconFingerprint },
  { link: '/employees', label: 'Employees', icon: IconKey },
];

export default function NavbarSimpleColored() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));
  <Button onClick={close()}>Log Out</Button>
}
