import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './index';

const meta = {
  title: 'Commons/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'danger'],
      description: '모달의 변형 타입',
    },
    actions: {
      control: 'select',
      options: ['single', 'dual'],
      description: '버튼 액션 타입',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '테마 설정',
    },
    title: {
      control: 'text',
      description: '모달 제목',
    },
    description: {
      control: 'text',
      description: '모달 설명',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 핸들러',
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '제목을 입력해주세요',
    description: '설명을 입력해주세요',
  },
};

export const InfoSingleLight: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
};

export const InfoSingleDark: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'dark',
    title: '알림',
    description: '작업이 완료되었습니다.',
    confirmText: '확인',
  },
};

export const InfoDualLight: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '확인 필요',
    description: '이 작업을 계속하시겠습니까?',
    confirmText: '확인',
    cancelText: '취소',
  },
};

export const InfoDualDark: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'dark',
    title: '확인 필요',
    description: '이 작업을 계속하시겠습니까?',
    confirmText: '확인',
    cancelText: '취소',
  },
};

export const DangerSingleLight: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    title: '오류',
    description: '문제가 발생했습니다.',
    confirmText: '확인',
  },
};

export const DangerSingleDark: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'dark',
    title: '오류',
    description: '문제가 발생했습니다.',
    confirmText: '확인',
  },
};

export const DangerDualLight: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'light',
    title: '삭제 확인',
    description: '정말로 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

export const DangerDualDark: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'dark',
    title: '삭제 확인',
    description: '정말로 삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

export const TitleOnly: Story = {
  args: {
    title: '제목만 있는 모달',
  },
};

export const TitleOnlyDanger: Story = {
  args: {
    variant: 'danger',
    title: '경고',
  },
};

export const LongDescription: Story = {
  args: {
    title: '긴 설명이 있는 모달',
    description: '이것은 매우 긴 설명 텍스트입니다. 여러 줄로 표시될 수 있으며, 사용자에게 상세한 정보를 제공합니다. 모달의 레이아웃이 적절하게 처리되는지 확인할 수 있습니다.',
    actions: 'dual',
  },
};

export const CustomButtonText: Story = {
  args: {
    title: '사용자 정의 버튼',
    description: '버튼 텍스트를 자유롭게 설정할 수 있습니다.',
    actions: 'dual',
    confirmText: '동의합니다',
    cancelText: '거부합니다',
  },
};

