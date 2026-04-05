import { renderHook, waitFor } from '@testing-library/react';
import { GifsContextProvider } from '../context/GifsContext';
import { useGifs } from './useGifs';

// Mock del servicio
jest.mock('../services/Giffys/getGits', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve([
      { id: '1', title: 'Test 1', url: 'https://example.com/1.gif' },
      { id: '2', title: 'Test 2', url: 'https://example.com/2.gif' },
    ])
  ),
  getTrendingGifs: jest.fn(() =>
    Promise.resolve([
      { id: '3', title: 'Trending 1', url: 'https://example.com/3.gif' },
    ])
  ),
}));

describe('useGifs Hook', () => {
  const wrapper = ({ children }) => (
    <GifsContextProvider>{children}</GifsContextProvider>
  );

  test('initial state has loading true', () => {
    const { result } = renderHook(() => useGifs({ keyword: 'test' }), { wrapper });
    
    expect(result.current.loading).toBe(true);
    expect(result.current.gifs).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test('fetches gifs successfully', async () => {
    const { result } = renderHook(() => useGifs({ keyword: 'test' }), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.gifs).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  test('handleNextPage increments page', async () => {
    const { result } = renderHook(() => useGifs({ keyword: 'test' }), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    result.current.handleNextPage();
    
    await waitFor(() => {
      expect(result.current.loadingNextPage).toBe(true);
    });
  });
});