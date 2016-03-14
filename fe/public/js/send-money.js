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

        var xhrTodoPost = new XMLHttpRequest();
        xhrTodoPost.open('post', '/send-money');
        xhrTodoPost.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhrTodoPost.send('email=' + smForm.email.value +
            '&name=' + smForm.name.value +
            '$currency=' + currencySelector.options[currencySelector.selectedIndex].value +
            '&msg=' + smForm.msg.value +
            '&reason=' + smForm.reason.options[smForm.reason.selectedIndex].value);

        xhrTodoPost.onreadystatechange = function() {
            if (xhrTodoPost.readyState == 4 && xhrTodoPost.status==200) {
                console.log(xhrTodoPost.responseText);
                loading.style.display = 'none';
                document.querySelector('#content').innerHTML='Done';
                document.querySelector('footer').innerHTML='';
            }
        }
    }
}

next.addEventListener('click', postTransaction);

