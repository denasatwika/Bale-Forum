import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import VoteControl from '../components/common/VoteControl';

const meta: Meta<typeof VoteControl> = {
  title: 'Common/VoteControl',
  component: VoteControl,
  tags: ['autodocs'],
  args: {
    onVote: fn(),
  },
};

export default meta;

const TemplateStory: StoryFn<typeof VoteControl> = (args) => <VoteControl {...args} />;

export const BelumMemberiVote = TemplateStory.bind({});
BelumMemberiVote.args = {
  upVotesBy: ['user-2', 'user-3'],
  downVotesBy: ['user-4'],
  authUserId: 'user-1',
};

export const SudahSetuju = TemplateStory.bind({});
SudahSetuju.args = {
  upVotesBy: ['user-1', 'user-2', 'user-3'],
  downVotesBy: ['user-4'],
  authUserId: 'user-1',
};

export const SudahTidakSetuju = TemplateStory.bind({});
SudahTidakSetuju.args = {
  upVotesBy: ['user-2', 'user-3'],
  downVotesBy: ['user-1', 'user-4'],
  authUserId: 'user-1',
};

export const Tamu = TemplateStory.bind({});
Tamu.args = {
  upVotesBy: ['user-2', 'user-3'],
  downVotesBy: ['user-4'],
};