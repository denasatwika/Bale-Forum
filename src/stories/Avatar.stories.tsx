import type { Meta, StoryFn } from '@storybook/react-vite';
import Avatar from '../components/common/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  args: {
    src: 'https://ui-avatars.com/api/?name=Dena&background=random',
    name: 'Dena',
  },
};

export default meta;

const TemplateStory: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const Kecil = TemplateStory.bind({});
Kecil.args = { size: 'sm' };

export const Sedang = TemplateStory.bind({});
Sedang.args = { size: 'md' };

export const Besar = TemplateStory.bind({});
Besar.args = { size: 'lg' };