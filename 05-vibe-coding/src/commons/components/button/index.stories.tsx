import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
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
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Variant Stories
export const PrimarySmallLight: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    children: 'Button',
  },
};

export const PrimaryMediumLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Button',
  },
};

export const PrimaryLargeLight: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    children: 'Button',
  },
};

export const PrimarySmallDark: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'dark',
    children: 'Button',
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
    children: 'Button',
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
    children: 'Button',
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
    children: 'Button',
  },
};

export const SecondaryMediumLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    children: 'Button',
  },
};

export const SecondaryLargeLight: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'light',
    children: 'Button',
  },
};

export const SecondarySmallDark: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'dark',
    children: 'Button',
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
    children: 'Button',
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
    children: 'Button',
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
    children: 'Button',
  },
};

export const TertiaryMediumLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    children: 'Button',
  },
};

export const TertiaryLargeLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'light',
    children: 'Button',
  },
};

export const TertiarySmallDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'dark',
    children: 'Button',
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
    children: 'Button',
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
    children: 'Button',
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
    children: 'Button',
    disabled: true,
  },
};

export const DisabledPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    children: 'Button',
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
    children: 'Button',
    disabled: true,
  },
};

export const DisabledSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    children: 'Button',
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
    children: 'Button',
    disabled: true,
  },
};

export const DisabledTertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    children: 'Button',
    disabled: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Full Width
export const FullWidthPrimaryLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const FullWidthPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
};

// With Icons (using simple SVG icons as examples)
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Previous',
    leftIcon: <ChevronLeftIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Next',
    rightIcon: <ChevronRightIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    children: 'Navigate',
    leftIcon: <ChevronLeftIcon />,
    rightIcon: <ChevronRightIcon />,
  },
};

// Interactive Example
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    children: 'Playground Button',
    disabled: false,
    fullWidth: false,
  },
};

