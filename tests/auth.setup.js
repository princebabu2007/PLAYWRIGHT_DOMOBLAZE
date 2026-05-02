import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const dataSet = JSON.parse(JSON.stringify(testData))
const authFile = path.join(__dirname, '../.auth/user.json');
console.log(`Auth file path: ${authFile}`)    
setup('authenticate', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();
    const HomePage = pageObjectsManager.getHomePage();
    await LoginPage.goToUrl(dataSet.url);
    await LoginPage.openLogInForm();
    await LoginPage.typeLoginUserName(dataSet.userName);
    await LoginPage.typeLoginPassword(dataSet.password);
    await LoginPage.clickLoginButton();
    expect(await LoginPage.checkWelcomeUserMessage(`Welcome ${dataSet.userName}`)).toBe(true);
    // save auth token to a
    await page.context().storageState({ path: authFile });
    await HomePage.logOut();
    expect(await LoginPage.checkLogInButtonVisibility()).toBe(true);
})
