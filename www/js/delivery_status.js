$(document).ready(function(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var status = urlParams.get('status');
    const orderNumber = urlParams.get('orderNumber');
    status = JSON.parse(status);
    console.log(orderNumber);
    get_shipping_information(orderNumber).done(function (response) {
        var tracking_number = "";
        if(response.Shipping_Number != undefined || response.Shipping_Number != null){
            tracking_number = JSON.parse(response.Shipping_Number);
            $(".details-area-order-number").empty();
            $(".details-area-order-number").append(`
            <div>
                Your Order Number: ${orderNumber}
                <br>
                Tracking Number: ${tracking_number.paket_awb}
            </div>
            `);
        }else{
            $(".details-area-order-number").empty();
            $(".details-area-order-number").append(`
            <div>
                Your Order Number: ${orderNumber}
                <br>
                Your Delivery Number: ${response.Delivery_Order_Number}
            </div>
            `);
        }
    });

    if(!orderNumber.includes("SOVIG")){
        $(".order-details").css("display", "block");
        populateOrdersTable(status);
        vaNumber = vaNumber + "" + orderNumber;
    }
    if(status.Status.toUpperCase().includes("PENDING")){
        $("#indicator-received").attr("src","./www/img/CATEGORY_ICONS/checklist.png");
        $("#indicator-approved").attr("src","./www/img/CATEGORY_ICONS/fast-delivery.png");
        $("#indicator-delivered").attr("src","./www/img/CATEGORY_ICONS/fast-delivery.png");
    }else if(status.Status.toUpperCase().includes("APPROVING")){
        $("#indicator-received").attr("src","./www/img/CATEGORY_ICONS/checklist.png");
        $("#indicator-approved").attr("src","./www/img/CATEGORY_ICONS/checklist.png");
        $("#indicator-delivered").attr("src","./www/img/CATEGORY_ICONS/checklist.png");
    }else{
        $("#indicator-received").attr("src","./www/img/CATEGORY_ICONS/rejected.png");
        $("#indicator-approved").attr("src","./www/img/CATEGORY_ICONS/rejected.png");
        $("#indicator-delivered").attr("src","./www/img/CATEGORY_ICONS/rejected.png");
        Swal.fire("Order may have been cancelled or rejected", "Pesanan mungkin telah dibatalkan atau ditolak", "warning");
    }
    if(status.Payment_Method.toUpperCase() == "BCA VA TRANSFER".toUpperCase() && (status.Payment_Status == null || status.Payment_Status != "payment")){
        window.location.assign("./unpaidOrderDetails.html?orderNumber=" + orderNumber + "&vaNumber=" + status.VA_Number);
    }else if(status.Payment_Method.toUpperCase() == "C.O.D" || status.Payment_Method.toUpperCase() == "COD") {
        $(".transfer-information").css("display", "none");
    }

});
var vaNumber = "12943";

function populateOrdersTable(datas){
    getAllOrdersForThisCustomer("", datas.Order_Number).done(function (response) {
        console.log(response);
        if(response.length > 0){
            $(".details-area").append(`<div>Shipping address: ${response[0].Shipping_Address}</div>`);
            if(response[0].Payment_Status != undefined){
                if(response[0].Payment_Status.toUpperCase() == "PAYMENT"){
                    $(".transfer-information").css("display", "none");
                }else if(response[0].Payment_Method.toUpperCase() == "BCA VA TRANSFER"){
                    $(".transfer-information").css("display", "none");
                }
            }
            var i = 0;
            for(i ; i < response.length; i++){
                generateOrdersRow(i, response[i]);
            }
        }
    });
}

function generateOrdersRow(i, datas){
    getProductsWithProductNo("", "", datas.Product_Code).done(function (response) {
        $(".order-details-new").append(`
            <div class="product-in-card">
                <div class="product-in-card-body">
                    <img class="product-image-in-cart" src="${response.Picture_1}">
                    <div class="product-details">
                        <div class="card-text product-in-card-name">${datas.Product_Name}</div>
                        <br>
                        <label>Harga</label>
                        <input type="text" id="final_checkout_price_${datas.Price_Based_On_Total_Quantity}" class="form-control price-form" value="${commafy(datas.Price_Based_On_Total_Quantity)}" disabled>
                        <label>Kuantitas diminta</label>
                        <input type="number" class="form-control quantity-form" value="${datas.Quantity_Requested}"  disabled>
                    </div>
                </div>
            </div>
        `);
    });
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
