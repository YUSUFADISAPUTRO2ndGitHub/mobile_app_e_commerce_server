$(document).ready(function(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var search = urlParams.get('input');

    console.log(search);
    if(search != null){
        searchUp(search, "", "");
    }else{
        searchUp("", "", "");
    }
});

function loadingMessage(interval){
    let timerInterval
    Swal.fire({
    title: 'Memproses permintaan Anda',
    html: '',
    timer: interval*100,
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

function searchUp(keywords, conditionPrice, conditionAlphabet){
    var all_products = JSON.parse(localStorage.getItem("all_products_in_sold_co_id"));
    if(keywords.toUpperCase().includes('new'.toUpperCase())){
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
            searchUp("", "", "");
        }
    }else{
        if(all_products.length > 0){
            loadingMessage(1);
            var product_row = 0;
            var selected_products_based_on_keywords = []
            for(product_row; product_row < all_products.length; product_row++){
                if(all_products[product_row].Name != null){
                    if(all_products[product_row].Name.toUpperCase().includes(keywords.toUpperCase())){
                        selected_products_based_on_keywords.push(all_products[product_row]);
                    }
                }
            }
            product_row = 0;
            for(product_row; product_row < selected_products_based_on_keywords.length; product_row++){
                generatehomeOneByOne(product_row, selected_products_based_on_keywords[product_row], selected_products_based_on_keywords.length);
            }
        }else{
            getAllProductsWithoutPaginationWithFilter("", "", "", "", keywords).done(function (response) {
                if(response[0] != false){
                    if(response.length == 0){
                        loadingMessage(1);
                        searchUpBasedOnCategory(keywords);
                    }else if(response.length == 1){
                        loadingMessage(1);
                        generatehomeleftOnly(response.length, response[0], response.length);
                    }else{
                        // condition works for more than 1 product
                        loadingMessage(1);
                        var product_row = 0;
                        for(product_row; product_row < response.length; product_row++){
                            generatehomeOneByOne(product_row, response[product_row], response.length);
                        }
                    }
                }else{
                    Swal.fire("Item not found", "Mungkin saya bisa menunjukkan hasil pencarian yang berbeda", "warning");
                    setTimeout(() => {
                        searchUp(keywords.substring(1, 2), "", "");
                    }, 3000);
                }
            });
        }
    }
}

function searchUpBasedOnCategory(subcategory){
    getAllProductsBasedOnSubCategory(subcategory).done(function (response) {
        if(datas.length == 0){
            loadingMessage(1);
            swal.fire("Oops, Maaf barang yang Anda cari tidak tersedia sekarang ini", "Silahkan coba barang lain", "warning");
        }else{
            // condition if product is just 1 
            if(response.length == 1){
                loadingMessage(response.length);
                generatehomeleftOnly(response.length, response[0]);
            }else{
                loadingMessage(response.length);
                var product_row = 0;
                for(product_row; product_row < response.length; product_row++){
                    generatehomeOneByOne(product_row, response[product_row]);
                }
            }
        }
    });
}

function generatehomeOneByOne(product_row, data, dataLength){
    if(isNaN(data.Sell_Price*1)){
        data.Sell_Price = 0;
    }
    if(product_row % 2 != 0){
        var product_row = product_row - 1;
        // right
        $("#product-highlights" + product_row).append("<th class=\"th-home-search\" id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card product-card-home-and-search\" id=\"product-card-right"+ product_row +"\">");
        $("#product-card-right" + product_row).append("<div class=\"card\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<a href=\"./product_details.html?productid="+ data.Product_Code +"\"><img class=\"card-img-top product-card-images-home-and-search\" src=\"" + data.Picture_1 + "\"></a>");
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
        $("#product-card-left" + product_row).append("<div class=\"card\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-left" + product_row).append("<a href=\"./product_details.html?productid="+ data.Product_Code +"\"><img class=\"card-img-top product-card-images-home-and-search\" src=\"" + data.Picture_1 + "\">");
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

function generatehomeleftOnly(product_row, leftdata, dataLength){
    // left
    $("#product-highlights").append("<tr id=\"product-highlights"+ product_row +"\">");
    $("#product-highlights" + product_row).append("<th class=\"th-home-search\" id=\"left"+ product_row +"\">");
    $("#left" + product_row).append("<div class=\"notification product-card product-card-home-and-search\" id=\"product-card-left"+ product_row +"\">");
    $("#product-card-left" + product_row).append("<div class=\"card\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
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