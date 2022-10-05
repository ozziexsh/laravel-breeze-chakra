import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import useRoute from '@/Hooks/useRoute';

export default function Register() {
  const route = useRoute();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  function onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setData(event.target.name as keyof typeof data, event.target.value);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    post(route('register'));
  }

  return (
    <GuestLayout>
      <Head title="Register" />

      <VStack as={'form'} align={'stretch'} spacing={4} onSubmit={submit}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>

          <Input
            type="text"
            name="name"
            value={data.name}
            autoComplete="name"
            autoFocus={true}
            onChange={onHandleChange}
            required={true}
          />

          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>

          <Input
            type="email"
            name="email"
            value={data.email}
            autoComplete="email"
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
            autoComplete="new-password"
            onChange={onHandleChange}
            required={true}
          />

          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password_confirmation}>
          <FormLabel htmlFor="password_confirmation">
            Confirm Password
          </FormLabel>

          <Input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={onHandleChange}
            required={true}
          />

          <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
        </FormControl>

        <HStack spacing={4}>
          <Spacer />

          <Link as={InertiaLink} href={route('login')}>
            Already registered?
          </Link>

          <Button type={'submit'} colorScheme={'blue'} isLoading={processing}>
            Register
          </Button>
        </HStack>
      </VStack>
    </GuestLayout>
  );
}
