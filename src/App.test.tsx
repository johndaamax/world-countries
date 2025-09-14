import { describe, test, expect } from 'vitest';

import { mockCountries } from './tests/mocks';
import { filterByCountryName, filterByRegion } from './pages/Home';

describe('test country filtering and searching', () => {
  test('filter country by name', () => {
    let filteredContries = mockCountries;
    expect(filteredContries.length).toBe(5);
    filteredContries = filterByCountryName(mockCountries, '');
    expect(filteredContries.length).toBe(5);
    filteredContries = filterByCountryName(mockCountries, 'b');
    expect(filteredContries.length).toBe(2);
    filteredContries = filterByCountryName(mockCountries, 'bel');
    expect(filteredContries.length).toBe(1);
  });

  test('filter country by region', () => {
    let filteredContries = mockCountries;
    expect(filteredContries.length).toBe(5);
    filteredContries = filterByRegion(mockCountries, 'All');
    expect(filteredContries.length).toBe(5);
    filteredContries = filterByRegion(mockCountries, 'Europe');
    expect(filteredContries.length).toBe(2);
    filteredContries = filterByRegion(mockCountries, 'Asia');
    expect(filteredContries.length).toBe(1);
  });
});
