/* globals $ */

/* 

 Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:
 * The UL must have a class `items-list`
 * Each of the LIs must:
 * have a class `list-item`
 * content "List item #INDEX"
 * The indices are zero-based
 * If the provided selector does not selects anything, do nothing
 * Throws if
 * COUNT is a `Number`, but is less than 1
 * COUNT is **missing**, or **not convertible** to `Number`
 * _Example:_
 * Valid COUNT values:
 * 1, 2, 3, '1', '4', '1123'
 * Invalid COUNT values:
 * '123px' 'John', {}, []
 */

function solve() {
    return function (selector, count) {
        if (!selector || $.type(selector) !== 'string') {
            throw Error('You did not provide a valid selector as a first argument!');
        }
        if (count < 1) {
            throw Error('Count must be 1 or greater!')
        }
        if (!count) {
            throw Error('You need to provide a second argument, count, that is a number!');
        }
        if (!Number(count)) {
            throw Error('You did not provide a valid number as a second argument!');
        }

        var $selector = $(selector);


        var $list = $('<ul />');
        $list.addClass('items-list');

        for (var i = 0; i < count; i++) {
            var $li = $('<li />');
            $li.addClass('list-item')
                .text('List item #' + i);
            $list.append($li);
        }

        $selector.append($list);

    };
};

module.exports = solve;