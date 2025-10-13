import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './index';
import { useState } from 'react';

const meta = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글의 시각적 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '토글의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 설정',
    },
    checked: {
      control: 'boolean',
      description: '토글 상태 (켜짐/꺼짐)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    ariaLabel: {
      control: 'text',
      description: '접근성을 위한 라벨',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Variant Stories - Unchecked
export const PrimarySmallLightUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    checked: false,
    ariaLabel: 'Primary Small Light Toggle',
  },
};

export const PrimaryMediumLightUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    ariaLabel: 'Primary Medium Light Toggle',
  },
};

export const PrimaryLargeLightUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    checked: false,
    ariaLabel: 'Primary Large Light Toggle',
  },
};

export const PrimarySmallDarkUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Primary Small Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryMediumDarkUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Primary Medium Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryLargeDarkUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Primary Large Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Primary Variant Stories - Checked
export const PrimarySmallLightChecked: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    checked: true,
    ariaLabel: 'Primary Small Light Toggle',
  },
};

export const PrimaryMediumLightChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
    ariaLabel: 'Primary Medium Light Toggle',
  },
};

export const PrimaryLargeLightChecked: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    checked: true,
    ariaLabel: 'Primary Large Light Toggle',
  },
};

export const PrimarySmallDarkChecked: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Primary Small Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryMediumDarkChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Primary Medium Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryLargeDarkChecked: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Primary Large Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Secondary Variant Stories - Unchecked
export const SecondarySmallLightUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'light',
    checked: false,
    ariaLabel: 'Secondary Small Light Toggle',
  },
};

export const SecondaryMediumLightUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    checked: false,
    ariaLabel: 'Secondary Medium Light Toggle',
  },
};

export const SecondaryLargeLightUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'light',
    checked: false,
    ariaLabel: 'Secondary Large Light Toggle',
  },
};

export const SecondarySmallDarkUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Secondary Small Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryMediumDarkUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Secondary Medium Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryLargeDarkUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Secondary Large Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Secondary Variant Stories - Checked
export const SecondarySmallLightChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'light',
    checked: true,
    ariaLabel: 'Secondary Small Light Toggle',
  },
};

export const SecondaryMediumLightChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    checked: true,
    ariaLabel: 'Secondary Medium Light Toggle',
  },
};

export const SecondaryLargeLightChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'light',
    checked: true,
    ariaLabel: 'Secondary Large Light Toggle',
  },
};

export const SecondarySmallDarkChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Secondary Small Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryMediumDarkChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Secondary Medium Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryLargeDarkChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Secondary Large Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Tertiary Variant Stories - Unchecked
export const TertiarySmallLightUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'light',
    checked: false,
    ariaLabel: 'Tertiary Small Light Toggle',
  },
};

export const TertiaryMediumLightUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    checked: false,
    ariaLabel: 'Tertiary Medium Light Toggle',
  },
};

export const TertiaryLargeLightUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'light',
    checked: false,
    ariaLabel: 'Tertiary Large Light Toggle',
  },
};

export const TertiarySmallDarkUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Tertiary Small Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryMediumDarkUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Tertiary Medium Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryLargeDarkUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'dark',
    checked: false,
    ariaLabel: 'Tertiary Large Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Tertiary Variant Stories - Checked
export const TertiarySmallLightChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'light',
    checked: true,
    ariaLabel: 'Tertiary Small Light Toggle',
  },
};

export const TertiaryMediumLightChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    checked: true,
    ariaLabel: 'Tertiary Medium Light Toggle',
  },
};

export const TertiaryLargeLightChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'light',
    checked: true,
    ariaLabel: 'Tertiary Large Light Toggle',
  },
};

export const TertiarySmallDarkChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'small',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Tertiary Small Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryMediumDarkChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Tertiary Medium Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryLargeDarkChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'large',
    theme: 'dark',
    checked: true,
    ariaLabel: 'Tertiary Large Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Disabled States - Unchecked
export const DisabledPrimaryLightUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: true,
    ariaLabel: 'Disabled Primary Light Toggle',
  },
};

export const DisabledPrimaryDarkUnchecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    checked: false,
    disabled: true,
    ariaLabel: 'Disabled Primary Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DisabledSecondaryLightUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: true,
    ariaLabel: 'Disabled Secondary Light Toggle',
  },
};

export const DisabledSecondaryDarkUnchecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    checked: false,
    disabled: true,
    ariaLabel: 'Disabled Secondary Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DisabledTertiaryLightUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: true,
    ariaLabel: 'Disabled Tertiary Light Toggle',
  },
};

export const DisabledTertiaryDarkUnchecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    checked: false,
    disabled: true,
    ariaLabel: 'Disabled Tertiary Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Disabled States - Checked
export const DisabledPrimaryLightChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
    disabled: true,
    ariaLabel: 'Disabled Primary Light Toggle',
  },
};

export const DisabledPrimaryDarkChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    checked: true,
    disabled: true,
    ariaLabel: 'Disabled Primary Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DisabledSecondaryLightChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    checked: true,
    disabled: true,
    ariaLabel: 'Disabled Secondary Light Toggle',
  },
};

export const DisabledSecondaryDarkChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    checked: true,
    disabled: true,
    ariaLabel: 'Disabled Secondary Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const DisabledTertiaryLightChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    checked: true,
    disabled: true,
    ariaLabel: 'Disabled Tertiary Light Toggle',
  },
};

export const DisabledTertiaryDarkChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    checked: true,
    disabled: true,
    ariaLabel: 'Disabled Tertiary Dark Toggle',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Interactive Example with State Management
const InteractiveToggle = (args: any) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  
  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={setChecked}
    />
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveToggle {...args} />,
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: false,
    ariaLabel: 'Interactive Toggle',
  },
};

// Playground for testing all props
export const Playground: Story = {
  render: (args) => <InteractiveToggle {...args} />,
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: false,
    ariaLabel: 'Playground Toggle',
  },
};

