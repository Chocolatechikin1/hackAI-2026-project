#!/usr/bin/env node
/**
 * Start Expo for USB-connected Android devices.
 * Use this on restricted networks (e.g. university WiFi) where LAN/tunnel won't work.
 * Requires: phone connected via USB, USB debugging enabled.
 */
const { spawn } = require('child_process');
const { execSync } = require('child_process');

console.log('Setting up USB reverse tunnel for port 8081...');
try {
  execSync('adb reverse tcp:8081 tcp:8081', { stdio: 'inherit' });
  console.log('USB tunnel ready. Starting Expo...\n');
} catch (e) {
  console.error('Failed to run adb reverse. Make sure:');
  console.error('  1. Android phone is connected via USB');
  console.error('  2. USB debugging is enabled in Developer Options');
  console.error('  3. ADB is installed (comes with Android Studio, or: https://developer.android.com/tools/adb)\n');
  process.exit(1);
}

const expo = spawn('npx', ['expo', 'start'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, REACT_NATIVE_PACKAGER_HOSTNAME: 'localhost' },
});

expo.on('close', (code) => process.exit(code || 0));
