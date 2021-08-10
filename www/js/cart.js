$(document).ready(async function(){
    console.log("localStorage.getItem(\"itemsInCart\") " + localStorage.getItem("itemsInCart"));
    var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
    var i = 0;
    if(cartToJson != undefined){
        if(cartToJson.length != 0){
            loadingMessage(cartToJson.length);
            save_cart(localStorage.getItem("token"), localStorage.getItem("itemsInCart")).done(function (response) {
            });
            for(i; i < cartToJson.length; i ++){
                await loadcart(cartToJson[i].productNo, cartToJson[i].quantity);
            }
        }else{
            loadingMessage(1);
            // get_cart(localStorage.getItem("token")).done(function (response) {
            //     if(response != undefined){
            //         cartToJson = JSON.parse(response);
            //         localStorage.setItem("itemsInCart", response);
            //         for(i; i < cartToJson.length; i ++){
            //             loadcart(cartToJson[i].productNo, cartToJson[i].quantity);
            //         }
            //     }
            // });
            for(i; i < cartToJson.length; i ++){
                loadcart(cartToJson[i].productNo, cartToJson[i].quantity);
            }
        }
    }else{
        var emptyArray = [];
        var emptyArrayString = JSON.stringify(emptyArray);
        localStorage.setItem("itemsInCart", emptyArrayString);
    }
    checkboxCounter = 0;
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    console.log("localStorage.getItem(\"itemsToCheckout\") " + localStorage.getItem("itemsToCheckout"));
});

// function loadcart(productNo, quantity){
//     getProductsWithProductNo("", "", productNo).done(function (response) {
//         console.log(response);
//         if(response == false){
//             console.log("product no found ======= removed");
//             var i = 0;
//             var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
//             for(i; i < cartToJson.length; i ++){
//                 if(cartToJson[i].productNo == productNo){
//                     console.log("product no found ======= removed");
//                     cartToJson.splice(i, 1);
//                     localStorage.setItem("itemsInCart", JSON.stringify(cartToJson));
//                 }
//             }
//         }else{
//             $("#cart-list").append("<tr class=\"table-primary\" id=\"productName" + productNo + "\">"); // change id (productName) to actual product id or name
//             // checklist
//             $("#productName" + productNo).append("<td class=\"product-checklist\" scope=\"row\" id=\"" + productNo + "first" + "\">");
//             $("#" + productNo + "first").append("<div class=\"form-check\" id=\"" + productNo + "containerCheck" + "\">");
//             $("#" + productNo + "containerCheck").append("<input class=\"form-check-input\" id=\"checklist" + productNo + "\" type=\"checkbox\" value=\"productNo\" onchange=\"selectedCart(this,\'" + productNo + "\')\">");
//             // product image
//             $("#productName" + productNo).append("<td class=\"product-names\" id=\"" + productNo + "second" + "\">");
//             $("#" + productNo + "second").append("<img src=\"" + response.Picture_1 + "\" style=\"width: 50px; height: 50px; margin-right: 10px;\">" + response.Name + "<br>");
//             $("#" + productNo + "second").append("<button type=\"button\" id=\"erase" + productNo + "\" class=\"btn btn-info\" onclick=\"eraseItem(\'" + productNo + "\')\">erase</button>");
//             // quantity
//             $("#productName" + productNo).append("<td class=\"product-quantity\" id=\"" + productNo + "third" + "\">");
//             $("#" + productNo + "third").append("<i onclick=\"reduceQuantity(\'" + productNo + "\')\" class=\"glyphicon glyphicon-chevron-left\" id=\"productNo" + productNo + "decrease" +"\"></i>");
//             $("#" + productNo + "third").append("<input id=\"quantity" + productNo + "\" class=\"fake\" value=\"" + quantity + "\" onclick=zoomIn(this) onchange=\"quantityUpdatedDirectly(this, \'" + productNo + "\')\"></input>");
//             $("#" + productNo + "third").append("<i onclick=\"addQuantity(\'" + productNo + "\')\" class=\"glyphicon glyphicon-chevron-right\" id=\"productNo" + productNo + "increase" +"\"></i>");
//             $("#" + productNo + "third").append("<div class=\"card-text stock-quantity" + productNo + "\">stock:" + response.Stock_Quantity + "</div>");
//             // price
//             $("#productName" + productNo).append("<td class=\"product-price\" id=\"" + productNo + "fourth" + "\">");
//             $("#" + productNo + "fourth").append("<input class=\"fake-1\" id=\"" + productNo + "\" value=\"" + commafy(Math.round(((quantity * response.Sell_Price)*1)* 100)/ 100) + "\" disabled></input>");
//         }
//     });
// }

function loadcart(productNo, quantity){
    getProductsWithProductNo("", "", productNo).done(function (response) {
        console.log(response);
        if(response == false){
            console.log("product no found ======= removed");
            var i = 0;
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            for(i; i < cartToJson.length; i ++){
                if(cartToJson[i].productNo == productNo){
                    console.log("product no found ======= removed");
                    cartToJson.splice(i, 1);
                    localStorage.setItem("itemsInCart", JSON.stringify(cartToJson));
                }
            }
        }else{
            $(`.cart-list`).append(`
            <div class="product-in-card" id="product-in-card-${productNo}">
                <div class="product-in-card-body">
                    <img class="product-image-in-cart" src="${response.Picture_1}">
                    <div class="product-details">
                        <div class="product-in-card-body">
                            <input class="form-check-input" id="checklist${productNo}" type="checkbox" value="${productNo}" onchange="selectedCart(this,'${productNo}')">
                            <div class="card-text product-in-card-name">${response.Name}</div>
                        </div>
                        <label>Harga</label>
                        <input type="text" id="${productNo}" class="form-control price-form" value="${commafy(Math.round(((quantity * response.Sell_Price)*1)* 100)/ 100)}" disabled>
                        <label>Estimasi berat/pc (kg)</label>
                        <input type="text" id="${productNo}" class="form-control price-form" value="${commafy(response.Weight_KG)}" disabled>
                        <table>
                            <tr>
                            <th>Kuantitas permintaan</th>
                            <th>Stok tersedia</th>
                            </tr>
                            <tr>
                            <td><input type="number" id="quantity${productNo}" class="form-control quantity-form" value="${quantity}" onchange="quantityUpdatedDirectly(this, '${productNo}')"></td>
                            <td><input type="text" class="form-control stock-form" value="${response.Stock_Quantity}" disabled></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            `);
        }
    });
}

function zoomIn(x){
    $(".fake").css("width", "100%");
    $(".glyphicon-chevron-right").css("display", "table");
    $(".glyphicon-chevron-right").css("margin", "auto");
    $(".glyphicon-chevron-right").html("Tambah");
    $(".glyphicon-chevron-left").css("display", "table");
    $(".glyphicon-chevron-left").css("margin", "auto");
    $(".glyphicon-chevron-left").html("Kurang");
}

function eraseItem(id){
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val()));
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }
    var i = 0;
    var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
    for(i; i < cartToJson.length; i ++){
        if(cartToJson[i].productNo == id){
            cartToJson.splice(i, 1);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(cartToJson);
            localStorage.setItem("itemsInCart", productToBeAddedStringify);
            console.log("reduceQuantity localStorage " + localStorage.getItem("itemsInCart"));
            break;
        }
    }
    removeItemsToCheckout(id);
    $("#productName" + id).empty();
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

function quantityUpdatedDirectly(x, id){
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val()));
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }
    if($(x).val() > 0){
        loadingMessage(2);
        getProductsWithProductNo("", "", id).done(function (response) {
            var i = 0;
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            if(cartToJson.length != 0){
                loadingMessage(cartToJson.length);
            }
            for(i; i < cartToJson.length; i ++){
                if(cartToJson[i].productNo == id){
                    cartToJson[i].quantity = $(x).val();

                    // saving to storage
                    var productToBeAddedStringify = JSON.stringify(cartToJson);
                    localStorage.setItem("itemsInCart", productToBeAddedStringify);
                    $("#quantity" + id).val(cartToJson[i].quantity);

                    $("#" + id).val( commafy( parseInt($("#quantity" + id).val()) * (response.Sell_Price*1) ) );
                    console.log("addQuantity localStorage " + localStorage.getItem("itemsInCart"));
                    break;
                }
            }
        });
    }else{
        var i = 0;
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == id){
                cartToJson.splice(i, 1);

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                console.log("reduceQuantity localStorage " + localStorage.getItem("itemsInCart"));
                window.location.href = "./cart.html"
                break;
            }
        }
        $("#productName" + id).empty();
    }
}

var checkboxCounter = 0;
var totalPrice = 0;
function selectedCart(checkBox,number){
    if (checkBox.checked == true){
        $("#product-in-card-"+number).css("border", "solid 5px lightblue");
        addItemsToCheckout(number);


        totalPrice = totalPrice + parseInt( removeComma($("#" + number).val()) );
        checkboxCounter++;
    } else {
        $("#product-in-card-"+number).css("border", "none");
        removeItemsToCheckout(number);

        totalPrice = totalPrice - parseInt( removeComma($("#" + number).val()) );
        checkboxCounter--;
    }
    $("#total_selected_price").html(commafy(totalPrice));
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

function removeItemsToCheckout(number){
    var i = 0;
    var cartToJson = JSON.parse(localStorage.getItem("itemsToCheckout"));
    for(i; i < cartToJson.length; i ++){
        if(cartToJson[i].productNo == number){
            cartToJson.splice(i, 1);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(cartToJson);
            localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
            console.log("removeItemsToCheckout localStorage " + localStorage.getItem("itemsToCheckout"));
            break;
        }
    }
}

function addItemsToCheckout(number){
    if(localStorage.getItem("itemsToCheckout") === null){
        getProductsWithProductNo("", "", number).done(function (response) {
            var productToBeAdded = {
                productNo: response.Product_Code,
                quantity: parseInt($("#quantity" + number).val()),
                GroupCode: "NO COUPON",
                priceAgreed: $("#" + number).val()
            };

            var array = [];
            array.push(productToBeAdded);

            // saving to storage
            var productToBeAddedStringify = JSON.stringify(array);
            localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
            console.log(localStorage.getItem("itemsToCheckout"));
        });
    }else {
        var cartToJson = JSON.parse(localStorage.getItem("itemsToCheckout"));
        console.log("itemsToCheckout " + cartToJson);
        var i = 0;
        var indicator = 0;
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == number){
                cartToJson[i].quantity = parseInt($("#quantity" + number).val());
                var itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"));
                if(itemsInCart[i].groupCode != null || itemsInCart[i].groupCode != undefined){
                    cartToJson[i].GroupCode = itemsInCart[i].groupCode;
                }else{
                    cartToJson[i].GroupCode = "NO COUPON";
                }
                cartToJson[i].priceAgreed = $("#" + number).val();
                indicator++;

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                console.log("debug " + localStorage.getItem("itemsToCheckout"));
                break;
            }
        }
        if(indicator == 0){
            getProductsWithProductNo("", "", number).done(function (response) {
                var productToBeAdded = {
                    productNo: response.Product_Code,
                    quantity: parseInt($("#quantity" + number).val()),
                    GroupCode: "NO COUPON",
                    priceAgreed: $("#" + number).val()
                };

                cartToJson.push(productToBeAdded);

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                console.log(localStorage.getItem("itemsToCheckout"));
            });
        }
    }
}

function addQuantity(id){
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        removeItemsToCheckout(id);
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val())) ;
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }
    loadingMessage(2);
    getProductsWithProductNo("", "", id).done(function (response) {
        var i = 0;
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        if(cartToJson.length != 0){
            loadingMessage(cartToJson.length);
        }
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == id){
                cartToJson[i].quantity = parseInt(cartToJson[i].quantity) + 1;

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                $("#quantity" + id).val(cartToJson[i].quantity);

                $("#" + id).val( commafy( parseInt($("#quantity" + id).val()) * (response.Sell_Price*1) ) );
                console.log("addQuantity localStorage " + localStorage.getItem("itemsInCart"));
                break;
            }
        }
    });
}

function reduceQuantity(id){
    var checkBox = document.getElementById("checklist" + id);
    if (checkBox.checked == true){
        checkBox.checked = false;
        removeItemsToCheckout(id);
        totalPrice = totalPrice - parseInt(removeComma($("#" + id).val()));
        checkboxCounter--;
        $("#total_selected_price").html(commafy(totalPrice));
    }

    if(parseInt($("#quantity" + id).val()) - 1 == 0){
        var i = 0;
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        for(i; i < cartToJson.length; i ++){
            if(cartToJson[i].productNo == id){
                cartToJson.splice(i, 1);

                // saving to storage
                var productToBeAddedStringify = JSON.stringify(cartToJson);
                localStorage.setItem("itemsInCart", productToBeAddedStringify);
                console.log("reduceQuantity localStorage " + localStorage.getItem("itemsInCart"));
                break;
            }
        }

        $("#productName" + id).empty();
    }else{
        loadingMessage(2);
        getProductsWithProductNo("", "", id).done(function (response) {
            var i = 0;
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            if(cartToJson.length != 0){
                loadingMessage(cartToJson.length);
            }
            for(i; i < cartToJson.length; i ++){
                if(cartToJson[i].productNo == id){
                    cartToJson[i].quantity = parseInt(cartToJson[i].quantity) - 1;

                    // saving to storage
                    var productToBeAddedStringify = JSON.stringify(cartToJson);
                    localStorage.setItem("itemsInCart", productToBeAddedStringify);
                    $("#quantity" + id).val(cartToJson[i].quantity);
                    $("#" + id).val( commafy( parseInt($("#quantity" + id).val()) * (response.Sell_Price*1) ) );
                    console.log("addQuantity localStorage " + localStorage.getItem("itemsInCart"));
                    break;
                }
            }
        });
    }
}

function loadingMessage(interval){
    let timerInterval
    Swal.fire({
    title: 'Loading Your Request',
    html: '',
    timer: interval*700,
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

function checkingout(){
    var token = localStorage.getItem("token");
    console.log("token " + token);
    if(checkboxCounter > 0 && (token != "" && token != null)){
        swal.fire("Final Step","","success");
        window.location.href = "./checkout.html";
    }else{
        swal.fire("Something is missing","You may not have selected item(s) from your cart or login","warning");
        if(token == ""){
            window.location.href = "./sign-in.html";
        }
    }
}

function checkingoutAll(){
    var token = localStorage.getItem("token");
    console.log("token " + token);
    if((token != "" && token != null)){
        var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
        // alert(localStorage.getItem("itemsInCart"));
        if(cartToJson.length != 0){
            var array = [];
            var productToBeAddedStringify = JSON.stringify(array);
            localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
            var i = 0;
            for(i; i < cartToJson.length; i ++){
                var productToBeAdded = {
                    productNo: cartToJson[i].productNo,
                    quantity: parseInt($("#quantity" + cartToJson[i].productNo).val()),
                    GroupCode: "NO COUPON",
                    priceAgreed: $("#" + cartToJson[i].productNo).val()
                };
                array.push(productToBeAdded);
            
                // saving to storage
                var productToBeAddedStringify = JSON.stringify(array);
                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                console.log(localStorage.getItem("itemsToCheckout"));
            }
            swal.fire("Final Step","","success");
            window.location.href = "./checkout.html";
        }else{
            swal.fire("Something is missing","You do not have anything in Cart","warning");
        }
    }else{
        swal.fire("Something is missing","You have not logged-in","warning");
        if(token == ""){
            window.location.href = "./sign-in.html";
        }
    }
}

function checkingoutAllInStore(){
    in_store_loading_checkout();
    setTimeout(() => {
        var token = localStorage.getItem("token");
        console.log("token " + token);
        if((token != "" || token == null)){
            var cartToJson = JSON.parse(localStorage.getItem("itemsInCart"));
            if(cartToJson.length != 0){
                var array = [];
                var productToBeAddedStringify = JSON.stringify(array);
                localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                var i = 0;
                for(i; i < cartToJson.length; i ++){
                    var productToBeAdded = {
                        productNo: cartToJson[i].productNo,
                        quantity: parseInt($("#quantity" + cartToJson[i].productNo).val()),
                        GroupCode: "NO COUPON",
                        priceAgreed: $("#" + cartToJson[i].productNo).val()
                    };
                    array.push(productToBeAdded);
                
                    // saving to storage
                    var productToBeAddedStringify = JSON.stringify(array);
                    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
                    console.log(localStorage.getItem("itemsToCheckout"));
                }
                swal.fire("Final Step","","success");
                window.location.href = "./checkout-in-store.html?check_store_price=true";
            }else{
                swal.fire("Something is missing","You do not have anything in Cart","warning");
            }
        }else{
            swal.fire("Something is missing","You have not logged-in","warning");
            if(token == ""){
                window.location.href = "./sign-in.html";
            }
        }
    }, 5100);
}

function in_store_loading_checkout(){
    let timerInterval
    Swal.fire({
    title: 'Perubahan harga sesuai harga Toko',
    html: 'Harga akan berubah sesuai dengan harga Toko',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        const content = Swal.getHtmlContainer()
        if (content) {
            const b = content.querySelector('b')
            if (b) {
            b.textContent = Swal.getTimerLeft()
            }
        }
        }, 100)
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
    })
}
