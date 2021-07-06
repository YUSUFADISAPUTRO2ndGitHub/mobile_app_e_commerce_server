const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/adjustment_display.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/index.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/home.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/home.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/brand_list.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/brand_list.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/cart.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/cart.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/category.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/category.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/checkout-in-store.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/checkout-in-store.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/checkout.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/checkout.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/complain_request.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/complain_request.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/contact_us_now.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/contact_us_now.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/contact.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/contact.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/delivery_order_list.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/delivery_order_list.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/delivery.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/delivery.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/forgot-password.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/forgot-password.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/product_details.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/product_details.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/product_scanner.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/product_scanner.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/profile-account.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/profile-account.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/search_results.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/search_results.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/sign-in.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/sign-in.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/sign-up-supplier.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/sign-up-supplier.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/sign-up.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/sign-up.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/splash-screen-1.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/splash-screen-1.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/sub-category.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/sub-category.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/unpaidOrderDetails.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/unpaidOrderDetails.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/unpaidOrders.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/unpaidOrders.html'));
    //__dirname : It will resolve to your project folder.
});


/* 
    JavaScript
*/

router.get('/www/js/accessingAccurateAPIsGroup1.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/accessingAccurateAPIsGroup1.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/app_version_checks.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/app_version_checks.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/autoCheckUnpaidOrders.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/autoCheckUnpaidOrders.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/autoSlides.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/autoSlides.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/bootstrapJS.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/bootstrapJS.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/brand_list.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/brand_list.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/cart.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/cart.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/chat.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/chat.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/checkout.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/checkout.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/delivery_status.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/delivery_status.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/delivery.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/delivery.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/expressCheckout.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/expressCheckout.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/floatingAddToCart.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/floatingAddToCart.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/generate-category.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/generate-category.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/generate-list-home.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/generate-list-home.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/generate-list-search.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/generate-list-search.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/generate-sub-category.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/generate-sub-category.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/inputChecker.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/inputChecker.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/jquery-3_5_1.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/jquery-3_5_1.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/loading_alert.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/loading_alert.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/login_action.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/login_action.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/MenuIconAnimation.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/MenuIconAnimation.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/navigation.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/navigation.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/product_details.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/product_details.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/qrCodeScanner.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/qrCodeScanner.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/qrReader.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/qrReader.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/sweetalert.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/sweetalert.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/time.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/time.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/unpaidOrderDetails.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/unpaidOrderDetails.js'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/js/unpaidOrders.js',function(req,res){
    res.sendFile(path.join(__dirname+'/www/js/unpaidOrders.js'));
    //__dirname : It will resolve to your project folder.
});

/* 
    css
*/

router.get('/www/css/bootstrap.css',function(req,res){
    res.sendFile(path.join(__dirname+'/www/css/bootstrap.css'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/css/autoSlides.css',function(req,res){
    res.sendFile(path.join(__dirname+'/www/css/autoSlides.css'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/css/home_css_desktop_screen.css',function(req,res){
    res.sendFile(path.join(__dirname+'/www/css/home_css_desktop_screen.css'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/css/style.css',function(req,res){
    res.sendFile(path.join(__dirname+'/www/css/style.css'));
    //__dirname : It will resolve to your project folder.
});

router.get('/mobile_browser_adjustment.css',function(req,res){
    res.sendFile(path.join(__dirname+'/mobile_browser_adjustment.css'));
    //__dirname : It will resolve to your project folder.
});

/* 
    img
*/

router.get('/www/img/Additional_icons/accounts.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/accounts.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/arrow.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/arrow.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/bank.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/bank.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/bca.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/bca.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/blocks.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/blocks.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/brand.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/brand.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/cart.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/cart.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/categories.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/categories.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/home.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/home.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/liked.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/liked.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/login.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/login.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/mind_blown.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/mind_blown.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/new.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/new.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/not_liked.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/not_liked.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/price-tags.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/price-tags.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/qr-scan-icon.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/qr-scan-icon.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/qr-scan.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/qr-scan.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/sale.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/sale.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/search.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/search.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/shopping-cart.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/shopping-cart.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/star.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/star.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/transfer_payment.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/transfer_payment.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/truck.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/truck.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/view.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/view.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/voucher.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/voucher.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Additional_icons/whatsapp.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Additional_icons/whatsapp.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/ADS_SLIDES/1.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/ADS_SLIDES/1.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/ADS_SLIDES/2.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/ADS_SLIDES/2.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/ADS_SLIDES/3.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/ADS_SLIDES/3.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/ADS_SLIDES/vantsing_id_nametag.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/ADS_SLIDES/vantsing_id_nametag.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/ADS_SLIDES/videoplayback.mp4',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/ADS_SLIDES/videoplayback.mp4'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/ADS_SLIDES/ads.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/ADS_SLIDES/ads.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Brand/brand1.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Brand/brand1.jpg'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Brand/brand2.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Brand/brand2.jpg'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Brand/brand3.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Brand/brand3.jpg'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Brand/brand4.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Brand/brand4.jpg'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Brand/brand5.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Brand/brand5.jpg'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/Brand/brand6.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/Brand/brand6.jpg'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/background.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/background.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/CATEGORY_ICONS/customer-service.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/CATEGORY_ICONS/customer-service.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/SAMPLE/terms.jpg',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/SAMPLE/terms.jpg'));
    //__dirname : It will resolve to your project folder.
});

router.get('/www/img/about_page.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/about_page.png'));
    //__dirname : It will resolve to your project folder.
});
router.get('/img/bca_account_number.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/bca_account_number.png'));
    //__dirname : It will resolve to your project folder.
});
router.get('/img/kementrian_perdagangan.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/img/kementrian_perdagangan.png'));
    //__dirname : It will resolve to your project folder.
});

/*
    rating stars
*/

router.get('/rating-stars/index.html',function(req,res){
    res.sendFile(path.join(__dirname+'/www/rating-stars/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/rating-stars/star.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/rating-stars/star.png'));
    //__dirname : It will resolve to your project folder.
});

router.get('/rating-stars/star_empty.png',function(req,res){
    res.sendFile(path.join(__dirname+'/www/rating-stars/star_empty.png'));
    //__dirname : It will resolve to your project folder.
});

app.use('/', router);



app.use(function(req, res) {
    res.sendFile(path.join(__dirname+'/www/img/notfound.png'));
});
app.listen(3044);