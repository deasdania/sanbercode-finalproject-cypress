module.exports = {
    // Contact Modal - XPath Locators
    contact_link: "//a[normalize-space()='Contact']",
    contact_modal: '#exampleModal',
    contact_email: "//input[@id='recipient-email']",
    contact_name: "//input[@id='recipient-name']",
    contact_message: "//textarea[@id='message-text']",
    contact_send_button: "//button[@onclick='send()']",
    contact_close: "//div[@id='exampleModal']//button[@class='close']",
    
    // About Modal - XPath Locators
    about_link: "//a[normalize-space()='About us']",
    about_modal: '#videoModal',
    about_video: "//video",
    about_close: "//div[@id='videoModal']//button[@class='close']",
    
    // Footer - XPath Locators
    footer: "//footer",
    footer_links: "//footer//a"
};
