import {renderHook} from '@testing-library/react-hooks';
import useDebounce from './use-debounce';

describe('Hook: useDebounce', () => {

  it('should return value', () => {

    const {result} = renderHook(() =>
      useDebounce('CURT', 500),
    );

    expect(result.current).toBe('CURT');
  });

});
