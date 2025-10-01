import type { Preview } from '@storybook/nextjs'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        push: () => {},
        replace: () => {},
        prefetch: () => {},
      },
    },
  },
};

export default preview;