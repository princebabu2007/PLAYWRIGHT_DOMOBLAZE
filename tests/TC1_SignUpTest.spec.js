import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const data = JSON.parse(JSON.stringify(testData))
test('TEST#1: SignUp Test', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();    
    await LoginPage.goToUrl(data.url);
    await LoginPage.openSignUpForm();
    await LoginPage.typeUserName_SignUp(data.userName);
    await LoginPage.typePassword_SignUp(data.password);
    const alertMessage = await LoginPage.clickSignUpButton();
    expect(alertMessage).toBe(data.signUpSuccessMessage);
});