import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';

const meta = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '인풋의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '인풋의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 설정',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    success: {
      control: 'boolean',
      description: '성공 상태',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Variant Stories
export const PrimarySmallLight: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const PrimaryMediumLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const PrimaryLargeLight: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const PrimarySmallDark: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryMediumDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryLargeDark: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Secondary Variant Stories
export const SecondarySmallLight: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const SecondaryMediumLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const SecondaryLargeLight: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const SecondarySmallDark: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryMediumDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryLargeDark: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Tertiary Variant Stories
export const TertiarySmallLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const TertiaryMediumLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const TertiaryLargeLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'light',
    placeholder: 'Enter text...',
  },
};

export const TertiarySmallDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryMediumDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryLargeDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'dark',
    placeholder: 'Enter text...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Disabled States
export const DisabledPrimaryLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    disabled: true,
  },
};

export const DisabledPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    disabled: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DisabledSecondaryLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    disabled: true,
  },
};

export const DisabledSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    disabled: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DisabledTertiaryLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    disabled: true,
  },
};

export const DisabledTertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    disabled: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Error States
export const ErrorPrimaryLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    error: true,
    value: 'Invalid input',
  },
};

export const ErrorPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    error: true,
    value: 'Invalid input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const ErrorSecondaryLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    error: true,
    value: 'Invalid input',
  },
};

export const ErrorSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    error: true,
    value: 'Invalid input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const ErrorTertiaryLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    error: true,
    value: 'Invalid input',
  },
};

export const ErrorTertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    error: true,
    value: 'Invalid input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Success States
export const SuccessPrimaryLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    success: true,
    value: 'Valid input',
  },
};

export const SuccessPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    success: true,
    value: 'Valid input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SuccessSecondaryLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    success: true,
    value: 'Valid input',
  },
};

export const SuccessSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    success: true,
    value: 'Valid input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SuccessTertiaryLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Enter text...',
    success: true,
    value: 'Valid input',
  },
};

export const SuccessTertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    placeholder: 'Enter text...',
    success: true,
    value: 'Valid input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Different Input Types
export const TypeEmail: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const TypePassword: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const TypeNumber: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    type: 'number',
    placeholder: 'Enter a number',
  },
};

export const TypeTel: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    type: 'tel',
    placeholder: '010-0000-0000',
  },
};

export const TypeUrl: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    type: 'url',
    placeholder: 'https://example.com',
  },
};

// Interactive Example
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: 'Playground Input',
    disabled: false,
    error: false,
    success: false,
  },
};

