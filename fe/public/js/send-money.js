console.log('send-money.js');

var smForm = document.querySelector('#send-money-form');
var clrEl = document.querySelector('#clr');
var nextEl = document.querySelector('#next');
var loadingEl = document.querySelector('#loading');
var amtEl = smForm && smForm.amount || false;

var currencySymbolEl = document.querySelector('#currency-symbol');
var currencySelectorEl = smForm && smForm['currency-selector'] || false;

var SYM_MAP = {
    usd: '$',
    eur: '€',
    jpy: '¥'
}

if (currencySelectorEl && currencySymbolEl) {
    currencySelectorEl.addEventListener('change', function updateCurrencySymbol(e) {
        var target = e.target;
        if (target.selectedIndex >= 0) {
            currencySymbolEl.innerHTML = SYM_MAP[target.options[target.selectedIndex].value];
        }
    });
}

if (amtEl) {
    amtEl.addEventListener('focus', function(e) {
        e.target.value = e.target.value.replace(',', '');
    });

    amtEl.addEventListener('focusout', function (e) {
        var amt = Number.parseFloat(e.target.value);
        e.target.value = amt > 0 && Number(amt).toLocaleString('en-US') || '';
    });
}

clrEl.addEventListener('click', function clrForm(e) {
    smForm.reset();
    currencySymbolEl.innerHTML = SYM_MAP['usd'];
});

function postTransaction(e) {
    var amt = Number.parseFloat(amtEl.value.replace(',', ''));

    if (smForm.email.checkValidity()
        && smForm.name.checkValidity()
        && amt > 0) {

        loadingEl.style.display = 'block';

        var xhrMoneyPost = new XMLHttpRequest();
        xhrMoneyPost.open('post', '/send-money');
        xhrMoneyPost.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhrMoneyPost.send('email=' + smForm.email.value +
            '&name=' + smForm.name.value +
            '$currency=' + currencySelectorEl.options[currencySelectorEl.selectedIndex].value +
            '&msg=' + smForm.msg.value +
            '&reason=' + smForm.reason.options[smForm.reason.selectedIndex].value);

        xhrMoneyPost.onreadystatechange = function() {
            if (xhrMoneyPost.readyState == 4) {
                loadingEl.style.display = 'none';

                if(xhrMoneyPost.status == 200) {
                    document.querySelector('#content').innerHTML =
                        'You have sent ' + Number(amt).toLocaleString('en-US') +
                        ' ' + currencySelectorEl.options[currencySelectorEl.selectedIndex].innerHTML +
                        ' to ' + smForm.name.value;
                    document.querySelector('footer').innerHTML =
                        "<a href='/send-money'>Send Money</a><a href='/view-transactions'>Transaction History</a>";
                } else {
                    console.log('xhr request failed');
                }
            }
        }
    }
}

nextEl.addEventListener('click', postTransaction);

