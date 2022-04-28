var toggle = true
var img = [
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/66.png',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/66-small.png',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/75.png',
    'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/75-small.png',
]
preload(img)

$(window).scroll(function (event) {
    handleNav()


});

$(window).resize( function() {
});

$(document).ready( function() {
    fillLink()
    $(document).foundation();
    handleNav()

    $('.switch-input').click(function () {
        handleSwitch()
        handleCalculette()
    })

    $('#bt-temoignage').click(function () {
        $(this).hide()
        $('#seminariste .left p.quote span:nth-child(4)').show()
        if ($(window).width() < 640) $('#seminariste .left').css('min-height', '825px')
        $('#seminariste .left p.quote span:nth-child(3)').hide()
    })

    $('#amount-don-input, #amount-impot').on('keypress', function (event) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    });

    $('#amount-don-input').on('input', function() {
        var input = $('#amount-don-input')
        var value = input.val()

        if (value.charAt(0) === '0')
            input.val(value.substring(1, value.length))
        if ($('#amount-don-input').val() === '')
            $('#amount-don-input').val(0)

        $('#amount-btn').text($('#amount-don-input').val())

        if ($('#amount-impot').val() !== '' && $('#amount-don-input').val() !== '')
            handleCalculette()
    });

    $('#amount-impot').on('input', function() {
        var input = $('#amount-impot')
        var value = input.val()

        if (value.charAt(0) === '0')
            input.val(value.substring(1, value.length))
        if ($('#amount-impot').val() === '')
            $('#amount-impot').val(0)

        if ($('#amount-impot').val() !== '' && $('#amount-don-input').val() !== '')
            handleCalculette()
    });

    $('#btn-don-form').click(function () {
        fillLink()
    })

});

function handleNav() {
    var scroll = $(window).scrollTop();

    if (scroll > 0) {
        $('#nav').addClass('fixed')
    }
    else {
        $('#nav').removeClass('fixed')
    }
}

function handleSwitch() {
    $('.switch-input').each(function (el) {
        $('.switch-input').eq(el).prop( "checked", toggle );
    })


    if (toggle) { // IR
        toggle = false
        $('.display-type-info').each(function (el) {
            $('.display-type-info').eq(el).text('IR')
        })
        $('.link-don').each(function (el) {
            $('.link-don').eq(el).attr('href', 'https://soutenir.mavocation.org/soutenir-3/fill?engagement=don_simple&montant=120')
        })
        if ($(window).width() > 640)
            $('#img-amount-deduction').attr('src', 'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/75.png')
        else
            $('#img-amount-deduction-small').attr('src', 'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/75-small.png')
        $('#text-deduction').text('Vous pouvez déduire de votre impôt sur le revenu 75% dans la limite de 562€, puis 66% du montant de votre don au-delà de 562€, dans la limite de 20% de votre revenu imposable. Le surplus étant reportable 5 ans.')

        $('.switch p:nth-child(3)').css('color', 'rgba(0,0,0,0.5)')
        $('.switch p:nth-child(4)').css('color', 'rgba(205,139,0,1)')

    }
    else { // IFI
        toggle = true
        $('.display-type-info').each(function (el) {
            $('.display-type-info').eq(el).text('IFI')
        })

        $('.link-don').each(function (el) {
            $('.link-don').eq(el).attr('href', 'https://soutenir.fondationduclerge.com/?reserved_affectations=8026')
        })

        if ($(window).width() > 640)
            $('#img-amount-deduction').attr('src', 'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/75.png')
        else
            $('#img-amount-deduction-small').attr('src', 'https://adfinitas-statics-cdn.s3.eu-west-3.amazonaws.com/ODV/odv-lp20/75-small.png')
        $('#text-deduction').text('Grâce à un partenariat entre l’Œuvre des Vocations et la Fondation Nationale pour le Clergé, habilitée à recevoir des dons déductibles de l’IFI, vous pouvez faire un don à l’Œuvre des Vocations et déduire 75% de son montant de votre IFI dans la limite maximale de 50 000 € par an (soit un don de 66 667 €). Pour aider les futurs prêtres tout en réduisant le montant de votre IFI, vous pouvez faire dès aujourd’hui votre don IFI à l’Œuvre des Vocations.')
        $('.switch p:nth-child(3)').css('color', 'rgba(205,139,0,1)')
        $('.switch p:nth-child(4)').css('color', 'rgba(0,0,0,0.5)')

    }
}


function handleCalculette() {
    var input = $('#amount-don-input')
    var value = input.val().replace(' ', '')
    input.val(value)

    var inputImpot = $('#amount-impot')
    var valueImpot = inputImpot.val().replace(' ', '')
    inputImpot.val(valueImpot)

    var valueDeduction
    var valueAfterImpot
    var jalon

    if (toggle) { // IFI
        jalon = 50000
        valueDeduction = value * 0.75

        if (valueDeduction > jalon)
            valueDeduction = jalon

    }
    else { // IR
        jalon = 562

        if (value > jalon) {
            valueDeduction = (jalon * 0.75) + ((value - jalon) * 0.66)
        } else {
            valueDeduction = value * 0.75
        }

        if (valueDeduction > (valueImpot * 0.20))
            valueDeduction = valueImpot * 0.20
    }

    valueAfterImpot = valueImpot - valueDeduction

    $('#deduction-don').val(valueDeduction % 1 === 0 ? valueDeduction : valueDeduction.toFixed(2))

    if (valueAfterImpot < 0)
        $('#after-deduction-don').val(0)
    else
        $('#after-deduction-don').val(valueAfterImpot % 1 === 0 ? valueAfterImpot : valueAfterImpot.toFixed(2))

    if (toggle) { // IFI
        $('#btn-don-form').attr('href', 'https://soutenir.fondationduclerge.com/?reserved_affectations=8026' + '&amount=' + value + '00');
    } else { // IR
        $('#btn-don-form').attr('href', 'https://soutenir.mavocation.org/soutenir-3/fill?engagement=don_simple' + '&montant=' + value)
    }
}

function 	scrollTo(next){
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

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}