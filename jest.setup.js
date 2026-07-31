// react-native's jest preset shims requestAnimationFrame as
// `setTimeout(() => callback(jest.now()), 0)`. Components driving Animated
// keep rescheduling those timers past the test's synchronous assertions, so
// callbacks fire after the environment is torn down and blow up on jest.now().
//
// Fake timers keep that clock under jest's control: pending callbacks are
// discarded with the fake clock instead of leaking onto node's event loop.
// RNTL registers its auto-cleanup after this hook, so its unmount runs first
// (afterEach unwinds in reverse) while fake timers are still installed.
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});
