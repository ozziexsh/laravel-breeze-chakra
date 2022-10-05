import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/inertia-react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import useRoute from '@/Hooks/useRoute';

export default function ForgotPassword({ status }: { status: string }) {
  const route = useRoute();
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  function onHandleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setData(event.target.name as keyof typeof data, event.target.value);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    post(route('password.email'), {
      onSuccess() {
        reset();
      },
    });
  }

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <VStack spacing={4} align={'stretch'}>
        <Text fontSize={'sm'} color={'gray.500'}>
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </Text>

        {status && (
          <Text fontSize={'sm'} color={'green.600'}>
            {status}
          </Text>
        )}

        <form onSubmit={submit}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              type="email"
              name="email"
              value={data.email}
              autoFocus={true}
              onChange={onHandleChange}
            />

            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <HStack mt={4}>
            <Spacer />
            <Button type={'submit'} colorScheme={'blue'} isLoading={processing}>
              Email Password Reset Link
            </Button>
          </HStack>
        </form>
      </VStack>
    </GuestLayout>
  );
}
