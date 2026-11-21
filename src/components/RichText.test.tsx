import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RichText } from './RichText';

describe('RichText', () => {
  it('renders an <a> as a link opening safely in a new tab', () => {
    render(
      <RichText html='Processing - <a href="http://example.com/rolf">Rolf Olsen</a>' />,
    );

    const link = screen.getByRole('link', { name: 'Rolf Olsen' });
    expect(link).toHaveAttribute('href', 'http://example.com/rolf');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText(/Processing -/)).toBeInTheDocument();
  });

  it('keeps multiple links from a real credit string', () => {
    render(
      <RichText html='Data - <a href="https://voyager.jpl.nasa.gov/">Voyager 2</a>, <a href="https://pds-rings.seti.org/">NASA PDS</a>' />,
    );

    expect(screen.getByRole('link', { name: 'Voyager 2' })).toHaveAttribute(
      'href',
      'https://voyager.jpl.nasa.gov/',
    );
    expect(screen.getByRole('link', { name: 'NASA PDS' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders a <br> as a line break', () => {
    const { container } = render(<RichText html="Line one<br>Line two" />);
    expect(container.querySelector('br')).toBeInTheDocument();
  });

  it('drops a non-http href to plain text (no link)', () => {
    render(<RichText html={'<a href="javascript:alert(1)">click</a>'} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('click')).toBeInTheDocument();
  });

  it('renders plain text unchanged', () => {
    render(<RichText html="Just some credit" />);
    expect(screen.getByText('Just some credit')).toBeInTheDocument();
  });
});
