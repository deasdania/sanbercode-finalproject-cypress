module.exports = {
    // Cart Page
    cart_title: 'h2:contains("Products")',
    cart_table: 'table.table',
    cart_rows: "//tbody/tr",
    cart_product_image: 'td:nth-child(1) img',
    cart_product_title: 'td:nth-child(2)',
    cart_product_price: 'td:nth-child(3)',
    cart_delete_button: 'a:contains("Delete")',
    cart_total: "//h3[@id='totalp']",
    
    // Place Order
    place_order_button: "//button[contains(@class, 'btn-success') and contains(text(), 'Place Order')]",
    order_modal: '#orderModal',
    order_name: '#name',
    order_country: '#country',
    order_city: '#city',
    order_card: '#card',
    order_month: '#month',
    order_year: '#year',
    purchase_button: 'button[onclick="purchaseOrder()"]',
    order_close: '#orderModal .close',
    
    // Success Modal
    success_modal: '.sweet-alert',
    success_title: '.sweet-alert h2',
    success_confirm: '.confirm'
};
