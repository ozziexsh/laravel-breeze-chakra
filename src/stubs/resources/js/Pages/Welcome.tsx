import React from 'react';
import { Head, InertiaLink } from '@inertiajs/inertia-react';
import { Box, Heading, HStack, Link, Spacer } from '@chakra-ui/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

export default function Welcome() {
  const route = useRoute();
  const { props } = useTypedPage();

  return (
    <>
      <Head title="Welcome" />
      <Box minH={'100vh'} bg={'gray.100'}>
        <Box maxW={'2xl'} mx={'auto'} p={8}>
          <HStack>
            <Spacer />
            {props.auth.user ? (
              <Link as={InertiaLink} href={route('dashboard')}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link as={InertiaLink} href={route('login')}>
                  Login
                </Link>
                <Link as={InertiaLink} href={route('register')}>
                  Register
                </Link>
              </>
            )}
          </HStack>

          <Box bg={'white'} shadow={'md'} rounded={'md'} p={4} mt={6}>
            <Heading>Welcome!</Heading>
          </Box>
        </Box>
      </Box>
    </>
  );
}
