import type { Meta, StoryObj } from '@storybook/react';
import { Searchbar } from './index';

const meta = {
  title: 'Commons/Components/Searchbar',
  component: Searchbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '검색바의 크기',
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
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    onSearch: {
      action: 'searched',
      description: 'Enter 키 입력 시 실행되는 콜백',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Variant Stories
export const PrimarySmallLight: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const PrimaryMediumLight: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const PrimaryLargeLight: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const PrimarySmallDark: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'dark',
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const SecondaryMediumLight: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const SecondaryLargeLight: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const SecondarySmallDark: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'dark',
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const TertiaryMediumLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const TertiaryLargeLight: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
  },
};

export const TertiarySmallDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'dark',
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
    disabled: true,
  },
};

export const DisabledPrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
    disabled: true,
  },
};

export const DisabledSecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    placeholder: '검색어를 입력해 주세요.',
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
    placeholder: '검색어를 입력해 주세요.',
    disabled: true,
  },
};

export const DisabledTertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    placeholder: '검색어를 입력해 주세요.',
    disabled: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// With Default Value
export const WithDefaultValue: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
    defaultValue: 'React Components',
  },
};

// Custom Placeholder
export const CustomPlaceholder: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '상품명, 브랜드명을 검색해보세요.',
  },
};

// Interactive Example
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '검색어를 입력해 주세요.',
    disabled: false,
  },
};

