import React from 'react';
import { render, screen } from '@testing-library/react';
import { Link } from 'wouter';
import Gif from './index';

// Mock de wouter
jest.mock('wouter', () => ({
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

const mockGif = {
  id: 'test123',
  title: 'Test Gif',
  url: 'https://example.com/test.gif',
};

describe('Gif Component', () => {
  test('renders gif with correct alt text', () => {
    render(<Gif {...mockGif} />);
    
    const image = screen.getByAltText('Test Gif');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/test.gif');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  test('renders gif without title with fallback alt', () => {
    render(<Gif id="test" url="https://example.com/test.gif" title="" />);
    
    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
  });

  test('has correct link to detail page', () => {
    render(<Gif {...mockGif} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/gif/test123');
  });
});