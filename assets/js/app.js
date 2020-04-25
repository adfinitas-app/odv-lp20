
$(window).scroll(function() {

});

$(window).resize( function() {
});

$(document).ready( function() {

});

function 	scrollToNext(next){
    $('#open-menu').show()
    $('#menu-mobile').hide()

    $('html, body').stop().animate({
        scrollTop: $(window).width() > 640 ? $(next).offset().top - 44 : $(next).offset().top - 0
    }, 700, 'swing');
}

function fillLink() {
    let p = extractUrlParams();
    let string = ''


    if (p['email'] && p['email'] !== "undefined")
        string += ("&email=" + p['email']);
    if (p['wv_email'] && p['wv_email'] !== "undefined")
        string += ("&email=" + p['wv_email']);
    if (p['wv_firstname'] && p['wv_firstname'] !== "undefined")
        string += ("&firstname=" + p['wv_firstname']);
    if (p['firstname'] && p['firstname'] !== "undefined")
        string += ("&firstname=" + p['firstname']);
    if (p['wv_lastname'] && p['wv_lastname'] !== "undefined")
        string += ("&lastname=" + p['wv_lastname']);
    if (p['lastname'] && p['lastname'] !== "undefined")
        string += ("&lastname=" + p['lastname']);
    if (p['reserved_code_media'] && p['reserved_code_media'] !== "undefined")
        string += ("&reserved_code_media=" + p['reserved_code_media']);
    if (p['utm_campaign'] && p['utm_campaign'] !== "undefined")
        string += ("&utm_campaign=" + p['utm_campaign']);
    if (p['utm_source'] && p['utm_source'] !== "undefined")
        string += ("&utm_source=" + p['utm_source']);
    if (p['utm_medium'] && p['utm_medium'] !== "undefined")
        string += ("&utm_medium=" + p['utm_medium']);

    $('.link-don').each(function (el) {
        $('.link-don').eq(el).attr('href', $('.link-don').eq(el).attr('href') + string)
    })


}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};
