import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import TemplateSelector from '../common/TemplateSelector';
import { TemplateKey } from '../../components/TemplateTypes';

describe('TemplateSelector', () => {
  test('renders thumbnails and allows switching templates', () => {
    const onChange = vi.fn();
    render(<TemplateSelector value={'optimized' as TemplateKey} onChange={onChange} language={'en'} />);

    // should show labels for all options
    expect(screen.getByText(/Precision/i)).toBeInTheDocument();
    expect(screen.getByText(/Snapshot/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimal/i)).toBeInTheDocument();

    // click the compact option
    const compactLabel = screen.getByText(/Snapshot/i).closest('label');
    expect(compactLabel).toBeTruthy();
    if (compactLabel) fireEvent.click(compactLabel);

    expect(onChange).toHaveBeenCalledWith('compact');
  });
});
