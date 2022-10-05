export type Nullable<T> = T | null;

interface Row {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface User extends Row {
  name: string;
  email: string;
}

export type InertiaSharedProps<T = Record<string, unknown>> = T & {
  // add any props shared from HandleInertiaRequests here
  auth: {
    user: Nullable<User>;
  };
};
