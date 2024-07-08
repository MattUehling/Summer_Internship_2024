'use client';

import { useState, useEffect } from 'react';
import { Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons-react';
import classes from './UserInfoIcons.module.css';

export default function UserInfoIcons() {
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObj = JSON.parse(userString);
      console.log('Retrieved user from localStorage:', userObj); // Debug log
      setUser(userObj);
    }
  }, []);

  return (
    <div>
      <Group wrap="nowrap">
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={94}
          radius="md"
        />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            HR PERSON I'M GUESSING
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {user.name}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user.id}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
