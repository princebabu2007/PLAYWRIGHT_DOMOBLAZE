import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const data = JSON.parse(JSON.stringify(testData))
test('TEST#5: Login with Valid username and Invalid password', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();    
    await LoginPage.goToUrl(data.url);
    await LoginPage.openLogInForm();
    await LoginPage.typeLoginUserName(data.userName);
    await LoginPage.typeLoginPassword(data.password_Invalid);  
    const alertMessage = await LoginPage.clickLoginButtonAndReturnAlert();
    expect(alertMessage).toBe(data.signInErrorMsg2);
    
});