import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const data = JSON.parse(JSON.stringify(testData))
test('TEST#2: Sign Up -> Enter Data -> Click Close Test', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();    
    await LoginPage.goToUrl(data.url);
    await LoginPage.openSignUpForm();
    await LoginPage.typeUserName_SignUp(data.userName);
    await LoginPage.typePassword_SignUp(data.password);
    await LoginPage.clickSignUpCloseButton();
    expect(page.url()).toBe(data.url); // Verify that the URL remains the same after clicking close
});