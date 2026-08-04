// react-native's jest preset shims requestAnimationFrame as
// `setTimeout(() => callback(jest.now()), 0)`, and its Animated mock finishes
// animations via `setTimeout(endCallback, 16)`. Components driving Animated
// keep rescheduling those past the test's synchronous assertions, so callbacks
// fire after the environment is torn down and blow up on jest.now().
//
// Fake timers keep that clock under jest's control: pending callbacks are
// discarded with the fake clock instead of leaking onto node's event loop.
//
// Deliberately no afterEach restoring real timers. Hooks registered here run
// BEFORE the auto-cleanup RNTL registers when a test file imports it (same
// level, so definition order -- not reverse). Calling useRealTimers here would
// therefore land before RNTL unmounts, and the unmount would schedule real
// timers that outlive the environment. Verified: adding that hook back
// reintroduces exactly one "torn down" error in BottomSheet.test.tsx. Fake
// timers simply retire with the environment at the end of each file.
beforeEach(() => {
  jest.useFakeTimers();
});
