import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const phoneList = require('../Utils/MobilePhoneList.json')
const customerDetails = require('../Utils/CustomerDetails.json')
const data = JSON.parse(JSON.stringify(testData))
const mobiles = JSON.parse(JSON.stringify(phoneList))
const customer = JSON.parse(JSON.stringify(customerDetails))

test('TEST#8: Login with valid credentials -> Select a product -> Add to Cart -> Click "ok" on the popup->Purchase', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();
    const HomePage = pageObjectsManager.getHomePage();
    const CartPage = pageObjectsManager.getCartPage();    
    await LoginPage.goToUrl(data.url);
    await LoginPage.openLogInForm();
    await LoginPage.typeLoginUserName(data.userName);
    await LoginPage.typeLoginPassword(data.password);
    await LoginPage.clickLoginButton();
    expect(await LoginPage.checkWelcomeUserMessage(`Welcome ${data.userName}`)).toBe(true);
    await HomePage.selectPhonesCategory();
    await HomePage.getNumberofPhonesDisplayed();
    await HomePage.selectPhone(mobiles.phone6);
    await HomePage.addToCartAndAcceptDialog();
    await HomePage.goToCart();
    await CartPage.placeOrder();
    const confirmationMsg = await CartPage.fillOrderFormAndPurchase(customer.name, customer.country, customer.city, customer.creditCard, customer.month, customer.year);
    expect(confirmationMsg).toContain(testData.orderConfirmationMessage);

});