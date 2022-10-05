import React from 'react';
import { Container, ContainerProps } from '@chakra-ui/react';

export default function PageContainer(props: ContainerProps) {
  return <Container maxW={'container.lg'} py={12} {...props} />;
}
