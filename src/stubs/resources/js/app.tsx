import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ChakraProvider } from '@chakra-ui/react';
import { RouteContext } from '@/Hooks/useRoute';
import theme from '@/theme';

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    return render(
      <RouteContext.Provider value={(window as any).route}>
        <ChakraProvider theme={theme}>
          <App {...props} />
        </ChakraProvider>
      </RouteContext.Provider>,
      el,
    );
  },
});

InertiaProgress.init({ color: '#4B5563' });
