$(document).ready(function(){
    populateDeliveryTable();
});

var counter = 0;
function populateDeliveryTable(){
    console.log(localStorage.getItem("token"));
    getAllOrdersForThisCustomer(localStorage.getItem("token"), "").done(function (response) {
        console.log(response);
        if(response.length == 0){
            $(".loading-area").css("display", "none");
        }else{
            console.log(response);
            loadingMessage(response.length);
            var i = 0;
            $(".loading-area").css("display", "none");
            for(i ; i < response.length; i++){
                generateRowsDelivery(i, response[i]);
            }   
        }
    });
}

function generateRowsDelivery(i, datas){
    datas.Update_date = datas.Update_date.split("T");
    var payment = "not paid";
    if(datas.Payment_Status.toUpperCase() == "payment".toUpperCase()){
        payment = "paid";
    }else if(datas.Payment_Status.toUpperCase() == "cancelled".toUpperCase()){
        payment = "revoked";
    }
    if(datas.Payment_Status.toUpperCase() == 'PAYMENT'.toUpperCase() && datas.Status.toUpperCase() == 'APPROVING'.toUpperCase()){
        $(`.table-delivery-order-new`).append(`
            <div class="product-in-card" id="${datas.Order_Number}">
                <div class="card-body">
                    <div class="product-details">
                        <a class="view-details" onclick="orderDetailRequest('${datas.Order_Number}')">View details</a>
                        <label>DATE</label>
                        <div class="card-text product-in-card-name">${datas.Update_date[0]}</div>
                        <label>ORDER NUMBER</label>
                        <div class="card-text product-in-card-name order-number" onclick="orderDetailRequest('${datas.Order_Number}')">${datas.Order_Number}</div>
                        <label>PAYMENT TERM</label>
                        <div class="card-text product-in-card-name">${datas.Payment_Method}</div>
                        <label>PAYMENT STATUS</label>
                        <div class="card-text product-in-card-name">${payment}</div>
                        <label>TOTAL AMOUNT</label>
                        <div class="card-text product-in-card-name">${datas.Total_Price}</div>
                        <div class="card-text product-in-card-name">
                            <div class="cancel-body-table">Order telah di proses</div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }else if(datas.Status.toUpperCase() != 'cancelled'.toUpperCase()){
        $(`.table-delivery-order-new`).append(`
            <div class="product-in-card" id="${datas.Order_Number}">
                <div class="card-body">
                    <div class="product-details">
                        <a class="view-details" onclick="orderDetailRequest('${datas.Order_Number}')">View details</a>
                        <label>DATE</label>
                        <div class="card-text product-in-card-name">${datas.Update_date[0]}</div>
                        <label>ORDER NUMBER</label>
                        <div class="card-text product-in-card-name order-number" onclick="orderDetailRequest('${datas.Order_Number}')">${datas.Order_Number}</div>
                        <label>PAYMENT TERM</label>
                        <div class="card-text product-in-card-name">${datas.Payment_Method}</div>
                        <label>PAYMENT STATUS</label>
                        <div class="card-text product-in-card-name">${payment}</div>
                        <label>TOTAL AMOUNT</label>
                        <div class="card-text product-in-card-name">${datas.Total_Price}</div>
                        <div class="card-text product-in-card-name">
                            <div class="cancel-body-table" onclick="cancelOrderRequest('${datas.Order_Number}')">Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }else{
        $(`.table-delivery-order-new`).append(`
            <div class="product-in-card" id="${datas.Order_Number}">
                <div class="card-body">
                    <div class="product-details">
                        <a class="view-details" onclick="orderDetailRequest('${datas.Order_Number}')">View details</a>
                        <label>DATE</label>
                        <div class="card-text product-in-card-name">${datas.Update_date[0]}</div>
                        <label>ORDER NUMBER</label>
                        <div class="card-text product-in-card-name order-number" onclick="orderDetailRequest('${datas.Order_Number}')">${datas.Order_Number}</div>
                        <label>PAYMENT TERM</label>
                        <div class="card-text product-in-card-name">${datas.Payment_Method}</div>
                        <label>PAYMENT STATUS</label>
                        <div class="card-text product-in-card-name">${payment}</div>
                        <label>TOTAL AMOUNT</label>
                        <div class="card-text product-in-card-name">${datas.Total_Price}</div>
                        <div class="card-text product-in-card-name">
                            <div class="cancel-body-table">Order Telah di Cancelled</div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
    if(payment == "not paid"){
        $(`#${datas.Order_Number}`).css("background-color", "darkred");
    }
}

function orderDetailRequest(orderNumber){
    $(".loading-area").css("display", "table");
    getAllOrdersForThisCustomer("", orderNumber).done(function (response) {
            if(response.length == 0){
                $(".loading-area").css("display", "none");
            }else{
                console.log(response);
                loadingMessage(response.length);
                var i = 0;
                for(i ; i < response.length; i++){
                    if(response[i].Order_Number == orderNumber){
                        window.location.href = "./delivery.html?status=" + JSON.stringify(response[i]) + "&orderNumber=" + response[i].Order_Number;
                    }else{
                        $(".loading-area").css("display", "none");
                        Swal.fire("Data is not available at the moment", "Please try again later", "warning");
                    }
                }
            }
    });
}

function loadingMessage(timer){
    let timerInterval
    Swal.fire({
    title: 'Memproses permintaan Anda',
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
            console.log('I was closed by the timer')
        }
    })
}

function cancelOrderRequest(orderNumber){
    cancelSalesOrder(orderNumber).done(function (response) {
        if(response){
            Swal.fire("Cancelled", "", "success");
            location.href = "./delivery_order_list.html";
        }else{
            Swal.fire("Failed", "", "warning");
        }
    });
}