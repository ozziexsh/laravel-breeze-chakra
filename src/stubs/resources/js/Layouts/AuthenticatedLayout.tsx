import React, { PropsWithChildren, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import useRoute from '@/Hooks/useRoute';
import ApplicationLogo from '@/Components/ApplicationLogo';
import useTypedPage from '@/Hooks/useTypedPage';
import PageContainer from '@/Components/PageContainer';

export default function AuthenticatedLayout({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const route = useRoute();
  const {
    props: { auth },
  } = useTypedPage();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const boxShadow = useColorModeValue('sm', 'sm-dark');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const links = [
    {
      label: 'Dashboard',
      href: route('dashboard'),
      isActive: route().current('dashboard'),
    },
  ];

  function logout() {
    Inertia.post(route('logout'));
  }

  return (
    <Box minH={'100vh'} bg={'gray.100'}>
      <Box as="section">
        <Box as="nav" bg="white" boxShadow={boxShadow}>
          <PageContainer mx={'auto'} py={4}>
            <HStack spacing={10} align={'center'} justify="space-between">
              <InertiaLink href={route('dashboard')}>
                <Icon as={ApplicationLogo} w={'auto'} h={10} />
              </InertiaLink>

              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  <ButtonGroup size={'sm'} variant={'ghost'}>
                    {links.map(link => (
                      <Button
                        key={link.href}
                        as={InertiaLink}
                        href={link.href}
                        colorScheme={link.isActive ? 'blue' : undefined}
                        fontWeight={'600'}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </ButtonGroup>
                  <Spacer />
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant={'ghost'}
                      size={'sm'}
                      fontWeight={'600'}
                      rightIcon={<Icon as={ChevronDownIcon} />}
                    >
                      {auth.user?.name}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              ) : (
                <IconButton
                  variant="ghost"
                  icon={<Icon as={mobileNavOpen ? XMarkIcon : Bars3Icon} />}
                  aria-label="Open Menu"
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                />
              )}
            </HStack>
          </PageContainer>

          {mobileNavOpen && (
            <VStack p={4}>
              {links.map(link => (
                <Button
                  key={link.href}
                  as={InertiaLink}
                  href={link.href}
                  colorScheme={link.isActive ? 'blue' : undefined}
                  fontWeight={'600'}
                  variant="ghost"
                  size={'sm'}
                  w={'full'}
                >
                  {link.label}
                </Button>
              ))}
              <Divider />

              <Text>{auth.user?.name}</Text>

              <Button
                onClick={logout}
                fontWeight={'600'}
                variant="ghost"
                size={'sm'}
                w={'full'}
              >
                Logout
              </Button>
            </VStack>
          )}
        </Box>
      </Box>

      <main>{children}</main>
    </Box>
  );
}
