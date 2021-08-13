$(document).ready(function(){
    generateListSale();
    if(localStorage.getItem("main-ads-pop-up-counter") === "1"){
        $(".ads-group").css("display", "none");
    }else{
        $(".ads-group").css("display", "block");
    }
});

function generatehomeOneByOne(product_row, data, dataLength){
    $(".loading-area").css("display", "none");
    if(isNaN(data.Sell_Price*1)){
        data.Sell_Price = 0;
    }
    if(product_row % 2 != 0){
        var product_row = product_row - 1;
        console.log("product_row inside -1 " + product_row);
        // right
        $("#product-highlights" + product_row).append("<th class=\"th-home-search\" id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card product-card-home-and-search\" id=\"product-card-right"+ product_row +"\">");
        $("#product-card-right" + product_row).append("<div class=\"card product-card-home-and-search\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Product_Code + "\', \'" + data.Name + "\')\" class=\"card-img-top product-card-images-home-and-search\" src=\"" + data.Picture_1 + "\">");
        $("#card-right" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-right"+ product_row +"\">");
        $("#card-body-right" + product_row).append("<div class=\"card-title\">" + data.Name ); // + "</div><span class=\"dots\">..</span><br><br>");
        $("#card-body-right" + product_row).append("<div class=\"card-text\" id=\"card-text-right"+ product_row +"\">");
        if(data.Sell_Price <= 0){
            $("#card-text-right" + product_row).append("<div class=\"red-vantsing-text\">Hubungi customer service untuk pembelian</div>");
            $("#card-text-right" + product_row).append("<div class=\"add-to-cart\" onclick=\"contact_customer_service_for_price(\'" + data.Product_Code + "\')\"><span class=\"add-to-cart-button\"><img class=\"independent-cart-icon\" src=\"../www/img/Additional_icons/cart.png\"><span></div>");
        }else{
            $("#card-text-right" + product_row).append("<del class=\"grey-vantsing-text\">Rp. " + commafy(Math.round((data.Sell_Price*1.2)* 100)/ 100) + "</del>");
            $("#card-text-right" + product_row).append("<div class=\"red-vantsing-text\">Rp. " + commafy(Math.round((data.Sell_Price*1)* 100)/ 100) + "</div>");
            $("#card-text-right" + product_row).append("<div class=\"add-to-cart\" onclick=\"addToCartDirectly(\'" + data.Product_Code + "\')\"><span class=\"add-to-cart-button\"><img class=\"independent-cart-icon\" src=\"../www/img/Additional_icons/cart.png\"><span></div>");
        }
        // badge
        if(data.GroupBuy_Purchase == "yes"){
            $("#product-card-right" + product_row).append("<div class=\"homemade-badge category-icon-badge\" id=\"badge-right"+ product_row +"\">");
            $("#badge-right" + product_row).append("<img src=\"../www/img/Additional_icons/sale.png\" class=\"category-icon\" >");
        } 
        if(data.Categorize_NEW == "yes"){
            $("#product-card-right" + product_row).append("<div class=\"homemade-badge category-icon-badge\" id=\"badge-right"+ product_row +"\">");
            $("#badge-right" + product_row).append("<img src=\"../www/img/Additional_icons/new.png\" class=\"category-icon\" >");
        }
    }else{
        console.log("product_row inside 2 " + product_row);
        // left
        $("#product-highlights").append("<tr id=\"product-highlights"+ product_row +"\">");
        $("#product-highlights" + product_row).append("<th class=\"th-home-search\" id=\"left"+ product_row +"\">");
        $("#left" + product_row).append("<div class=\"notification product-card product-card-home-and-search\" id=\"product-card-left"+ product_row +"\">");
        $("#product-card-left" + product_row).append("<div class=\"card product-card-home-and-search\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-left" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Product_Code + "\', \'" + data.Name + "\')\" class=\"card-img-top product-card-images-home-and-search\" src=\"" + data.Picture_1 + "\">");
        $("#card-left" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-left"+ product_row +"\">");
        $("#card-body-left" + product_row).append("<div class=\"card-title\">" + data.Name ); // + "</div><span class=\"dots\">..</span><br><br>");
        $("#card-body-left" + product_row).append("<div class=\"card-text\" id=\"card-text-left"+ product_row +"\">");
        if(data.Sell_Price <= 0){
            $("#card-text-left" + product_row).append("<div class=\"red-vantsing-text\">Hubungi customer service untuk pembelian</div>");
            $("#card-text-left" + product_row).append("<div class=\"add-to-cart\" onclick=\"contact_customer_service_for_price(\'" + data.Product_Code + "\')\"><span class=\"add-to-cart-button\"><img class=\"independent-cart-icon\" src=\"../www/img/Additional_icons/cart.png\"><span></div>");
        }else{
            $("#card-text-left" + product_row).append("<del class=\"grey-vantsing-text\">Rp. " + commafy(Math.round((data.Sell_Price*1.2)* 100)/ 100) + "</del>");
            $("#card-text-left" + product_row).append("<div class=\"red-vantsing-text\">Rp. " + commafy(Math.round((data.Sell_Price*1)* 100)/ 100) + "</div>");
            $("#card-text-left" + product_row).append("<div class=\"add-to-cart\" onclick=\"addToCartDirectly(\'" + data.Product_Code + "\')\"><span class=\"add-to-cart-button\"><img class=\"independent-cart-icon\" src=\"../www/img/Additional_icons/cart.png\"><span></div>");
        }
        // badge
        if(data.GroupBuy_Purchase == "yes"){
            $("#product-card-left" + product_row).append("<div class=\"homemade-badge category-icon-badge\" id=\"badge-left"+ product_row +"\">");
            $("#badge-left" + product_row).append("<img src=\"../www/img/Additional_icons/sale.png\" class=\"category-icon\" >");
        } 
        if(data.Categorize_NEW == "yes"){
            $("#product-card-left" + product_row).append("<div class=\"homemade-badge category-icon-badge\" id=\"badge-left"+ product_row +"\">");
            $("#badge-left" + product_row).append("<img src=\"../www/img/Additional_icons/new.png\" class=\"category-icon\" >");
        }
    }
}

function contact_customer_service_for_price(product_code){
    Swal.fire("Please contact us to purchase this item in large quantity", "Silahkan hubungi kami untuk membeli barang ini dalam jumlah besar", "warning");
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

function theCaller(type){
    loadingMessage(100000);
    $("#product-highlights").empty();
    if(JSON.parse(localStorage.getItem("all_products_in_sold_co_id")).length <= 0){
        save_all_products_to_local_storage ();
    }
    if(type == "sale"){
        var all_group_buy_products = JSON.parse(localStorage.getItem("all_group_buy_products_in_sold_co_id"));
        if(all_group_buy_products.length > 0){
            loadingMessage(1);
            if(all_group_buy_products.length == 1){
                generatehomeleftOnly(all_group_buy_products.length, all_group_buy_products[0], all_group_buy_products.length);
            }else{
                var product_row = 0;
                for(product_row; product_row < all_group_buy_products.length; product_row++){
                    generatehomeOneByOne(product_row, all_group_buy_products[product_row], all_group_buy_products.length);
                }
            }
        }else{
            getAllProductsInGroupBuy("", "").done(function (response) {
                if(response.length == 0){
                    loadingMessage(1);
                }
                if(!response){
                    loadingMessage(1);
                }else{
                    if(response.length > 100){
                        loadingMessage(response.length/4);
                    }else{
                        loadingMessage(response.length);
                    }
                }
                if(response.length == 1){
                    generatehomeleftOnly(response.length, response[0], response.length);
                }else{
                    var product_row = 0;
                    for(product_row; product_row < response.length; product_row++){
                        generatehomeOneByOne(product_row, response[product_row], response.length);
                    }
                }
            });
        }
    }else if(type == "new"){
        var all_new_products = JSON.parse(localStorage.getItem("all_new_products_in_sold_co_id"));
        if(all_new_products.length > 0){
            loadingMessage(1);
            if(all_new_products.length == 1){
                generatehomeleftOnly(all_new_products.length, all_new_products[0], all_new_products.length);
            }else{
                var product_row = 0;
                for(product_row; product_row < all_new_products.length; product_row++){
                    generatehomeOneByOne(product_row, all_new_products[product_row], all_new_products.length);
                }
            }
        }else{
            getAllProductsInNew("", "").done(function (response) {
                if(response.length == 0){
                    loadingMessage(1);
                }
                if(!response){
                    loadingMessage(1);
                }else{
                    if(response.length > 100){
                        loadingMessage(response.length/4);
                    }else{
                        loadingMessage(response.length);
                    }
                }
                if(response.length == 1){
                    generatehomeleftOnly(response.length, response[0], response.length);
                }else{
                    var product_row = 0;
                    for(product_row; product_row < response.length; product_row++){
                        generatehomeOneByOne(product_row, response[product_row], response.length);
                    }
                }
            });
        }
    }else{
        var all_products = JSON.parse(localStorage.getItem("all_products_in_sold_co_id"));
        if(all_products.length > 0){
            loadingMessage(1);
            if(all_products.length == 1){
                generatehomeleftOnly(all_products.length, all_products[0], all_products.length);
            }else{
                var product_row = 0;
                for(product_row; product_row < all_products.length; product_row++){
                    generatehomeOneByOne(product_row, all_products[product_row], all_products.length);
                }
            }
        }else{
            getAllProductsWithoutPagination("", "").done(function (response) {
                if(response.length == 0){
                    loadingMessage(1);
                }
                if(!response){
                    loadingMessage(1);
                }else{
                    if(response.length > 100){
                        loadingMessage(response.length/4);
                    }else{
                        loadingMessage(response.length);
                    }
                }
                if(response.length == 1){
                    generatehomeleftOnly(response.length, response[0], response.length);
                }else{
                    var product_row = 0;
                    for(product_row; product_row < response.length; product_row++){
                        generatehomeOneByOne(product_row, response[product_row], response.length);
                    }
                }
            });
        }
    }
}

function generateListNew(x){
    // $(".loading-area").css("display", "block");
    $("#product-highlights").empty();
    $("#all").removeClass("active-selection");
    $("#sale").removeClass("active-selection");
    $("#new").addClass("active-selection");
    theCaller("new");
}

function generateListSale(x){
    // $(".loading-area").css("display", "block");
    $("#product-highlights").empty();
    $("#all").removeClass("active-selection");
    $("#new").removeClass("active-selection");
    $("#sale").addClass("active-selection");
    theCaller("sale");
}

function generateAllList(x){
    // $(".loading-area").css("display", "block");
    $("#product-highlights").empty();
    $("#new").removeClass("active-selection");
    $("#sale").removeClass("active-selection");
    $("#all").addClass("active-selection");
    theCaller("");
}

function loadingMessage(timerMultiplier){
    let timerInterval
    Swal.fire({
    title: 'Loading',
    html: '',
    timer: timerMultiplier*10,
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
            console.log('I was closed by the timer')
        }
    })
}
function generateListBrand(x){
    window.location.href = "./brand_list.html";
}

function generateQRScanner(x){
    window.location.href = "./product_scanner.html";
}

function generatehomeleftOnly(product_row, leftdata, dataLength){
    console.log(leftdata);
    // left
    $("#product-highlights").append("<tr id=\"product-highlights"+ product_row +"\">");
    $("#product-highlights" + product_row).append("<th class=\"th-home-search\" id=\"left"+ product_row +"\">");
    $("#left" + product_row).append("<div class=\"notification product-card product-card-home-and-search\" id=\"product-card-left"+ product_row +"\">");
    $("#product-card-left" + product_row).append("<div class=\"card product-card-home-and-search\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
    $("#card-left" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + leftdata.Product_Code + "\', \'" + leftdata.Name + "\')\" class=\"card-img-top product-card-images-home-and-search\" src=\"" + leftdata.Picture_1 + "\">");
        $("#card-left" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-left"+ product_row +"\">");
        $("#card-body-left" + product_row).append("<div class=\"card-title\">" + leftdata.Name );
        $("#card-body-left" + product_row).append("<div class=\"card-text\" id=\"card-text-left"+ product_row +"\">");
        $("#card-text-left" + product_row).append("<del class=\"grey-vantsing-text\">Rp. " + commafy(Math.round((leftdata.Sell_Price*1.2)* 100)/ 100) + "</del>");
        $("#card-text-left" + product_row).append("<div class=\"red-vantsing-text\">Rp. " + commafy(Math.round((leftdata.Sell_Price*1)* 100)/ 100) + "</div>");
        // badge
        if(leftdata.Categorize_NEW == "new"){
            $("#product-card-left" + product_row).append("<div class=\"homemade-badge category-icon-badge\" id=\"badge-left"+ product_row +"\">");
            $("#badge-left" + product_row).append("<img src=\"../www/img/Additional_icons/new.png\" class=\"category-icon\" >");
        }
        // right
        $("#product-highlights" + product_row).append("<th class=\"th-home-search\" id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card product-card-home-and-search\" id=\"product-card-right"+ product_row +"\">");
        $("#product-card-right" + product_row).append("<div class=\"card card-hidden\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + leftdata.Product_Code + "\')\" class=\"card-img-top product-card-images-home-and-search\" src=\"" + leftdata.itemMainImage + "\">");
        $("#card-right" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-right"+ product_row +"\">");
        $("#card-body-right" + product_row).append("<div class=\"card-title\">" + leftdata.Name );
        $("#card-body-right" + product_row).append("<div class=\"card-text\" id=\"card-text-right"+ product_row +"\">");
        $("#card-text-right" + product_row).append("<del class=\"grey-vantsing-text\">Rp. " + commafy(Math.round((leftdata.Sell_Price*1.2)* 100)/ 100) + "</del>");
        $("#card-text-right" + product_row).append("<div class=\"red-vantsing-text\">Rp. " + commafy(Math.round((leftdata.Sell_Price*1)* 100)/ 100) + "</div>");
        // badge
        if(leftdata.Categorize_NEW == "new"){
            $("#product-card-right" + product_row).append("<div class=\"homemade-badge category-icon-badge\" id=\"badge-right"+ product_row +"\">");
            $("#badge-right" + product_row).append("<img src=\"../www/img/Additional_icons/new.png\" class=\"category-icon\" >");
        }
}

function addToCartDirectly(product){
    getProductsWithProductNo("", "", product).done(function (response) {
        if(response != undefined){
            if(response.Stock_Quantity != undefined){
                if(isNaN((response.Stock_Quantity*1))){
                    Swal.fire("Stock untuk barang ini sudah habis", "Maaf untuk ketidaknyamanannya", "warning");
                }else{
                    if((response.Stock_Quantity*1) > 0){
                        if(localStorage.getItem("itemsInCart") === null){
                            getProductsWithProductNo("", "", product).done(function (response) {
                                var productToBeAdded = {
                                    productNo: response.Product_Code,
                                    quantity: 1
                                };
                                var array = [];
                                array.push(productToBeAdded);
                    
                                // saving to storage
                                var productToBeAddedStringify = JSON.stringify(array);
                                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                                console.log(localStorage.getItem("itemsInCart"));
                    
                                // add total item in cart
                                localStorage.setItem("totalItemInCart", array.length);
                            });
                        }else{
                            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
                            console.log(cartToJson);
                            var i = 0;
                            var indicator = 0;
                            for(i; i < cartToJson.length; i ++){
                                if(cartToJson[i].productNo == product){
                                    cartToJson[i].quantity = parseInt(cartToJson[i].quantity) + 1;
                                    indicator++;
                    
                                    // saving to storage
                                    var productToBeAddedStringify = JSON.stringify(cartToJson);
                                    localStorage.setItem("itemsInCart", productToBeAddedStringify);
                                    console.log("bug " + localStorage.getItem("itemsInCart"));
                                    break;
                                }
                            }
                            if(indicator == 0){
                                var productToBeAdded = {
                                    productNo: product,
                                    quantity: 1
                                };
                                cartToJson.push(productToBeAdded);
                    
                                // saving to storage
                                var productToBeAddedStringify = JSON.stringify(cartToJson);
                                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                                console.log(localStorage.getItem("itemsInCart"));
                            }
                            // add total item in cart
                            localStorage.setItem("totalItemInCart", cartToJson.length);
                        }
                        Swal.fire("Item Added", "have fun shopping!", "success");
                    }else{
                        Swal.fire("Stock untuk barang ini sudah habis", "Maaf untuk ketidaknyamanannya", "warning");
                    }
                }
            }else{
                Swal.fire("Stock untuk barang ini sudah habis", "Maaf untuk ketidaknyamanannya", "warning");
            }
        }else{
            Swal.fire("Stock untuk barang ini sudah habis", "Maaf untuk ketidaknyamanannya", "warning");
        }
    });
}

setInterval(() => {
    if(localStorage.getItem("main-ads-pop-up-counter") === "1"){
        $(".ads-group").css("display", "none");
    }else{
        $(".ads-group").css("display", "block");
    }
}, 1000);

function hidepopupads(){
    $(".ads-group").css("display", "none");
    localStorage.setItem("main-ads-pop-up-counter", 1);
}

function gopromotedproduct(Product_Code){
    console
    window.location.href = "./product_details.html?productid="+Product_Code+"&productName=unknown";
}