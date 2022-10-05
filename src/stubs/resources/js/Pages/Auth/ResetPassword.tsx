import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import useRoute from '@/Hooks/useRoute';

export default function ResetPassword({
  token,
  email,
}: {
  token: string;
  email: string;
}) {
  const route = useRoute();
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.name as keyof typeof data, event.target.value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('password.update'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <VStack as={'form'} align={'stretch'} spacing={4} onSubmit={submit}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>

          <Input type="email" name="email" value={data.email} />

          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>

          <Input
            type="password"
            name="password"
            value={data.password}
            autoComplete="new-password"
            autoFocus={true}
            onChange={onHandleChange}
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
            autoComplete="new-password"
            onChange={onHandleChange}
          />

          <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
        </FormControl>

        <HStack>
          <Spacer />
          <Button type={'submit'} colorScheme={'blue'} isLoading={processing}>
            Reset Password
          </Button>
        </HStack>
      </VStack>
    </GuestLayout>
  );
}
