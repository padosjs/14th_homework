import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';
import { useState } from 'react';

const meta = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Pagination의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Pagination의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 설정',
    },
    currentPage: {
      control: 'number',
      description: '현재 페이지 번호',
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
    },
    maxVisiblePages: {
      control: 'number',
      description: '한 번에 표시할 최대 페이지 수',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Variant Stories
export const PrimarySmallLight: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const PrimaryMediumLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const PrimaryLargeLight: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const PrimarySmallDark: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'dark',
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const SecondaryMediumLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const SecondaryLargeLight: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'light',
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const SecondarySmallDark: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'dark',
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const TertiaryMediumLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const TertiaryLargeLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'light',
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

export const TertiarySmallDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'dark',
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
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
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Edge Cases
export const SinglePage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 1,
    maxVisiblePages: 5,
  },
};

export const FewPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 2,
    totalPages: 3,
    maxVisiblePages: 5,
  },
};

export const ManyPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 25,
    totalPages: 50,
    maxVisiblePages: 5,
  },
};

export const MaxVisiblePagesThree: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 20,
    maxVisiblePages: 3,
  },
};

export const MaxVisiblePagesSeven: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 10,
    totalPages: 20,
    maxVisiblePages: 7,
  },
};

// Interactive Example with State
export const Interactive: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

// Playground
export const Playground: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
  },
};

