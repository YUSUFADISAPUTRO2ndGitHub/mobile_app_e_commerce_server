$(document).ready(async function(){
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        if(response != false){
            if(response.Address_1 != "NULL" && response.Address_1 != null && response.Address_1 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_1 + "\">" + response.Address_1 + "</option>");
            }
            if(response.Address_2 != "NULL" && response.Address_2 != null && response.Address_2 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_2 + "\">" + response.Address_2 + "</option>");
            }
            if(response.Address_3 != "NULL" && response.Address_3 != null && response.Address_3 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_3 + "\">" + response.Address_3 + "</option>");
            }
            if(response.Address_4 != "NULL" && response.Address_4 != null && response.Address_4 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_4 + "\">" + response.Address_4 + "</option>");
            }
            if(response.Address_5 != "NULL" && response.Address_5 != null && response.Address_5 != "undefined"){
                $("#sub-saved-address").append("<option value=\"" + response.Address_5 + "\">" + response.Address_5 + "</option>");
            }
        }
        var name = response.First_Name + " " + response.Last_Name;
    });
    loadCheckoutFinalConfirmationTable("COD");
    listPaymentMethods();
});

function get_otp_for_checkout(){
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        if(response.Email.length > 0){
            get_otp_api(response.Email).done(function (response) {
                Swal.fire("OTP terkirim ke email", `${response.Email}`, "success");
            });
        }else{
            Swal.fire("Please give me your email", `${response.Email}`, "warning");
        }
    });
}

setInterval(() => {
    var addressSelection = $("#address-selection").children("option:selected").val();
    var street = $("#street").val();
    address = street;
    if(addressSelection == "TO SAVED ADDRESS"){
        if($("#sub-saved-address").children("option:selected").val() != undefined){
            if($("#sub-saved-address").children("option:selected").val().length > 0){
                if($("#sub-saved-address").children("option:selected").val().toUpperCase().includes("JAKARTA".toUpperCase())){
                    $(".delivery-cost").html("Biaya pengiriman: 0");
                }else if(
                    $("#sub-saved-address").children("option:selected").val().toUpperCase().includes("TANGERANG".toUpperCase())
                    || $("#sub-saved-address").children("option:selected").val().toUpperCase().includes("BANTEN".toUpperCase())
                ){
                    $(".delivery-cost").html("Biaya pengiriman: 15000");
                }else if(
                    $("#sub-saved-address").children("option:selected").val().toUpperCase().includes("DEPOK".toUpperCase())
                ){
                    $(".delivery-cost").html("Biaya pengiriman: 20000");
                }else if(
                    $("#sub-saved-address").children("option:selected").val().toUpperCase().includes("BOGOR".toUpperCase())
                ){
                    $(".delivery-cost").html("Biaya pengiriman: 25000");
                }else{
                    $(".delivery-cost").html("Biaya pengiriman: 50000");
                }
            }
        }
    }else{
        if(street != undefined){
            if(street.length > 0){
                if(street.toUpperCase().includes("JAKARTA".toUpperCase())){
                    $(".delivery-cost").html("Biaya pengiriman: 0");
                }else if(
                    street.toUpperCase().includes("TANGERANG".toUpperCase())
                    || street.toUpperCase().includes("BANTEN".toUpperCase())
                ){
                    $(".delivery-cost").html("Biaya pengiriman: 15000");
                }else if(
                    street.toUpperCase().includes("DEPOK".toUpperCase())
                ){
                    $(".delivery-cost").html("Biaya pengiriman: 20000");
                }else if(
                    street.toUpperCase().includes("BOGOR".toUpperCase())
                ){
                    $(".delivery-cost").html("Biaya pengiriman: 25000");
                }else{
                    $(".delivery-cost").html("Biaya pengiriman: 50000");
                }
            }
        }
    }
}, 1000);

function loadingMessage(timer){
    let timerInterval
    Swal.fire({
    title: 'JANGAN TUTUP HALAMAN INI, sedang memproses permintaan Anda',
    html: '',
    timer: timer*1000,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        const content = Swal.getContent()
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            // console.log('I was closed by the timer')
        }
    })
}

function listPaymentMethods(){
    getPaymentMethods().done(function (response) {
        var i = 0;
        for(i = 0; i < response.length; i++){
            $("#payment-selection").append("<option>" + response[i].Payment_Method_Name + "</option>");
        }
    });
}

function loadCheckoutFinalConfirmationTable(condition){
    $(".final_checkout").empty();
    $(".final_checkout").append("<tr><th>PRODUCT NAME</th><th>QUANTITY</th><th>PRICE</th></tr>");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const check_store_price = urlParams.get('check_store_price');
    if(JSON.parse(check_store_price)){
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                var i = 0;
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                for(i; i < itemsToCheckout.length; i++){
                    // console.log(response);
                    if(itemsToCheckout[i].productNo == response.Product_Code){
                        $(".final-checkout-new").append(`
                        <div class="product-in-card">
                            <div class="product-in-card-body">
                                <img class="product-image-in-cart" src="${response.Picture_1}">
                                <div class="product-details">
                                    <div class="card-text product-in-card-name">${response.Name}</div>
                                    <label>Harga</label>
                                    <input type="text" id="final_checkout_price_${(response.In_Store_Price * itemsToCheckout[i].quantity)}" class="form-control price-form" value="${commafy((response.In_Store_Price * itemsToCheckout[i].quantity))}" disabled>
                                    <label>Estimasi berat total (kg)</label>
                                    <input type="text" class="form-control price-form" value="${commafy(response.Weight_KG * itemsToCheckout[i].quantity)}" disabled>
                                    <label>Kuantitas diminta</label>
                                    <input type="number" id="final_checkout_quantity_${itemsToCheckout[i].productNo}" class="form-control quantity-form" value="${itemsToCheckout[i].quantity}"  disabled>
                                </div>
                            </div>
                        </div>
                        `);
                    }
                }
            });
        }
    }else if(condition == "COD"){
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                var i = 0;
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                for(i; i < itemsToCheckout.length; i++){
                    // console.log(response);
                    if(itemsToCheckout[i].productNo == response.Product_Code){
                        if(itemsToCheckout[i].quantity > response.Stock_Quantity){
                            itemsToCheckout.splice(i, 1);
                            var updated_itemsToCheckout = JSON.stringify(itemsToCheckout);
                            localStorage.setItem("itemsToCheckout", updated_itemsToCheckout);
                            setTimeout(() => {
                                Swal.fire("Anda memiliki barang yang kehabisan stok", `${response.Name} akan di hapus dari opsi checkout Anda`, "warning");
                            }, 3000);
                        // }else if(isNAN(response.Sell_Price*1)){
                        //     alert("isNAN");
                        //     setTimeout(() => {
                        //         Swal.fire("Kami minta maaf atas ketidaknyamanannya", `${response.Name} | Tetapi Anda memiliki item yang mungkin tidak menetapkan harga untuk checkout`, "warning");
                        //     }, 3500);
                        // }else if((response.Sell_Price*1) <= 0){
                        //     alert("<=0");
                        //     setTimeout(() => {
                        //         Swal.fire("Kami minta maaf atas ketidaknyamanannya", `${response.Name} | Tetapi Anda memiliki item yang mungkin tidak menetapkan harga untuk checkout`, "warning");
                        //     }, 3500);
                        }else{
                            itemsToCheckout[i].priceAgreed = response.Sell_Price * 1 * itemsToCheckout[i].quantity;
                            $(".final-checkout-new").append(`
                            <div class="product-in-card">
                                <div class="product-in-card-body">
                                    <img class="product-image-in-cart" src="${response.Picture_1}">
                                    <div class="product-details">
                                        <div class="card-text product-in-card-name">${response.Name}</div>
                                        <label>Harga</label>
                                        <input type="text" id="final_checkout_price_${(response.Sell_Price * itemsToCheckout[i].quantity)}" class="form-control price-form" value="${commafy(itemsToCheckout[i].priceAgreed)}" disabled>
                                        <label>Estimasi berat total (kg)</label>
                                        <input type="text" class="form-control price-form" value="${commafy(response.Weight_KG * itemsToCheckout[i].quantity)}" disabled>
                                        <label>Kuantitas diminta</label>
                                        <input type="number" id="final_checkout_quantity_${itemsToCheckout[i].productNo}" class="form-control quantity-form" value="${itemsToCheckout[i].quantity}"  disabled>
                                    </div>
                                </div>
                            </div>
                            `);
                        }
                    }
                }
            });
        }
    }else{
        var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
        var i = 0;
        for(i; i < itemsToCheckout.length; i++){
            getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                datas = JSON.parse(data);
                var i = 0;
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                for(i; i < itemsToCheckout.length; i++){
                    if(itemsToCheckout[i].productNo == datas[0].Product_Code){
                        $(".final-checkout-new").append(`
                        <div class="product-in-card">
                            <div class="product-in-card-body">
                                <img class="product-image-in-cart" src="${response.Picture_1}">
                                <div class="product-details">
                                    <div class="card-text product-in-card-name">${response.Name}</div>
                                    <label>Harga</label>
                                    <input type="text" id="final_checkout_price_${(response.Sell_Price * itemsToCheckout[i].quantity)}" class="form-control price-form" value="${commafy(itemsToCheckout[i].priceAgreed)}" disabled>
                                    <label>Estimasi berat total (kg)</label>
                                    <input type="text" class="form-control price-form" value="${commafy(response.Weight_KG * itemsToCheckout[i].quantity)}" disabled>
                                    <label>Kuantitas diminta</label>
                                    <input type="number" id="final_checkout_quantity_${itemsToCheckout[i].productNo}" class="form-control quantity-form" value="${itemsToCheckout[i].quantity}"  disabled>
                                </div>
                            </div>
                        </div>
                        `);
                    }
                }
            });
        }
    }
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

function periodOptionSelected(x){
    if($(x).children("option:selected").val().toUpperCase() == "TRANSFER"){
        swal.fire("Compare to Virtual Account Transfer, Normal Transfer may take longer time to process", "make sure you make the payment as soon as possible for your order to be processed","warning");
        $("#normal-transfer-selected").css("display", "block");
        // loadCheckoutFinalConfirmationTable("PERIOD");
        // $("#period-selection").css("display", "block");
    }else{
        loadCheckoutFinalConfirmationTable("COD");
        $("#normal-transfer-selected").css("display", "none");
    }
}

setInterval(() => {
    if($("#payment-selection").children("option:selected").val().toUpperCase() == "TRANSFER"){
        // swal.fire("Compare to Virtual Account Transfer, Normal Transfer may take longer time to process", "make sure you make the payment as soon as possible for your order to be processed","warning");
        $("#normal-transfer-selected").css("display", "block");
    }else{
        loadCheckoutFinalConfirmationTable("COD");
        $("#normal-transfer-selected").css("display", "none");
    }
}, 1000);

function addressOptionSelected(x){
    if($(x).children("option:selected").val() == "DELIVER TO NEW ADDRESS"){
        $("#address-selection-sub-saved-address").css("display", "none");
        $("#new-address-section").css("display", "block");
    }else{
        $("#address-selection-sub-saved-address").css("display", "block");
        $("#new-address-section").css("display", "none");
    }
}

async function requestToFinish(){
    loadingMessage(10000);
    var addressSelection = $("#address-selection").children("option:selected").val();
    var address = "";
    // var province = $(".option-province").children("option:selected").val();
    // var city = $("#option-city").val();
    // var zipcode = $("#zipcode").val();
    var street = $("#street").val();
    // address = province + ";" + city + ";" + zipcode + ";" + street;
    address = street;
    if(addressSelection == "TO SAVED ADDRESS"){
        personalDetailsWithCurrentAddress();
    }else{
        // console.log("address " + address);
        // if(($(".option-province").children("option:selected").val() != "-- select your province here --") && 
        // ($("#option-city").val().length != 0) &&
        // ($("#zipcode").val().length > 0) &&
        // ($("#street").val().length > 0)){
        //     personalDetailsWithNewAddress(address);
        // }else{
        //     swal.fire("Please fill in the address properly", "", "warning");
        // }
        personalDetailsWithNewAddress(address);
    }
}

async function requestToFinishInStore(){
    loadingMessage(10000);
    personalDetailsWithStoreAddress();
}

function personalDetailsWithStoreAddress(){
    loadingMessage(10000);
    var request = {};
    var currDate = new Date();
    var month = currDate.getMonth() + 1;
    var day = currDate.getDate();
    var year = currDate.getFullYear();
    var date = year + "-" + month + "-" + day;
    var paymentSelection = $("#payment-selection").children("option:selected").val();
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        // console.log("selected to checkout in store");
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: 0,
            province: "Jawa Barat",
            city: "Bekasi",
            zipcode: "17148",
            street: "Jl Raya Pekayon no 35 B",
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "Pembelian Langsung di TOKO (SHINE)",
            orderDate: date
        };
        // console.log(request);
        $("#submitRequestFinalButton").toggle();
        $("#backtocartRequestFinalButton").toggle();
        sendRequestFinal(paymentSelection);

        var paymentMethodChosen = $("#payment-selection").children("option:selected").val();
        if(paymentMethodChosen == "BCA VA TRANSFER" ){
            setTimeout(function(){sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request);}, 2000);
            // setTimeout(function(){ clearStorage(); }, 3000);
        }else{
            setTimeout(function(){sendFinalToAccurate(request);}, 2000);
            // setTimeout(function(){ clearStorage(); }, 3000);
        }
    });
}

function personalDetailsWithCurrentAddress(){
    var request = {};
    var currDate = new Date();
    var month = currDate.getMonth() + 1;
    var day = currDate.getDate();
    var year = currDate.getFullYear();
    var date = year + "-" + month + "-" + day;
    var paymentSelection = $("#payment-selection").children("option:selected").val();
    var periodSelection = 0;
    if(paymentSelection == "PERIOD" ){
        periodSelection = $("#period-selection").children("option:selected").val();
        if(periodSelection == "30 Days"){
            periodSelection = 30;
        }else{
            periodSelection = 60;
        }
    }
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: periodSelection,
            address: $("#sub-saved-address").children("option:selected").val() + ". " + $("#subdistrict-courier-option").find(":selected").text() + ", " + $("#district-courier-option").find(":selected").text() + ", " + $("#city-courier-option").find(":selected").text() + ", " + $("#province-courier-option").find(":selected").text() + ", " + $("#zipcode-courier-option").find(":selected").text(),
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "e-commerce pembelian request",
            orderDate: date
        };
        // console.log(request);
        $("#submitRequestFinalButton").toggle();
        $("#backtocartRequestFinalButton").toggle();
        sendRequestFinal(paymentSelection);

        var paymentMethodChosen = $("#payment-selection").children("option:selected").val();
        if(paymentMethodChosen == "BCA VA TRANSFER" ){
            setTimeout(function(){sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request);}, 2000);
            // setTimeout(function(){ clearStorage(); }, 3000);
        }else{
            setTimeout(function(){sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request);}, 2000);
            // setTimeout(function(){ clearStorage(); }, 3000);
        }
    });
}

async function sendRequestFinal(paymentSelection){
    var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
    // console.log("itemsToCheckout " + localStorage.getItem("itemsToCheckout"));

    // var requestArrayForItemsToCheckout = [];
    // var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    // localStorage.setItem("finalStep", productToBeAddedStringify);
    // var courier_information = $('#Courier-option').find(":selected").text().split("-");
    // var Courier = courier_information[0];
    // var Courier_Code = courier_information[1];
    // object = {
    //     name: "Estimated Shipping fee|" + Courier + "|" + Courier_Code,
    //     productCode: Courier_Code,
    //     quantity: 1,
    //     pricePerItem: $("#estimated-price-courier-option").html(),
    //     notes: "estimated shipping fee for this purchase",
    //     totalPrice: $("#estimated-price-courier-option").html(),
    //     GroupCode: ""
    // };
    // requestArrayForItemsToCheckout.push(object);
    // var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    // localStorage.setItem("finalStep", productToBeAddedStringify);


    var i = 0;
    for(i; i < itemsToCheckout.length; i ++){
        getProductsWithProductNo("", "", itemsToCheckout[i].productNo).done(function (response) {
                var object = {};
                var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
                if(localStorage.getItem("finalStep") === null){
                    var requestArrayForItemsToCheckout = [];

                    // var courier_information = $('#Courier-option').find(":selected").text().split("-");
                    // var Courier = courier_information[0];
                    // var Courier_Code = courier_information[1];
                    // object = {
                    //     name: "Estimated Shipping fee|" + Courier + "|" + Courier_Code,
                    //     productCode: Courier_Code,
                    //     quantity: 1,
                    //     pricePerItem: $("#estimated-price-courier-option").html(),
                    //     notes: "estimated shipping fee for this purchase",
                    //     totalPrice: $("#estimated-price-courier-option").html(),
                    //     GroupCode: ""
                    // };
                    // alert("here1");
                    // if(i == 0){
                    //     requestArrayForItemsToCheckout.push(object);
                    // }

                    var i =0;
                    for(i; i < itemsToCheckout.length; i ++){
                        if(response.Product_Code == itemsToCheckout[i].productNo){
                            var priceSingular = parseInt(removeComma(itemsToCheckout[i].priceAgreed)) / parseInt(itemsToCheckout[i].quantity);
                            object = {
                                name: response.Name,
                                productCode: response.Product_Code,
                                quantity: itemsToCheckout[i].quantity,
                                pricePerItem: priceSingular,
                                notes: "e-commerce product buy request",
                                totalPrice: itemsToCheckout[i].priceAgreed,
                                GroupCode: itemsToCheckout[i].GroupCode
                            };
                            requestArrayForItemsToCheckout.push(object);
                            break;
                        }
                    }
                    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
                    localStorage.setItem("finalStep", productToBeAddedStringify);
                }else{
                    var finalStep = JSON.parse(localStorage.getItem("finalStep"));
                    // var courier_information = $('#Courier-option').find(":selected").text().split("-");
                    // var Courier = courier_information[0];
                    // var Courier_Code = courier_information[1];
                    // object = {
                    //     name: "Estimated Shipping fee|" + Courier + "|" + Courier_Code,
                    //     productCode: Courier_Code,
                    //     quantity: 1,
                    //     pricePerItem: $("#estimated-price-courier-option").html(),
                    //     notes: "estimated shipping fee for this purchase",
                    //     totalPrice: $("#estimated-price-courier-option").html(),
                    //     GroupCode: ""
                    // };
                    // alert(i);
                    // if(i == 0){
                    //     finalStep.push(object);
                    // }
                    var i =0;
                    for(i; i < itemsToCheckout.length; i ++){
                        if(response.Product_Code == itemsToCheckout[i].productNo){
                            var priceSingular = parseInt(removeComma(itemsToCheckout[i].priceAgreed)) / parseInt(itemsToCheckout[i].quantity);
                            object = {
                                name: response.Name,
                                productCode: response.Product_Code,
                                quantity: itemsToCheckout[i].quantity,
                                pricePerItem: priceSingular,
                                notes: "e-commerce product buy request",
                                totalPrice: itemsToCheckout[i].priceAgreed,
                                GroupCode: itemsToCheckout[i].GroupCode
                            };
                            finalStep.push(object);
                            break;
                        }
                    }
                    var productToBeAddedStringify = JSON.stringify(finalStep);
                    localStorage.setItem("finalStep", productToBeAddedStringify);
                }
        });
    }
}

function removeComma( num ) {
    var fixedNum = num.toString().split(',');
    var i = 0;
    var result = "";
    for(i ; i < fixedNum.length; i++){
        result = result + fixedNum[i];
    }
    return result;
}

function clearStorage(){
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("finalStep", productToBeAddedStringify);
}

function personalDetailsWithNewAddress(address){
    var request = {};
    var currDate = new Date();
    var month = currDate.getMonth() + 1;
    var day = currDate.getDate();
    var year = currDate.getFullYear();
    var date = year + "-" + month + "-" + day;
    var paymentSelection = $("#payment-selection").children("option:selected").val();
    var periodSelection = "";
    if(paymentSelection == "PERIOD" ){
        periodSelection = $("#period-selection").children("option:selected").val();
        if(periodSelection == "30 Days"){
            periodSelection = 30;
        }else{
            periodSelection = 60;
        }
    }
    // var arrayAddress = address.split(";");
    getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
        request = {
            customerId: localStorage.getItem("token"),
            paymentMethod: paymentSelection,
            paymentMethodDetailes: periodSelection,
            address: address  + ". " + $("#subdistrict-courier-option").find(":selected").text() + ", " + $("#district-courier-option").find(":selected").text() + ", " + $("#city-courier-option").find(":selected").text() + ", " + $("#province-courier-option").find(":selected").text() + ", " + $("#zipcode-courier-option").find(":selected").text(),
            fullName: response.First_Name + " " + response.Last_Name,
            contactNumber: response.Contact_Number_1,
            email: response.Email,
            notes: "e-commerce penjualan request",
            orderDate: date   
        };
        $("#submitRequestFinalButton").toggle();
        $("#backtocartRequestFinalButton").toggle();
        sendRequestFinal(paymentSelection);
        var paymentMethodChosen = $("#payment-selection").children("option:selected").val();
        if(paymentMethodChosen == "BCA VA TRANSFER" ){
            setTimeout(() => {sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request);}, 2000);
            // setTimeout(() => { clearStorage(); }, 3000);
        }else{
            setTimeout(() => {sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request);}, 2000);
            // setTimeout(() => { clearStorage(); }, 3000);
        }
    });
}

function truncateCart(){
    var itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"));
    var itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout"));
    var i = 0;
    for(i; i < itemsInCart.length; i++){
        var x = 0;
        for(x; x < itemsToCheckout.length; x++){
            if(itemsToCheckout[x].productNo == itemsInCart[i].productNo){
                itemsInCart.splice(i, 1);
                var productToBeAddedStringify = JSON.stringify(itemsInCart);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                // break;
            }
        }
    }
}

function redirectToCart(){
    window.location.href = "./cart.html";
}

function add_delivery_fee(productArr){
    var courier_information = $('#Courier-option').find(":selected").text().split("-");
    var Courier = courier_information[0];
    var Courier_Code = courier_information[1];
    object = {
        name: $('#shipping-fee-courier-option').find(":selected").text() + " " + $('#shipping-insurance-courier-option').find(":selected").text() + " " + $('#shipping-packaging-courier-option').find(":selected").text(),
        productCode: Courier_Code,
        quantity: 1,
        pricePerItem: $("#estimated-price-courier-option").html(),
        notes: $('#shipping-fee-courier-option').find(":selected").text() + " " + $('#shipping-insurance-courier-option').find(":selected").text() + " " + $('#shipping-packaging-courier-option').find(":selected").text(),
        totalPrice: $("#estimated-price-courier-option").html(),
        GroupCode: ""
    };
    productArr.push(object);
    return productArr;
}

async function sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuy(request){
    var orderArr = JSON.stringify([request]);
    orderArr = JSON.parse(orderArr);
    var productArr = JSON.parse(localStorage.getItem("finalStep"));

    productArr = add_delivery_fee(productArr);

    // console.log(productArr);

    var i = 0;
    var totalQuantity = 0;
    for(i; i < productArr.length; i ++){
        productArr[i].quantity = (productArr[i].quantity).toString();
        totalQuantity = totalQuantity + (productArr[i].quantity * 1);
        productArr[i].totalPrice = (removeComma(productArr[i].totalPrice)).toString();
    }
    saveExpressOrderId(getCurrentTimeComplete());
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    // console.log(customer_information);
    // console.log(item_bought);
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    swal.fire("Order sudah dikirimkan", "","success");
                }else{
                    // console.log(response);
                    swal.fire("Order gagal dikirimkan", "","warning");
                }
                truncateCart();
                await setTimeout(() => { clearStorage(); }, 2000);
                // await setTimeout(() => {window.location.href = "./cart.html";}, 3000);
            });
        }
    });
}

async function sendFinalRequestToEnquiryAndEnquiryDetailsWithoutGroupBuyAndVA(request){
    var orderArr = JSON.stringify([request]);
    orderArr = JSON.parse(orderArr);
    var productArr = JSON.parse(localStorage.getItem("finalStep"));

    productArr = add_delivery_fee(productArr);
    // alert(productArr.length);
    // console.log(productArr);

    var i = 0;
    var totalQuantity = 0;
    for(i; i < productArr.length; i ++){
        productArr[i].quantity = (productArr[i].quantity).toString();
        totalQuantity = totalQuantity + (productArr[i].quantity * 1);
        productArr[i].totalPrice = (removeComma(productArr[i].totalPrice)).toString();
    }
    saveExpressOrderId(getCurrentTimeComplete());
    // if(orderArr[0].paymentMethod == "BCA TRANSFER"){
    //     orderArr[0].paymentMethod = "transfer";
    // }
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    // console.log(customer_information);
    // console.log(item_bought);
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    swal.fire("Order sudah dikirimkan", "","success");
                }else{
                    swal.fire("Order gagal dikirimkan", "","warning");
                }
                truncateCart();
                await setTimeout(() => { clearStorage(); }, 2000);
                await setTimeout(() => {window.location.href = "./cart.html";}, 3000);
            });
        }
    });
}

async function sendFinalToAccurate(request){
    loadingMessage(10000);
    // console.log("sendFinalToAccurate ======================================");
    var orderArr = JSON.stringify([request]);
    orderArr = JSON.parse(orderArr);
    var productArr = JSON.parse(localStorage.getItem("finalStep"));
    var i = 0;
    var totalQuantity = 0;
    for(i; i < productArr.length; i ++){
        productArr[i].quantity = (productArr[i].quantity).toString();
        totalQuantity = totalQuantity + (productArr[i].quantity * 1);
        productArr[i].totalPrice = (removeComma(productArr[i].totalPrice)).toString();
    }
    // console.log("productArr " + JSON.stringify(productArr));
    // console.log("orderArr " + JSON.stringify(orderArr));
    await reorderJSON(orderArr[0], productArr).then(async value => {
        return await value;
    });
    // console.log(customer_information);
    // console.log(item_bought);
    getCustomersWithCustomerNo(customer_information.Customer_Code).done(function (response) {
        if(response != false){
            createNewSalesOrder(item_bought, customer_information, response.Email, $("#checkout-otp-number").val(), $("#checkout-password").val()).done(async function (response) {
                if(response.status == true){
                    swal.fire("Order sudah dikirimkan", "","success");
                }else{
                    swal.fire("Order gagal dikirimkan", "","warning");
                }
                truncateCart();
                await setTimeout(() => { clearStorage(); }, 2000);
            });
        }
    });
}

var customer_information = {};
var item_bought = [];

async function reorderJSON(customerDetails, productArr){
    var total_price = 0;
    var total_quantity = 0;
    var i = 0;
    item_bought = [];
    for (i = 0; i < productArr.length; i++){
        if(productArr[i].totalPrice.toUpperCase() != "NaN".toUpperCase() && productArr[i].quantity.toUpperCase() != "NaN".toUpperCase()){
            item_bought.push(
                {
                    Customer_Code: customerDetails.customerId,
                    Product_Code: productArr[i].productCode,
                    Product_Name: productArr[i].name,
                    Quantity_Requested: productArr[i].quantity,
                    Price_Based_On_Total_Quantity: productArr[i].totalPrice
                }
            );
            total_price = total_price + parseFloat(productArr[i].totalPrice);
            total_quantity = total_quantity + parseFloat(productArr[i].quantity);
        }else{
            swal.fire("Salah satu item kamu tidak mempunyai harga, pesanan untuk barang tersebut tidak bisa diproses (item : " + productArr[i].productCode + ")", "barang-barang lain tetap dapat diproses","warning");
        }
    }
    customer_information = {};
    return new Promise(async resolve => {
        await getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
            if(response != false){
                resolve(customer_information = {
                    Customer_Code: customerDetails.customerId,
                    Total_Price: total_price,
                    Total_Quantity: total_quantity,
                    Unit: "pcs",
                    Shipping_Address: customerDetails.address,
                    Shipping_Contact_Number: response.Contact_Number_1,
                    Payment_Method: customerDetails.paymentMethod,
                    Shipping_Fee: $("#estimated-price-courier-option").html(),
                    Primary_Recipient_Name: response.First_Name + " " + response.Last_Name
                });
            }
        });
    });
}

function saveExpressOrderId(orderid){
    localStorage.setItem("ExpressOrderId", orderid);
}