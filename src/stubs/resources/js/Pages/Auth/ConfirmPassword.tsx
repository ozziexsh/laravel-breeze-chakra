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
  Text,
  VStack,
} from '@chakra-ui/react';
import useRoute from '@/Hooks/useRoute';

export default function ConfirmPassword() {
  const route = useRoute();
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.name as keyof typeof data, event.target.value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('password.confirm'));
  };

  return (
    <GuestLayout>
      <Head title="Confirm Password" />

      <Text mb={4} fontSize={'sm'} color={'gray.600'}>
        This is a secure area of the application. Please confirm your password
        before continuing.
      </Text>

      <VStack as={'form'} align={'stretch'} spacing={4} onSubmit={submit}>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>

          <Input
            type="password"
            name="password"
            value={data.password}
            autoFocus={true}
            onChange={onHandleChange}
          />

          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>

        <HStack>
          <Spacer />
          <Button type={'submit'} colorScheme={'blue'} isLoading={processing}>
            Confirm
          </Button>
        </HStack>
      </VStack>
    </GuestLayout>
  );
}
