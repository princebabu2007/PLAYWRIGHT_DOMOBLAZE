import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const phoneList = require('../Utils/MobilePhoneList.json')
const data = JSON.parse(JSON.stringify(testData))
const mobiles = JSON.parse(JSON.stringify(phoneList))
test('TEST#7: Login with valid credentials -> Select a product -> Add to Cart -> Click "ok" on the popup', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();
    const HomePage = pageObjectsManager.getHomePage();    
    await LoginPage.goToUrl(data.url);
    await LoginPage.openLogInForm();
    await LoginPage.typeLoginUserName(data.userName);
    await LoginPage.typeLoginPassword(data.password);
    await LoginPage.clickLoginButton();
    expect(await LoginPage.checkWelcomeUserMessage(`Welcome ${data.userName}`)).toBe(true);

    const homePage = pageObjectsManager.getHomePage();
    await homePage.selectPhonesCategory();
    await homePage.getNumberofPhonesDisplayed();
    await homePage.selectPhone(mobiles.phone6);
    await homePage.addToCartAndAcceptDialog();

});