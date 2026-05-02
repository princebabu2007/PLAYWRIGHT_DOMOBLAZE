import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';

teardown('Remove auth file', async () => {
  const authFile = path.join(__dirname, '../.auth/user.json');
  if (fs.existsSync(authFile)) {
    fs.unlinkSync(authFile);
    console.log('Successfully deleted auth file.');
  }
});