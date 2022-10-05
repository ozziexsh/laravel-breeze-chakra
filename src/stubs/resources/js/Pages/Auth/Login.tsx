import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react';
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Spacer,
  VStack,
  Text,
} from '@chakra-ui/react';
import useRoute from '@/Hooks/useRoute';

export default function Login({
  status,
  canResetPassword,
}: {
  status: string;
  canResetPassword: boolean;
}) {
  const route = useRoute();
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  function onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setData(
      event.target.name as keyof typeof data,
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value,
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    post(route('login'));
  }

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <Text mb={4} fontWeight={'medium'} fontSize={'sm'} color={'green.600'}>
          {status}
        </Text>
      )}
      <form onSubmit={submit}>
        <VStack align={'stretch'} spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>

            <Input
              type="email"
              name="email"
              value={data.email}
              autoComplete="email"
              autoFocus={true}
              onChange={onHandleChange}
              required={true}
            />

            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>

            <Input
              type="password"
              name="password"
              value={data.password}
              autoComplete="current-password"
              onChange={onHandleChange}
              required={true}
            />

            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <HStack>
              <Checkbox
                name="remember"
                onChange={onHandleChange}
                isChecked={data.remember}
              >
                Remember me
              </Checkbox>
              <Spacer />
              {canResetPassword && (
                <Link as={InertiaLink} href={route('password.request')}>
                  Forgot your password?
                </Link>
              )}
            </HStack>
          </FormControl>
        </VStack>

        <HStack mt={8}>
          <Spacer />

          <Link as={InertiaLink} href={route('register')}>
            Need an account?
          </Link>

          <Button type={'submit'} colorScheme={'blue'} isLoading={processing}>
            Log in
          </Button>
        </HStack>
      </form>
    </GuestLayout>
  );
}
