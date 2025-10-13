import type { Meta, StoryObj } from '@storybook/react';
import { Selectbox } from './index';

const sampleOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
];

const sampleOptionsWithDisabled = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2', disabled: true },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4', disabled: true },
  { value: 'option5', label: '옵션 5' },
];

const meta = {
  title: 'Commons/Components/Selectbox',
  component: Selectbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 설정',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
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
    options: {
      control: 'object',
      description: '셀렉트박스 옵션 목록',
    },
  },
} satisfies Meta<typeof Selectbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Variant Stories
export const PrimarySmallLight: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const PrimaryMediumLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const PrimaryLargeLight: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const PrimarySmallDark: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const SecondaryMediumLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const SecondaryLargeLight: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const SecondarySmallDark: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const TertiaryMediumLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const TertiaryLargeLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
  },
};

export const TertiarySmallDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
    disabled: true,
  },
};

export const DisabledPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
    disabled: true,
  },
};

export const DisabledSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
    disabled: true,
  },
};

export const DisabledTertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
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
    options: sampleOptions,
    placeholder: '선택하세요',
    error: true,
  },
};

export const ErrorPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
    error: true,
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
    options: sampleOptions,
    placeholder: '선택하세요',
    error: true,
  },
};

export const ErrorSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
    error: true,
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
    options: sampleOptions,
    placeholder: '선택하세요',
    success: true,
  },
};

export const SuccessPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
    success: true,
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
    options: sampleOptions,
    placeholder: '선택하세요',
    success: true,
  },
};

export const SuccessSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptions,
    placeholder: '선택하세요',
    success: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// With Disabled Options
export const WithDisabledOptionsLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: sampleOptionsWithDisabled,
    placeholder: '선택하세요',
  },
};

export const WithDisabledOptionsDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    options: sampleOptionsWithDisabled,
    placeholder: '선택하세요',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Interactive Example
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: sampleOptions,
    placeholder: '선택하세요',
    disabled: false,
    error: false,
    success: false,
  },
};

