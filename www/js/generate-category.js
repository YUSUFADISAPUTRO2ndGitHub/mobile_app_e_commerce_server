$(document).ready(function(){
    getAllCategories("", "").done(function (response) {
        var bigcatlist = 0;
        for(bigcatlist; bigcatlist < response.length; bigcatlist = bigcatlist + 1){
            generateBigCategoryList(bigcatlist, response[bigcatlist]);
        }
    });
    $( "#small-category-list" ).click(function() {
        $('.pop-up-selection').attr("src", "");
        $('.pop-up-selection').css('display', 'none');
    });
});

function generateBigCategoryList(bigcatlist, data){
    var category_splitted = data.Category.split(" ").join("_");
    $("#big-category-list").append(`
        <tr onclick="generateSmallCatList(this)" class="${category_splitted}" id="big-category-list-tr${category_splitted}">
            <td id="big-category-list-td${bigcatlist}">
                <div class="big-category-list" id="${category_splitted}">
                    ${data.Category}
                <div>
            </td>
        </tr>
    `);
}

function loadingMessage(timerMultiplier){
    let timerInterval
    Swal.fire({
    title: 'Loading',
    html: '',
    timer: timerMultiplier* 10,
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
            
        }
    })
}

function generateSmallCatList(x){
    $('.pop-up-selection').attr("src", "");
    $('.pop-up-selection').css('display', 'none');
    loadingMessage(10000);
    clearData(x);
    changeCssforActive($(x).attr("class"));
    var categoryId = x.id.replace("big-category-list-tr", "");
    categoryId = categoryId.split("_").join(" ");
    $('.product-highlights').css('display','block')
    $('.product-highlights').attr('src',`./product_highlight.html?category=${categoryId}`)
    
    $(".loading-area").css("display", "table");
    getAllSubCategories(categoryId).done(function (response) {
        // alert(response.length);
        
        if(response.length == 0 || response.length == undefined){
            // generateSmallCatList(x);
            loadingMessage(1);
            $('.product-highlights').css('display','none')
            $(".loading-area").css("display", "none");
            Swal.fire("Kami mohon maaf atas ketidaknyamanan ini, tetapi tidak ada subkategori untuk kategori ini", "", "warning");
        }else{
            $(".loading-area").css("display", "none");
            loadingMessage(response.length);
            var product_row = 0;
            for(product_row; product_row < response.length; product_row++){
                generatehomeOneByOne(product_row, response[product_row], response.length);
            }
            if(response.length == 1){
                $(".card").css("max-width", "50%");
            }
        }
    });

}

function replace_vtintl_to_sold_co_id(original_url){
    var original_url = original_url.split("http://image.vtintl.id/").join("https://image.sold.co.id/");
    return original_url;
}

function generatehomeOneByOne(product_row, data, dataLength){
    if(product_row % 2 != 0){
        var product_row = product_row - 1;
        
        // right
        $("#product-highlights" + product_row).append("<th id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card-small-cat\" id=\"product-card-small-cat-right"+ product_row +"\">");
        $("#product-card-small-cat-right" + product_row).append("<div class=\"card product-card-small-cat\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<img onclick=\"unhideProductSelection(this, \'" + data.Subcategory + "\')\" class=\"card-img-top product-card-small-cat-img\" src=\"" + replace_vtintl_to_sold_co_id(data.Picture_1) + "\">");
        $("#card-right" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-right"+ product_row +"\">");
        $("#card-body-right" + product_row).append("<div class=\"card-title product-card-small-cat-text\">" + data.Subcategory );
    }else{
        
        // left
        $("#small-category-list").append("<tr id=\"product-highlights"+ product_row +"\">");
        $("#product-highlights" + product_row).append("<th id=\"left"+ product_row +"\">");
        $("#left" + product_row).append("<div class=\"notification product-card-small-cat\" id=\"product-card-small-cat-left"+ product_row +"\">");
        $("#product-card-small-cat-left" + product_row).append("<div class=\"card product-card-small-cat\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-left" + product_row).append("<img onclick=\"unhideProductSelection(this, \'" + data.Subcategory + "\')\" class=\"card-img-top product-card-small-cat-img\" src=\"" + replace_vtintl_to_sold_co_id(data.Picture_1) + "\">");
        $("#card-left" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-left"+ product_row +"\">");
        $("#card-body-left" + product_row).append("<div class=\"card-title product-card-small-cat-text\">" + data.Subcategory );
    }
}

function unhideProductSelection(x, Subcategory){
    getAllProductsBasedOnSubCategory(Subcategory).done(function (response) {
        $('.pop-up-selection').attr("src", "./sub-category.html?Subcategory=" + Subcategory);
        $('.pop-up-selection').css('display', 'block');
    });
}

function generatehomeOneByOneSubCategorySelection(product_row, data, dataLength){
    if(product_row % 2 != 0){
        var product_row = product_row - 1;
        
        // right
        $("#product-highlights" + product_row).append("<th id=\"right"+ product_row +"\">");
        $("#right" + product_row).append("<div class=\"notification product-card-small-cat\" id=\"product-card-small-cat-right"+ product_row +"\">");
        $("#product-card-small-cat-right" + product_row).append("<div class=\"card product-card-small-cat\" id=\"card-right"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-right" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Subcategory + "\', \'" + data.Subcategory + "\')\" class=\"card-img-top product-card-small-cat-img\" src=\"" + replace_vtintl_to_sold_co_id(data.Picture_1) + "\">");
        $("#card-right" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-right"+ product_row +"\">");
        $("#card-body-right" + product_row).append("<div class=\"card-title product-card-small-cat-text\">" + data.Subcategory );
    }else{
        
        // left
        $("#small-category-list").append("<tr id=\"product-highlights"+ product_row +"\">");
        $("#product-highlights" + product_row).append("<th id=\"left"+ product_row +"\">");
        $("#left" + product_row).append("<div class=\"notification product-card-small-cat\" id=\"product-card-small-cat-left"+ product_row +"\">");
        $("#product-card-small-cat-left" + product_row).append("<div class=\"card product-card-small-cat\" id=\"card-left"+ product_row +"\" style=\"width: 100%;\">");
        $("#card-left" + product_row).append("<img onclick=\"redirectProductDetails(this, \'" + data.Subcategory + "\', \'" + data.Subcategory + "\')\" class=\"card-img-top product-card-small-cat-img\" src=\"" + replace_vtintl_to_sold_co_id(data.Picture_1) + "\">");
        $("#card-left" + product_row).append("<div class=\"card-body small-padding\" id=\"card-body-left"+ product_row +"\">");
        $("#card-body-left" + product_row).append("<div class=\"card-title product-card-small-cat-text\">" + data.Subcategory );
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

function clearData(category){
    $("#small-category-list").empty();
}

function changeCssforActive(category){
    // alert(category);
    $(".big-category-list").removeClass("active-local");
    $("#" + category).addClass("active-local");
}