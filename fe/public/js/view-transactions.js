var initialized = false;
var b = 1;
var n = 25;

var loadingEl = document.querySelector('#loading');
var tlEl = document.querySelector('#transaction-list');

window.addEventListener('scroll', function(e) {
    var scrollPos = window.pageYOffset;
    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;

    if (pageHeight - (scrollPos + clientHeight) < 10 && !initialized) {
        initialized = true;
        loadingEl.style.display = 'block';
        fetchTransaction(e);
    }
});

function fetchTransaction(e) {
    var xhrfetchTransactions = new XMLHttpRequest();
    b = b + n;
    xhrfetchTransactions.open('get', 'http://localhost:4080/transactions?b=' + b + '&n=25', true);
    xhrfetchTransactions.send();

    xhrfetchTransactions.onreadystatechange = function() {
        if (xhrfetchTransactions.readyState == 4) {
            initialized = false;
            if(xhrfetchTransactions.status == 200) {
                var data = JSON.parse(xhrfetchTransactions.responseText);
                if (data.transactions && data.transactions.length) {
                    data.transactions.forEach(function renderItem(t) {
                        var item = document.createElement('li');
                        item.setAttribute('data-tid', t.id);
                        item.innerHTML = '<span>' + t.date + '</span>' +
                            '<span>' + t.name + '</span>' +
                            '<span>' + t.amount.value + '</span>';
                        tlEl.appendChild(item);
                    });
                }
                loadingEl.style.display = 'none';
            } else {
                console.log('xhr request failed');
            }
        }
    };
}