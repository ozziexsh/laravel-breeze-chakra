import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react';
import { Button, FormControl, HStack, Spacer, Text } from '@chakra-ui/react';
import useRoute from '@/Hooks/useRoute';

export default function VerifyEmail({ status }: { status: string }) {
  const route = useRoute();
  const { post, processing } = useForm();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />

      <Text mb={4} fontSize={'sm'} color={'gray.600'}>
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn't receive the email, we will gladly send you another.
      </Text>

      {status === 'verification-link-sent' && (
        <Text mb={4} fontWeight={'medium'} fontSize={'sm'} color={'green.600'}>
          A new verification link has been sent to the email address you
          provided during registration.
        </Text>
      )}

      <form onSubmit={submit}>
        <FormControl
          as={HStack}
          mt={4}
          className="mt-4 flex items-center justify-between"
        >
          <Button colorScheme={'blue'} type={'submit'} isLoading={processing}>
            Resend Verification Email
          </Button>

          <Spacer />

          <Button
            as={InertiaLink}
            href={route('logout')}
            variant={'link'}
            method="post"
          >
            Log Out
          </Button>
        </FormControl>
      </form>
    </GuestLayout>
  );
}
