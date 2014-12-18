var BACKEND = (function (my) {

    my.feedData = function (count, sort, dir, filter, page) {


        var db = [];
        db.push(
            {id: 1, name: "Amidate", quant: 49},
            {id: 2, name: "Nafcillin", quant: 95},
            {id: 3, name: "Achromycin V", quant: 73},
            {id: 4, name: "ANTARA", quant: 93},
            {id: 5, name: "Multi-Vitamin Fluoride Drops", quant: 61},
            {id: 6, name: "Benzonatate", quant: 49},
            {id: 7, name: "California Valley White Oak", quant: 6},
            {id: 8, name: "Magnesium Sulfate in Dextrose", quant: 97},
            {id: 9, name: "equaline pain relief pm", quant: 8},
            {id: 10, name: "careone nicotine polacrilex", quant: 84},
            {id: 11, name: "Hand Sanitizer", quant: 87},
            {id: 12, name: "Clario Free Foaming Hand Sanitizer", quant: 66},
            {id: 13, name: "ZOMIG", quant: 98},
            {id: 14, name: "UP and UP", quant: 22},
            {id: 15, name: "SULPHUR", quant: 43},
            {id: 16, name: "extra strength", quant: 58},
            {id: 17, name: "Doxycycline Hyclate", quant: 86},
            {id: 18, name: "Carvedilol", quant: 79},
            {id: 19, name: "BEEVENOM PACT", quant: 33},
            {id: 20, name: "METFORMIN HYDROCHLORIDE", quant: 42},
            {id: 21, name: "Extra Strength Acetaminophen PM", quant: 10},
            {id: 22, name: "Motion Sickness", quant: 82},
            {id: 23, name: "NICARdipine Hydrochloride", quant: 83},
            {id: 24, name: "Atenolol", quant: 90},
            {id: 25, name: "Isopropyl alcohol", quant: 70},
            {id: 26, name: "sunmark ibuprofen ib", quant: 28},
            {id: 27, name: "healthy accents sore throat", quant: 58},
            {id: 28, name: "Topcare infants pain relief", quant: 73},
            {id: 29, name: "Neosporin Lip Health", quant: 60},
            {id: 30, name: "Dopamine HCl", quant: 81},
            {id: 31, name: "ELF Tinted Moisturizer SPF 20", quant: 57},
            {id: 32, name: "Clonazepam", quant: 58},
            {id: 33, name: "Boy Butter", quant: 93},
            {id: 34, name: "Loperamide Hydrochloride", quant: 9},
            {id: 35, name: "Total Bromine", quant: 51});

        if (filter == undefined) {
            filter = "";
        }

        if (page > 1) {
            var ceiling = page * count;
            var floor = ceiling - count;
        }

        if (dir == "1") {
            if (sort == 'name') {

                var sorted = _.sortBy(db, function (obj) {
                    return obj[sort].toLowerCase();
                });
                var filtered = _.filter(sorted, function (obj) {
                    return ~obj.name.toLowerCase().indexOf(filter);
                })
            }

            else {
                var sorted = _.sortBy(db, function (obj) {
                    return obj[sort]
                });
                var filtered = _.filter(sorted, function (obj) {
                    return ~obj.name.toLowerCase().indexOf(filter);
                })
            }


            if (page == 1) {
                arr = _.first(filtered, count)
            }
            else {
                arr = filtered.slice(floor, ceiling);
            }
            if (_.size(filtered) < 11) {
                var pag = 0;
            }
            else {
                var pag = Math.round(_.size(filtered) / count);
            }
            return {
                pages: pag,
                page: page,
                count: count,
                sort: sort,
                dir: dir,
                filter: filter,
                results: arr
            }
        }

        else {

            if (sort == 'name') {
                var sorted = _.sortBy(db, function (obj) {
                    return obj[sort].toLowerCase();
                }).reverse();
                var filtered = _.filter(sorted, function (obj) {
                    return ~obj.name.toLowerCase().indexOf(filter);
                })
            }

            else {
                var sorted = _.sortBy(db, function (obj) {
                    return obj[sort]
                }).reverse();
                var filtered = _.filter(sorted, function (obj) {
                    return ~obj.name.toLowerCase().indexOf(filter);
                })
            }

            if (page == 1) {
                arr = _.first(filtered, count)
            }
            else {
                arr = filtered.slice(floor, ceiling);
            }
            if (_.size(filtered) < 11) {
                var pag = 0;
            }
            else {
                var pag = Math.round(_.size(filtered) / count);
            }
            return {
                pages: pag,
                page: page,
                count: count,
                sort: sort,
                dir: dir,
                filter: filter,
                results: arr
            }
        }
    },

        my.get = function (count, sort, dir, filter, page) {
            var deffered = $.Deferred();
            setTimeout(
                function () {

                    deffered.resolve(BACKEND.feedData(count, sort, dir, filter, page))
                }, 1000, count, sort, dir, filter, page);
            return (deffered.promise());
        }

    return my;

}(BACKEND || {}));