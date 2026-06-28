jest.useFakeTimers();

if (typeof fetch === 'undefined') {
  global.fetch = jest.fn();
}
