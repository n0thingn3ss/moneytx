console.log('send-money.js');

var smForm = document.querySelector('#send-money-form');
var clr = document.querySelector('#clr');
var next = document.querySelector('#next');
var loading = document.querySelector('#loading');

var currencySymbol = document.querySelector('#currency-symbol');
var currencySelector = smForm && smForm['currency-selector'];
var SYM_MAP = {
    usd: '$',
    eur: '€',
    jpy: '¥'
}

if (currencySelector && currencySymbol) {
    currencySelector.addEventListener('change', function updateCurrencySymbol(e) {
        var target = e.target;
        if (target.selectedIndex >= 0) {
            currencySymbol.innerHTML = SYM_MAP[target.options[target.selectedIndex].value];
        }
    });
}

clr.addEventListener('click', function clrForm(e) {
    smForm.reset();
    currencySymbol.innerHTML = SYM_MAP['usd'];
});

function postTransaction(e) {
    if (smForm.email.checkValidity()
        && smForm.amount.checkValidity()
        && smForm.name.checkValidity()) {

        loading.style.display = 'block';

        var xhrMoneyPost = new XMLHttpRequest();
        xhrMoneyPost.open('post', '/send-money');
        xhrMoneyPost.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhrMoneyPost.send('email=' + smForm.email.value +
            '&name=' + smForm.name.value +
            '$currency=' + currencySelector.options[currencySelector.selectedIndex].value +
            '&msg=' + smForm.msg.value +
            '&reason=' + smForm.reason.options[smForm.reason.selectedIndex].value);

        xhrMoneyPost.onreadystatechange = function() {
            if (xhrMoneyPost.readyState == 4) {
                loading.style.display = 'none';

                if(xhrMoneyPost.status == 200) {
                    console.dir(JSON.parse(xhrMoneyPost.responseText));
                    document.querySelector('#content').innerHTML='Done';
                    document.querySelector('footer').innerHTML='';
                } else {

                    console.log('req failed');
                }
            }
        }
    }
}

next.addEventListener('click', postTransaction);

