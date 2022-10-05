import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageContainer from '@/Components/PageContainer';
import { Heading } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <PageContainer>
      <Heading>Dashboard</Heading>
    </PageContainer>
  );
}

Dashboard.layout = (page: any) => <AuthenticatedLayout children={page} />;
