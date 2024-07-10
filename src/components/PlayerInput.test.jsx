import { render, fireEvent } from '@testing-library/react';
import PlayerInput from './PlayerInput';
import { describe, it, expect, vi } from 'vitest';

describe('PlayerInput Component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <PlayerInput newPlayer="" handlePlayerNameChange={() => {}} handleAddPlayer={() => {}} />
    );

    const input = getByPlaceholderText('Enter player name');
    expect(input).toBeInTheDocument();

    const button = getByText('Add Player');
    expect(button).toBeInTheDocument();
  });

  it('calls handlePlayerNameChange on input change', () => {
    const handlePlayerNameChange = vi.fn();
    const { getByPlaceholderText } = render(
      <PlayerInput newPlayer="" handlePlayerNameChange={handlePlayerNameChange} handleAddPlayer={() => {}} />
    );

    const input = getByPlaceholderText('Enter player name');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(handlePlayerNameChange).toHaveBeenCalled();
  });

  it('calls handleAddPlayer on button click', () => {
    const handleAddPlayer = vi.fn();
    const { getByText } = render(
      <PlayerInput newPlayer="" handlePlayerNameChange={() => {}} handleAddPlayer={handleAddPlayer} />
    );

    const button = getByText('Add Player');
    fireEvent.click(button);
    expect(handleAddPlayer).toHaveBeenCalled();
  });
});