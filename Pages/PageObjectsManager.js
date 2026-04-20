
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { CartPage } from './CartPage';
export class PageObjectsManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
        this.cartPage = new CartPage(page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getHomePage() {
        return this.homePage;
    }
    getCartPage() {
        return this.cartPage;
    }
}