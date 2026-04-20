import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const data = JSON.parse(JSON.stringify(testData))
test('TEST#4: Login with invalid username and valid password', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();    
    await LoginPage.goToUrl(data.url);
    await LoginPage.openLogInForm();
    await LoginPage.typeLoginUserName(data.userName_Invalid);
    await LoginPage.typeLoginPassword(data.password);  
    const alertMessage = await LoginPage.clickLoginButtonAndReturnAlert();
    expect(alertMessage).toBe(data.signInErrorMsg1);    
});