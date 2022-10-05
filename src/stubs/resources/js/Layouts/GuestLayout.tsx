import React, { PropsWithChildren } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import { Box, Icon } from '@chakra-ui/react';

export default function Guest({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <Box
      minH={'100vh'}
      display={'flex'}
      flexFlow={'column'}
      justifyContent={{ sm: 'center' }}
      alignItems={'center'}
      pt={{ base: 6, sm: 0 }}
      bg={'gray.100'}
    >
      <div>
        <Link href="/">
          <Icon
            as={ApplicationLogo}
            w={20}
            h={20}
            color={'gray.400'}
            fill={'currentColor'}
          />
        </Link>
      </div>

      <Box
        w={'full'}
        maxW={{ sm: 'md' }}
        mt={6}
        px={6}
        py={4}
        bg={'white'}
        shadow={'md'}
        overflow={'hidden'}
        rounded={{ sm: 'lg' }}
      >
        {children}
      </Box>
    </Box>
  );
}
