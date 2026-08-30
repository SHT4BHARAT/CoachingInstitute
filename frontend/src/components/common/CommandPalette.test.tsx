import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// --- minimal mocks for next/navigation, LanguageContext, AuthContext ---
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('@/context/LanguageContext', () => ({
  useLanguage: () => ({ lang: 'en', setLang: vi.fn(), t: (k: string) => k }),
}));

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    switchRole: vi.fn(),
    isKonkanMode: false,
    toggleKonkanMode: vi.fn(),
  }),
}));

// Import after mocks
import { CommandPalette } from './CommandPalette';

function openPalette() {
  // component listens for '/' key when not in INPUT/TEXTAREA
  fireEvent.keyDown(window, { key: '/', code: 'Slash' });
}

describe('CommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders palette items with role="option" and aria-selected after opening', async () => {
    render(<CommandPalette />);
    // palette is hidden initially
    expect(screen.queryByRole('dialog', { name: /Command palette/i })).not.toBeInTheDocument();

    openPalette();

    const dialog = await screen.findByRole('dialog', { name: /Command palette/i });
    expect(dialog).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);

    // every option should have aria-selected attribute
    options.forEach((opt) => {
      expect(opt).toHaveAttribute('aria-selected');
    });

    // first item should be selected by default
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    // rest should be false initially
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('close button has aria-label', async () => {
    render(<CommandPalette />);
    openPalette();
    const closeBtn = await screen.findByRole('button', { name: /Close command palette/i });
    expect(closeBtn).toHaveAttribute('aria-label', 'Close command palette');
  });

  it('clicking close button closes the palette', async () => {
    render(<CommandPalette />);
    openPalette();
    const dialog = await screen.findByRole('dialog', { name: /Command palette/i });
    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /Close command palette/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog', { name: /Command palette/i })).not.toBeInTheDocument();
  });

  it('keyboard navigation updates aria-selected', async () => {
    render(<CommandPalette />);
    openPalette();
    await screen.findByRole('dialog');

    const optionsBefore = screen.getAllByRole('option');
    expect(optionsBefore[0]).toHaveAttribute('aria-selected', 'true');

    // ArrowDown should move selection to index 1
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'ArrowDown', code: 'ArrowDown' });

    const optionsAfter = screen.getAllByRole('option');
    expect(optionsAfter[1]).toHaveAttribute('aria-selected', 'true');
    expect(optionsAfter[0]).toHaveAttribute('aria-selected', 'false');
  });
});
