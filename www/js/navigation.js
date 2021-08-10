$(document).ready(function(){
    // $.get("http://147.139.168.202:8080/setTableStatus.jsp", function(data, status){
    //     datas = JSON.parse(data);
    //     console.log(datas);
    // });

    // index.html
    $("#home").click(function(){
        clearStorage();
        $(".navbar-bottom-icon").removeClass("active");
        $("#home-icon").toggleClass("active");
        $(".content_iframe").attr("src","./home.html");
        $(".content_iframe_floating").css("display", "none");
    });

    $("#categories").click(function(){
        clearStorage();
        $(".navbar-bottom-icon").removeClass("active");
        $("#categories-icon").toggleClass("active");
        $(".content_iframe").attr("src","./category.html");
        $(".content_iframe_floating").css("display", "none");
    });

    $("#cart").click(function(){
        clearStorage();
        $(".navbar-bottom-icon").removeClass("active");
        $("#cart-icon").toggleClass("active");
        $("#cart-icon-top").toggleClass("active");
        // $(".content_iframe").attr("src","./cart.html");
        $(".content_iframe_floating").toggle();
        $(".content_iframe_floating").attr("src", "./cart.html");
    });

    $("#cart-top").click(function(){
        clearStorage();
        $(".navbar-bottom-icon").removeClass("active");
        $("#cart-icon").toggleClass("active");
        $("#cart-icon-top").toggleClass("active");
        // $(".content_iframe").attr("src","./cart.html");
        $(".content_iframe_floating").toggle();
        $(".content_iframe_floating").attr("src", "./cart.html");
    });

    $("#account").click(function(){
        clearStorage();
        $(".content_iframe_floating").css("display", "none");
        $(".navbar-bottom-icon").removeClass("active");
        $("#account-icon").toggleClass("active");
        console.log(localStorage.getItem("token"));
        if(localStorage.getItem("token") == "" || localStorage.getItem("token") === null){
            $(".content_iframe").attr("src","./sign-in.html");
        }else{
            $(".content_iframe").attr("src","./profile-account.html");
        }
    });

    $("#scan-qr").click(function(){
        clearStorage();
        $(".content_iframe_floating").css("display", "none");
        $(".navbar-bottom-icon").removeClass("active");
        $("#scan-qr-icon").toggleClass("active");
        $(".content_iframe").attr("src","./product_scanner.html");
    });

    // delivery
    $("#delivery-icon").click(function(){
        clearStorage();
        $(".content_iframe_floating").css("display", "none");
        $(".navbar-bottom-icon").removeClass("active");
        $("#delivery-icon").toggleClass("active");
        $(".content_iframe").attr("src","./delivery_order_list.html");
    });

    $("#search-input").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#search").click();
        }
    });

    // search 
    $("#search").click(function(){
        clearStorage();
        // alert($("#search-input").val());
        $(".content_iframe_floating").css("display", "none");
        $(".content_iframe").attr("src","./search_results.html?input=" + $("#search-input").val());
    });

    // category from home.html
    $("#category-icon-from-home").click(function(){
        clearStorage();
        window.location.href = "./category.html";
    });
    // contact us from delivery.html
    $("#contact-us").click(function(){
        clearStorage();
        window.location.href = "./contact.html";
    });

    //live chat
    $("#live-chat").click(function(){
        clearStorage();
        window.location.href = "./contact_us_now.html";
    });
});

// getting product details
function redirectProductDetails(product, productid, productName){
    clearStorage();
    window.location.href = "./product_details.html?productid="+productid+"&productName="+productName;
}

// getting list with condition from category
function redirectToList(category){
    clearStorage();
    window.location.href = "./search_results.html?category="+category; // sample
}

var googleAPIKey = 'AIzaSyAxtQWK_PHCs2LzHpChoEi-hd0LVmLsvi4';

var googleClientID = '1062711655963-6vujo123a8obkbo25dfg6dviouc5gqap.apps.googleusercontent.com';

var googleClientSecret = 'iJGwsXBZUiqKMYECHqdu2AxA';


function get_live_chat(){
    clearStorage();
    if(localStorage.getItem("token") != ""){
        getCustomersWithCustomerNo(localStorage.getItem("token")).done(function (response) {
            console.log(response);
            // $(".content_iframe").attr("src","http://147.139.168.202:3045/?user_name=" + (response.First_Name + " " + response.Last_Name));
            $(".content_iframe").attr("src","https://tawk.to/chat/60f103efd6e7610a49ab8521/1famneoj8");
            $(".content_iframe_floating").css("display", "none");
            // $("#customer-service-help-line-icon").css("display", "none");
        });
    }else{
        $(".content_iframe").attr("src","https://tawk.to/chat/60f103efd6e7610a49ab8521/1famneoj8");
        $(".content_iframe_floating").css("display", "none");
        // $("#customer-service-help-line-icon").css("display", "none");
    }
}

function clearStorage(){
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("itemsToCheckout", productToBeAddedStringify);
    var requestArrayForItemsToCheckout = [];
    var productToBeAddedStringify = JSON.stringify(requestArrayForItemsToCheckout);
    localStorage.setItem("finalStep", productToBeAddedStringify);
}