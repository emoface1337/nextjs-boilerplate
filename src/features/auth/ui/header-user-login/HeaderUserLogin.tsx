'use client';
import { useGetUser } from '@/features/auth/hooks/useAuth';
import DefaultUserIcon from '@/shared/assets/icons/User.svg';
import Image from 'next/image';
import styles from './HeaderUserLogin.module.scss';
import LoadingIndicator from '@/shared/ui/Loading/LoadingIndicator';
import React from 'react';

export function HeaderUserLogin() {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return <LoadingIndicator />;

  return <div className={styles.avatar}>{user?.image ? <Image src={user.image} alt={''} /> : <DefaultUserIcon />}</div>;
}
