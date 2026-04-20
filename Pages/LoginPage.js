export class LoginPage {
    constructor(page) {
        this.page = page;
        this.signUpFormButton = page.locator("#signin2");
        this.signUpUsername = page.locator('#sign-username');
        this.signUpPassword = page.locator('#sign-password');
        this.signUpButton = page.locator("button[onclick='register()']");
        this.signUpCloseButton = page.locator('div[id="signInModal"] div[class="modal-footer"] button:nth-child(1)');
       
        this.loginFormBtn = page.locator('#login2'); //Login button on the homepage
        this.signInUsername = page.locator('#loginusername');
        this.signInPassword = page.locator('#loginpassword');
        
        this.loginBtn = page.locator("button[onclick='logIn()']");   
        this.logOutButton = page.locator('#logout2'); 
        this.welcomeUser = page.locator('#nameofuser');    
    }
    async goToUrl(url) {
        await this.page.goto(url);
    }
       
    async openSignUpForm() {
        await this.signUpFormButton.click();
    }
    async typeUserName_SignUp(username) {
        await this.signUpUsername.fill(username);             
    }
    async typePassword_SignUp(password) {
        await this.signUpPassword.fill(password);             
    }

    async clickSignUpButton() {
        const alertPromise = new Promise(resolve => {
        this.page.once('dialog', async dialog => {
            const message = dialog.message();
            await dialog.accept();
            resolve(message); // return value
            });
       });
        await this.signUpButton.click(); // Trigger the alert by clicking the sign-up button
        const alertMessage = await alertPromise;
        return alertMessage; // return the alert message to the caller
        
    }
    async clickSignUpCloseButton() {
        await this.signUpButton.click();
    }
    async openLogInForm() {
        await this.loginFormBtn.click();
    }

    async typeLoginUserName(username) {
        await this.signInUsername.fill(username);             
    }
    async typeLoginPassword(password) {
        await this.signInPassword.fill(password);             
    }
    async clickLoginButtonAndReturnAlert() {
        const alertPromise = new Promise(resolve => {
        this.page.once('dialog', async dialog => {
            const message = dialog.message();
            await dialog.accept();
            resolve(message); // return value
            });
       });
        await this.loginBtn.click();
        const alertMessage = await alertPromise;
        console.log("Alert message received:", alertMessage); // Log the alert message for debugging
        return alertMessage; // return the alert message to the caller
    }
    async clickLoginButton() {
        await this.loginBtn.click();
    }
    async checkLogOutButtonVisibility() {
        await this.logOutButton.waitFor({ state: 'visible', timeout: 50000 });
        return await this.logOutButton.isVisible();
    }
    async checkLogInButtonVisibility() {
        await this.loginFormBtn.toBeVisible;
        return await this.loginFormBtn.isVisible();
    }
    async checkWelcomeUserMessage(expectedMessage) {
        await this.welcomeUser.waitFor({ state: 'visible', timeout: 50000 });
        const actualMessage = await this.welcomeUser.textContent();
        return actualMessage.trim() === expectedMessage;
    }
}