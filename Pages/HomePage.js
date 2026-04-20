export class HomePage {
    constructor(page) {
        this.page = page;
        //this.categoriesMenu = page.locator('#itemc');
        this.phonesCategory = page.locator('a[id="itemc"]:has-text("Phones")');
        this.laptopsCategory = page.locator('a[id="itemc"]:has-text("Laptops")');
        this.monitorsCategory = page.locator('a[id="itemc"]:has-text("Monitors")');
        this.logOutButton = page.locator('#logout2'); 
        this.cartBtn = page.locator('#cartur');
    }
    async selectPhonesCategory() {
        await this.phonesCategory.click();
    }
    async selectMonitorsCategory() {
        await this.monitorsCategory.click();
        await this.page.locator('#tbodyid .card-title').first().waitFor(); // Wait for the page to load completely
    }
    async selectLaptopsCategory() {
        await this.laptopsCategory.click();
    }
    async selectPhone(phoneName) {
        let totalPhones = await this.getNumberofPhonesDisplayed();
        for(let i=1; i<=totalPhones; i++) {
            //console.log(await this.page.locator(`div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]:nth-child(${i}) div[class="card-block"] h4[class="card-title"] a`).textContent());
            if(await this.page.locator(`div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]:nth-child(${i}) div[class="card-block"] h4[class="card-title"] a`).textContent() === phoneName) {
                await this.page.locator(`div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]:nth-child(${i}) div[class="card-block"] h4[class="card-title"] a`).click();
                console.log(`Selected phone: ${phoneName}`);
                break;
            }
        }
    }      
    async selectMonitor(monitorName) {
        let totalMonitors = await this.getNumberofMonitorsDisplayed();
        console.log("Monitor to select", monitorName);
        for(let i=1; i<=totalMonitors; i++) {
            console.log(await this.page.locator(`div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]:nth-child(${i}) div[class="card-block"] h4[class="card-title"] a`).textContent());
        }
            //let totalMonitors = await this.getNumberofMonitorsDisplayed();
        for(let i=1; i<=totalMonitors; i++) {
            //console.log(await this.page.locator(`div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]:nth-child(${i}) div[class="card-block"] h4[class="card-title"] a`).textContent());
            if(await this.page.locator(`div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]:nth-child(${i}) div[class="card-block"] h4[class="card-title"] a`).textContent() === monitorName) {
                await this.page.locator(`div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]:nth-child(${i}) div[class="card-block"] h4[class="card-title"] a`).first().click();
                console.log(`Selected monitor: ${monitorName}`);
                break;
            }
        }
    }      
    async getNumberofPhonesDisplayed() {
        const phones = await this.page.locator('div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]').count();
        return phones;
        //console.log("Number of phones displayed:", phones);
    }
    async getNumberofMonitorsDisplayed() {
        const monitors = await this.page.locator('div[id="tbodyid"] div[class="col-lg-4 col-md-6 mb-4"]').count();
        console.log("Number of monitors displayed:", monitors);
        return monitors;
     
    }
    async addToCartAndAcceptDialog() {
        await this.page.locator('.btn-success', { hasText: 'Add to cart' }).click();
        this.page.on('dialog', async dialog => {
        await dialog.accept();
        });
    }
    async logOut() {
        await this.logOutButton.click();
    }
    async goToCart() {
        await this.cartBtn.click();
    }
}
        