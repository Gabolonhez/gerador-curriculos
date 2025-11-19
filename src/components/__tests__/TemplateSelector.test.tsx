import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import TemplateSelector from '../common/TemplateSelector';
import { TemplateKey } from '../../components/TemplateTypes';

describe('TemplateSelector', () => {
  test('renders thumbnails and allows switching templates', () => {
    const onChange = vi.fn();
    render(<TemplateSelector value={'optimized' as TemplateKey} onChange={onChange} language={'en'} />);

    // should show labels for several options
    expect(screen.getByText(/Precision/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimal/i)).toBeInTheDocument();

    // click the professional option
    const profLabel = screen.getByText(/Professional/i).closest('label');
    expect(profLabel).toBeTruthy();
    if (profLabel) fireEvent.click(profLabel);

    expect(onChange).toHaveBeenCalledWith('professional');
  });
});
