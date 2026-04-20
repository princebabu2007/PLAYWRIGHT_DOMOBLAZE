export class CartPage {
    constructor(page) {
        this.page = page;
        this.placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
    }
    async placeOrder() {
        await this.placeOrderBtn.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(10000); // Add a short delay to ensure the button is fully interactable
        await this.placeOrderBtn.click();
    }
    async fillOrderFormAndPurchase(name, country, city, creditCard, month, year) {
        await this.page.locator('#name').waitFor();
        await this.page.locator('#name').fill(name);
        await this.page.locator('#country').fill(country);
        await this.page.locator('#city').fill(city);
        await this.page.locator('#card').fill(creditCard);
        await this.page.locator('#month').fill(month);
        await this.page.locator('#year').fill(year);
        await this.page.locator('button[onclick="purchaseOrder()"]').click();
        let orderConfirmationMsg = await this.page.getByRole('heading', { name: 'Thank you for your purchase!' }).textContent();
        return (orderConfirmationMsg);
    }
}