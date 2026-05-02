import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/ValidCredentialsList.json')
const testData_Common = require('../Utils/TestData.json')
const dataSet = JSON.parse(JSON.stringify(testData))
const dataSet_Common = JSON.parse(JSON.stringify(testData_Common))
for (let data of dataSet) {
    test(`TC11_Login And Logout With Multiple Users - Credential Set ${data.userCredentialDataSet}`, { tag: '@smoke' }, async ({ page }) => {
        const pageObjectsManager = new PageObjectsManager(page);
        const LoginPage = pageObjectsManager.getLoginPage();
        const HomePage = pageObjectsManager.getHomePage();
        await LoginPage.goToUrl(dataSet_Common.url);
        await LoginPage.openLogInForm();
        await LoginPage.typeLoginUserName(data.userName);
        await LoginPage.typeLoginPassword(data.password);
        await LoginPage.clickLoginButton();
        expect(await LoginPage.checkWelcomeUserMessage(`Welcome ${data.userName}`)).toBe(true);
        await HomePage.logOut();
        expect(await LoginPage.checkLogInButtonVisibility()).toBe(true);

    })
}