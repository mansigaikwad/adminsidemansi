/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function Layout(props) {
  return (
    <DashboardLayout>
      <PageContainer>{props.children}</PageContainer>
    </DashboardLayout>
  );
}

