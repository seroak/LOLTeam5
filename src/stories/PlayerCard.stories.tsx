import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerCard } from "../components/PlayerCard/PlayerCard";
import { DndContext } from "@dnd-kit/core";

import { fn } from "storybook/test";

const meta: Meta<typeof PlayerCard> = {
  title: "Components/PlayerCard",
  component: PlayerCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <DndContext>
        <Story />
      </DndContext>
    ),
  ],
  argTypes: {
    name: { control: "text" },
  },
  args: {
    handleRemovePlayer: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "player-1",
    name: "Faker",
  },
};
