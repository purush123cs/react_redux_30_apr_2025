require("@testing-library/jest-dom");

// Polyfill for TextEncoder and TextDecoder
const { TextEncoder, TextDecoder } = require("util");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;