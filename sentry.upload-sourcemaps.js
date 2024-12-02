const { execSync } = require('child_process');

try {
  if (process.env.VERCEL_ENV === 'production') {
    console.log('Uploading source maps to Sentry...');
    execSync('sentry-cli sourcemaps upload --release $(git rev-parse HEAD) .next', {
      stdio: 'inherit',
    });
    console.log('Source maps uploaded successfully!');
  } else {
    console.log('Skipping source map upload - not a production build');
  }
} catch (error) {
  console.error('Error uploading source maps:', error);
  // Don't fail the build if source map upload fails
  process.exit(0);
}
