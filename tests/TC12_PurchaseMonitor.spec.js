import { test, expect } from '@playwright/test';
import { PageObjectsManager } from '../Pages/PageObjectsManager';
const testData = require('../Utils/TestData.json')
const phoneList = require('../Utils/MobilePhoneList.json')
const customerDetails = require('../Utils/CustomerDetails.json')
const monitorList = require('../Utils/MonitorList.json')
const data = JSON.parse(JSON.stringify(testData))
const mobiles = JSON.parse(JSON.stringify(phoneList))
//const customer = JSON.parse(JSON.stringify(customerDetails))
const customer = JSON.parse(JSON.stringify(customerDetails))
const monitors = JSON.parse(JSON.stringify(monitorList))

test.skip('TC12_PurchaseMonitor', async ({ page }) => {
    const pageObjectsManager = new PageObjectsManager(page);
    const LoginPage = pageObjectsManager.getLoginPage();
    const HomePage = pageObjectsManager.getHomePage();
    const CartPage = pageObjectsManager.getCartPage();    
    await LoginPage.goToUrl(data.url);
    await HomePage.selectMonitorsCategory();
    await page.waitForTimeout(2000);
    await HomePage.getNumberofMonitorsDisplayed();
    await HomePage.selectMonitor(monitors.monitor1);    
    await HomePage.addToCartAndAcceptDialog();
    await HomePage.goToCart();    
    await CartPage.placeOrder();
    const confirmationMsg = await CartPage.fillOrderFormAndPurchase(customer.name, customer.country, customer.city, customer.creditCard, customer.month, customer.year);
    expect(confirmationMsg).toContain(testData.orderConfirmationMessage);
});