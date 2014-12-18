

var tablica = [];
function tabela(rows, obj) {

    var array = obj.results;
    if (rows !== 0) {
        document.getElementById("tabela-body").innerHTML = '';
        for (var i = 0; i < array.length; i += 1) {
            document.getElementById("tabela-body").innerHTML += '<tr><td>' + array[i].id + '</td><td>' + array[i].name + '</td><td>' + array[i].quant + '</td></tr>'
        }
    }
}


function sortBy(name, dir) {


    var x = document.getElementsByClassName("sort active");
    y = $("input").val();

    if (x[0] == undefined) {

        document.getElementById(name).className = "sort active";
        document.getElementById(name).setAttribute("onclick", "sortBy(this.id,-1)");
    }
    else {
        if (name == x[0].id) {
            if (document.getElementById(name).className == "sort active rev") {
                document.getElementById(name).className = "sort active";
                document.getElementById(name).setAttribute("onclick", "sortBy(this.id,-1)");
            }
            else {
                document.getElementById(name).className = "sort active rev";
                document.getElementById(name).setAttribute("onclick", "sortBy(this.id,1)");
            }
        }
        else {
            x[0].onclick = function () {
                sortBy(this.id, 1)
            };
            x[0].className = "sort";
            document.getElementById(name).className = "sort active";
            document.getElementById(name).setAttribute("onclick", "sortBy(this.id,-1)");

        }


    }
    pagination(req(10, name, dir, y, 1));
}

function filterData(bywhat) {


    var x = document.getElementsByClassName("sort");
    _.each(x, function (obj) {
        return obj.className = "sort";
    });
    _.each(x, function (obj) {
        return obj.setAttribute("onclick", "sortBy(this.id,1)");
    });
    pagination(req(10, 'name', 1, bywhat, 1));

}

function pagination(obj) {
    $(".spinner").css('visibility','visible');
    if (obj) {

        tabela(10, obj);
        if (obj.filter == undefined) {
            filter = ""
        }
        else {
            filter = obj.filter
        }
        document.getElementById("pages").innerHTML = '';
        for (var n = 1; n <= obj.pages; n += 1) {
            if (obj.page == n) {
                document.getElementById("pages").innerHTML += '<a href="#" class="current" onclick="tabela(10,req(10,\'' + obj.sort + '\',' + obj.dir + ',\'' + filter + '\',' + n + '))">' + n + '</a> ';
            }
            else {
                document.getElementById("pages").innerHTML += '<a href="#" onclick="tabela(10,req(10,\'' + obj.sort + '\',' + obj.dir + ',\'' + filter + '\',' + n + '))">' + n + '</a> ';
            }
        }
    }
}

var delay = (function () {
    var czas = 0;
    return function (fun, tim) {
        clearTimeout(czas);
        czas = setTimeout(fun, tim);
    };
})();


$(document).ready(function () {

    pagination(req(10, 'id', 1, '', 1));
    $("input").keyup(function () {

        delay(function () {
            x = $("input").val();

            filterData(x);
        }, 400);
    });
});

var knock = {
    cache: null,
    get: function (count, sort, dir, filter, page) {

        var request = BACKEND.get(count, sort, dir, filter, page)
        var deferred = $.Deferred();

        if (knock.cache &&
            (request.state() === "pending")
        ) {
            deferred.notify(knock.cache);
        }
        request.then(
            function (response) {
                knock.cache = response;
                deferred.resolve(response);
            },
            deferred.reject
        );
        return ( deferred.promise() );
    }


};


function req(count, sort, dir, filter, page) {

    var request = knock.get(count, sort, dir, filter, page).then(
        function (response) {
            pagination(response)
           $(".spinner").css('visibility','hidden');

        },
        function (error) {
            alert("Cos poszlo nie tak!")
        },
        function (cache) {
            pagination(cache)

        }
    );
}










