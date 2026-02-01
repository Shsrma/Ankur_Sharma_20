import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

describe('NotFound Page', () => {
  it('should render the 404 page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('should have a link back to home', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
