
var allProducts = [];
var copyOfAllCustomersDetailFromAccurateBasedOnPagination = [];
var allPaymentTerms = [];

var copyOfAllCustomersDetailFromAccurate = [];
var getCustomerDetails = {};

// function getToken(){
//     var settings = {
//         "url": "https://147.139.168.202:8888/get-lastest-token-and-session",
//         "method": "POST",
//         "timeout": 10000,
//     };
      
//     return $.ajax(settings);
// }

function getProfile(Customer_Code){
    var settings = {
        "url": `https://customers.sold.co.id/get-customer-information?Customer_Code=${Customer_Code}`,
        "method": "POST",
        "timeout": 0,
    };
    return $.ajax(settings);
}

function getUnpaidOrderPerProduct(Product_Code, Customer_Code){
    var settings = {
        "url": `https://sales.sold.co.id/get-unpaid-group-buy-sales-order-per-customer?Group_Buy_Purchase_PC=${Product_Code}&Customer_Code=${Customer_Code}`,
        "method": "POST",
        "timeout": 0,
    };
    return $.ajax(settings);
}

function getCustomersWithCustomerNo(customerNo){
    var settings = {
        "url": `https://customers.sold.co.id/get-customer-information?Customer_Code=${customerNo}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAvailableReferralCodes(){
    var settings = {
        "url": `https://customers.sold.co.id/get-available-referral-codes`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function loginRequestAPI(Email, Password, otp){
    var settings = {
        "url": `https://customers.sold.co.id/customer-login-request?Email=${Email}&Password=${Password}&otp=${otp}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function get_otp_api(Email){
    var settings = {
        "url": `https://customers.sold.co.id/get-otp?Email=${Email}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function save_cart(customerNo, cart){
    var settings = {
        "url": `https://customers.sold.co.id/save-user-shopping-cart?Customer_Code=${customerNo}&cart=${cart}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function get_cart(customerNo){
    var settings = {
        "url": `https://customers.sold.co.id/get-saved-user-shopping?Customer_Code=${customerNo}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function createCustomerNo(){
    var settings = {
        "url": `https://customers.sold.co.id/get-customer-code`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function createNewCustomer(access_token, session_id, data){
    var settings = {
        "url": "https://customers.sold.co.id/create-new-customer-direct-from-user",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };
    return $.ajax(settings);
}

function createNewCustomerSupplier(access_token, session_id, data){
    var settings = {
        "url": "https://customers.sold.co.id/create-new-customer-supplier-direct-from-user",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };
    return $.ajax(settings);
}

function updateCustomer(data){
    var settings = {
        "url": "https://customers.sold.co.id/update-customer-data-by-user-themselves",
        "method": "POST",
        "timeout": 10000,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };
    return $.ajax(settings);
}

// products

function get_upaid_order_from_product_code_and_customer_code(access_token, Product_Code){
    var settings = {
        "url": "https://products.sold.co.id/get-unpaid-sales-order-specific-for-a-product?Product_Code=" + Product_Code + "&Customer_Code=" + access_token,
        "method": "POST",
        "timeout": 0,
    };
    return $.ajax(settings);
}

var all_products_in_sold_co_id = [];
var all_new_products_in_sold_co_id = [];
var all_group_buy_products_in_sold_co_id = [];
function save_all_products_to_local_storage (){
    getAllProductsWithoutPagination("", "").done(function (response) {
        all_products_in_sold_co_id = response;
        var i = 0;
        all_new_products_in_sold_co_id = [];
        all_group_buy_products_in_sold_co_id = [];
        for(i; i < all_products_in_sold_co_id.length; i++){
            if(all_products_in_sold_co_id[i].Categorize_NEW == "true"){
                all_new_products_in_sold_co_id.push(all_products_in_sold_co_id[i]);
            }
            if(all_products_in_sold_co_id[i].GroupBuy_Purchase == "true"){
                all_group_buy_products_in_sold_co_id.push(all_products_in_sold_co_id[i]);
            }
        }
        localStorage.setItem("all_products_in_sold_co_id", JSON.stringify(all_products_in_sold_co_id));
        localStorage.setItem("all_new_products_in_sold_co_id", JSON.stringify(all_new_products_in_sold_co_id));
        localStorage.setItem("all_group_buy_products_in_sold_co_id", JSON.stringify(all_group_buy_products_in_sold_co_id));
    });
}
if(JSON.parse(localStorage.getItem("all_products_in_sold_co_id")).length <= 0){
    save_all_products_to_local_storage ();
}
setInterval(() => {
    save_all_products_to_local_storage ();
}, "900000");

function getAllProductsWithoutPagination(access_token, session_id){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllProductsBasedOnSubCategory(subcategory){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?subcategory=${subcategory}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function getAllProductsWithoutPaginationWithFilter(access_token, session_id, sortBy, sortDirection, itemName){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?product_name=${itemName}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_couriers(){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Get_All_Couriers=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_province_from_courier(Courier, Courier_Code){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&Get_All_Province=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_city_from_courier(Courier, Courier_Code, Province){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_district_from_courier(Courier, Courier_Code, City){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&City=${City}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_all_subdistrict_from_courier(Courier, Courier_Code, District){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Courier=${Courier}&Courier_Code=${Courier_Code}&District=${District}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function get_shipping_cost_informations(Courier_Price_Code_orig
    , Courier_Price_Code_dest
    , packing_type
    , weight
    , length
    , width
    , height
    , paket_value){
    var settings = {
        "url": `https://products.sold.co.id/get-shipping-option-data?Courier_Price_Code_orig=${Courier_Price_Code_orig}&Courier_Price_Code_dest=${Courier_Price_Code_dest}&packing_type=${packing_type}&weight=${weight}&paket_value=${paket_value}&Get_Shipping_Fee=true&length=${length}&width=${width}&height=${height}`,
        "method": "POST",
        "timeout": 0,
    };

    console.log(settings.url);
    
    return $.ajax(settings);
}
function get_shipping_fee(Courier, Courier_Code, Province, City, District, Sub_District, delivery_time_in_days, Courier_Price_Code){
    var settings = {
        "url": `https://products.sold.co.id/get-courier-data?Get_Shipping_Fee=true&Courier=${Courier}&Courier_Code=${Courier_Code}&Province=${Province}&City=${City}&District=${District}&Sub_District=${Sub_District}&delivery_time_in_days=${delivery_time_in_days}&Courier_Price_Code=${Courier_Price_Code}`,
        "method": "POST",
        "timeout": 0,
    };

    console.log(settings.url);
    
    return $.ajax(settings);
}

function getAllProductsInGroupBuy(access_token, session_id){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?GroupBuy_Purchase=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllProductsInNew(access_token, session_id){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?Categorize_NEW=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getProductsWithProductNo(access_token, session_id, productNo){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?product_code=${productNo}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function get_other_options(Name, Specification, Category, Subcategory, Brand){
    var settings = {
        "url": `https://products.sold.co.id/get-colors-option?Name=${Name}&Specification=${Specification}&Category=${Category}&Subcategory=${Subcategory}&Brand=${Brand}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getPaymentMethods(){
    var settings = {
        "url": `https://paymntmthd.sold.co.id/get-all-payment-method`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllUnpaidOrdersForThisCustomer(Customer_Code, Order_Number){
    if(Order_Number == ""){
        var settings = {
            "url": `https://sales.sold.co.id/get-unpaid-sales-order-per-customer?Customer_Code=${Customer_Code}`,
            "method": "POST",
            "timeout": 0,
        };
    }else{
        var settings = {
            "url": `https://sales.sold.co.id/get-unpaid-sales-order-per-customer?Order_Number=${Order_Number}`,
            "method": "POST",
            "timeout": 0,
        };
    }
    return $.ajax(settings);
}
// /check-delivery-order-information
function get_shipping_information(Order_Number){
    var settings = {
        "url": `https://sales.sold.co.id/check-delivery-order-information?Order_Number=${Order_Number}`,
        "method": "POST",
        "timeout": 0,
    };
    return $.ajax(settings);
}
function getAllOrdersForThisCustomer(Customer_Code, Order_Number){
    if(Order_Number == ""){
        var settings = {
            "url": `https://sales.sold.co.id/get-sales-order-data-per-customer?Customer_Code=${Customer_Code}`,
            "method": "POST",
            "timeout": 0,
        };
    }else{
        var settings = {
            "url": `https://sales.sold.co.id/get-sales-order-data-per-customer?Order_Number=${Order_Number}`,
            "method": "POST",
            "timeout": 0,
        };
    }
    
    return $.ajax(settings);
}
function createNewSalesOrder(items, customerDetails, Email, otp, User_Password){
    // alert(User_Password);
    // alert(otp);
    var settings = {
        "url": "https://sales.sold.co.id/create-new-sales-order-by-customer?Customer_Code=" + customerDetails.Customer_Code + `&User_Password=${User_Password}&otp=${otp}&Email=${Email}`,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "Sales_Order_Data": customerDetails,
          "Sales_Order_Detail_data": items
        }),
    };
    console.log(settings);
    return $.ajax(settings);
}

function createNewSalesOrderWithGroupBuy(items, customerDetails){
    var settings = {
        "url": "https://sales.sold.co.id/create-new-group-buy-sales-order-by-customer?Customer_Code=" + customerDetails.Customer_Code,
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "Sales_Order_Data": customerDetails,
          "Sales_Order_Detail_data": items
        }),
    };
    console.log(settings);
    return $.ajax(settings);
}

function createNewTempSalesOrder(items, customerDetails){
    var settings = {
        "url": "https://sales.sold.co.id/save-temp-order-details-from-customer?customerNo=" + customerDetails.customerNo + "&address=" + customerDetails.address + "&paymentTermName=" + customerDetails.paymentTermName + "&transDate=" + customerDetails.transDate + "",
        "method": "POST",
        "timeout": 10000,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify(items),
      };
    console.log(customerDetails.paymentTermName);
    console.log(items);
    
    return $.ajax(settings);
}

function cancelSalesOrder(Order_Number){
    var settings = {
        "url": "https://sales.sold.co.id/update-sales-order-payment-status-to-cancelled?Order_Number=" + Order_Number,
        "method": "POST",
        "timeout": 10000,
        "headers": {
          "Content-Type": "application/json"
        }
      };
    
    return $.ajax(settings);
}

function getGroupBuyQuantitySoFarGross(product_code){
    var settings = {
        "url": "https://sales.sold.co.id/check-group-buy-quantity-so-far-gross?Group_Buy_Purchase_PC=" + product_code,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function closeGroupBuyStatusOnProduct(product_code){
    var settings = {
        "url": "https://sales.sold.co.id/close-group-buy-status?Product_Code=" + product_code,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}
function getAllCategories(access_token, session_id){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?Get_ALL_Category=true`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getAllSubCategories(Get_ALL_Sub_Category_Based_On_Category){
    var settings = {
        "url": `https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${Get_ALL_Sub_Category_Based_On_Category}`,
        "method": "POST",
        "timeout": 0,
    };
    
    return $.ajax(settings);
}

function getforgotpasswordrequest(Email, ktp, PrimaryContactNumber, requestedNewPassword, otp){
    var settings = {
        "url": "https://customers.sold.co.id/customer-forgot-password-request?Email=" + Email + "&ktp=" + ktp + "&PrimaryContactNumber=" + PrimaryContactNumber + "&requestedNewPassword=" + requestedNewPassword + "&otp=" + otp,
        "method": "POST",
        "timeout": 10000,
    };
    
    return $.ajax(settings);
}
function getOTP(Email){
    var settings = {
        "url": "https://customers.sold.co.id/get-otp?Email=" + Email,
        "method": "POST",
        "timeout": 10000,
    };
    
    return $.ajax(settings);
}
function verifyOTP(Email, OTP){
    var settings = {
        "url": "https://customers.sold.co.id/verify-email-address?otp=" + OTP,
        "method": "POST",
        "timeout": 10000,
    };
    
    return $.ajax(settings);
}
function encryptPassword(Password){
    var settings = {
        "url": "https://customers.sold.co.id/password-generator?Password=" + Password,
        "method": "POST",
        "timeout": 10000,
    };
    
    return $.ajax(settings);
}