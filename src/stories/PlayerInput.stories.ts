import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerInput } from "../components/PlayerInput/PlayerInput";
import { fn } from "storybook/test";

const meta: Meta<typeof PlayerInput> = {
  title: "Components/PlayerInput",
  component: PlayerInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onAddPlayer: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
