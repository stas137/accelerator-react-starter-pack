import {renderHook} from '@testing-library/react-hooks';
import useDebounce from './use-debounce';
import {DELAY_MS} from '../utils/const';

describe('Hook: useDebounce', () => {

  it('should return value', () => {

    const {result} = renderHook(() =>
      useDebounce('CURT', DELAY_MS),
    );

    expect(result.current).toBe('CURT');
  });

});
