$(document).ready(function(){
    $(`.product-card-area`).empty();
    generateListSale();
    if(localStorage.getItem("main-ads-pop-up-counter") === "1"){
        $(".ads-group").css("display", "none");
    }else{
        $(".ads-group").css("display", "block");
    }
});

function generatehomeOneByOne(product_row, data, dataLength){
    if(isNaN(data.Sell_Price*1)){
        data.Sell_Price = 0;
    }
    $(`.product-card-area`).append(`
        <div class="new-product-card">
            <a href="./product_details.html?productid=${data.Product_Code}">
                <img class="product-card-image" src="${data.Picture_1}">
            </a>
            <div class="product-card-title">${data.Name}</div>
            <div class="product-card-price"><span class="fake-price">Rp. ${commafy(Math.round((data.Sell_Price*1.2)* 100)/ 100)}</span><span class="the-price">Rp. ${commafy(Math.round((data.Sell_Price*1)* 100)/ 100)}</span></div>
            <div class="product-card-add-to-cart" onclick="addToCartDirectly('${data.Product_Code}')">add to cart</div>
        </div>
    `);
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
    $(`.product-card-area`).empty();
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
                generatehomeOneByOne(all_group_buy_products.length, all_group_buy_products[0], all_group_buy_products.length);
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
                    generatehomeOneByOne(response.length, response[0], response.length);
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
                generatehomeOneByOne(all_new_products.length, all_new_products[0], all_new_products.length);
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
                    generatehomeOneByOne(response.length, response[0], response.length);
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
                generatehomeOneByOne(all_products.length, all_products[0], all_products.length);
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
                    generatehomeOneByOne(response.length, response[0], response.length);
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