import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const data = JSON.parse(JSON.stringify(testData))
test('TEST#10: Login And Logout', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage(); 
    const HomePage = pageObjectsManager.getHomePage();   
    await LoginPage.goToUrl(data.url);
    await LoginPage.openLogInForm();
    await LoginPage.typeLoginUserName(data.userName);
    await LoginPage.typeLoginPassword(data.password);
    await LoginPage.clickLoginButton();
    expect(await LoginPage.checkWelcomeUserMessage(`Welcome ${data.userName}`)).toBe(true);
    await HomePage.logOut();
    expect(await LoginPage.checkLogInButtonVisibility()).toBe(true);

});