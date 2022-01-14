import {getMonthName} from './get-month-name';

describe('Function getMonthName:', () => {

  it('should work correct', () => {
    expect(getMonthName(0)).toEqual('января');
  });

});
