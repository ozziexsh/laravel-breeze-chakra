# Laravel Breeze Chakra CLI

[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-breeze-chakra.svg?style=flat-square)](https://www.npmjs.com/package/laravel-breeze-chakra)
[![Total Downloads](https://img.shields.io/npm/dt/laravel-breeze-chakra.svg?style=flat-square)](https://www.npmjs.com/package/laravel-breeze-chakra)
[![Tests](https://github.com/ozziexsh/laravel-breeze-chakra/actions/workflows/nightly-clone.yml/badge.svg?branch=main)](https://github.com/ozziexsh/laravel-breeze-chakra/actions/workflows/nightly-clone.yml)
[![Tests](https://github.com/ozziexsh/laravel-breeze-chakra/actions/workflows/test-conversion.yml/badge.svg?branch=main)](https://github.com/ozziexsh/laravel-breeze-chakra/actions/workflows/test-conversion.yml)

Replaces the Laravel Breeze React install with Chakra UI.

## Usage

Simply scaffold a new breeze application using the react stack, then run this cli tool.

```bash
composer create-project laravel/laravel myapp
cd myapp
composer require laravel/breeze
php artisan breeze:install react
npx laravel-breeze-chakra@latest install
```

It does not support SSR at this time due to a bug in Chakra's module exports.

## Components

Checkout the [src/stubs](./src/stubs) folder to view all the generated files

Here are a few helpers available to you

### useRoute()

[Source](https://github.com/ozziexsh/laravel-breeze-chakra/blob/main/src/stubs/resources/js/Hooks/useRoute.ts)

Gives you access to a typed version of [`ziggy-js`](https://github.com/tighten/ziggy)

```javascript
import useRoute from '@/Hooks/useRoute';

function Component() {
  const route = useRoute();
  
  return <a href={route('login')}>Login</a>;
}
```

### useTypedPage()

[Source](https://github.com/ozziexsh/laravel-breeze-chakra/blob/main/src/stubs/resources/js/Hooks/useTypedPage.ts)

Gives you access to a typed version of [`usePage()`]() from inertia

The type is prefilled with the shared props that jetstream passes through and gives you the option to pass your own type if your page has custom props in addition to the others

```typescript
import useTypedPage from '@/Hooks/useTypedPage';

function Component() {
  const { props } = useTypedPage<{ canViewThisPage: boolean; }>();
  
  // our custom type is hinted here as well 
  // as the inertia global props such as `auth.user`
  const { canViewThisPage, auth } = props;
}
```

## Building Locally

I had issues with using `npm link` so I have opted for these steps instead.

First install dependencies and run the build script

```shell
npm install
npm build
```

Then create a fresh laravel install with breeze

```shell
composer create-project laravel/laravel myapp
cd myapp
composer require laravel/breeze
php artisan breeze:install react
```

Finally run the locally built version of laravel-breeze-chakra

```shell
# from inside the "myapp" directory
# find wherever you cloned the laravel-breeze-chakra repo
../laravel-breeze-chakra/bin/run install
```
