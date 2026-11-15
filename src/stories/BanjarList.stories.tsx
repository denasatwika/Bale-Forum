import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import BanjarList from '../components/banjar/BanjarList';

const meta: Meta<typeof BanjarList> = {
  title: 'Banjar/BanjarList',
  component: BanjarList,
  args: {
    categories: ['adat', 'kuliner', 'teknologi', 'pariwisata'],
    onSelect: fn(),
  },
};

export default meta;

const TemplateStory: StoryFn<typeof BanjarList> = (args) => <BanjarList {...args} />;

export const SemuaTopik = TemplateStory.bind({});
SemuaTopik.args = {
  selected: '',
};

export const TopikTerpilih = TemplateStory.bind({});
TopikTerpilih.args = {
  selected: 'kuliner',
};