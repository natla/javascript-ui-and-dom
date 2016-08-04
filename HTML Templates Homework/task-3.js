/* globals $ */
function solve() {
    return function() {
        $.fn.listview = function (data) {
            var key,
                item,
                $selected = this,
                elementId = $selected.attr('data-template'),
                $bookItemTemplate = $('#' + elementId).html(),
                template = handlebars.compile($bookItemTemplate);

            for (key in data) {
                item = data[key];
                $selected.append(template(item));
            }
            return $selected;
        };
    };
}

module.exports = solve;
