function solve() {
    return function (selector) {
        var $dropdown = $('<div />').addClass('dropdown-list');

        var $select = $(selector);
        $select.css('display', 'none')
            .appendTo($dropdown);

        var $current = $('<div />').addClass('current')
            .attr('data-value', '')
            .text('Select a value')
            .appendTo($dropdown);

        var $container = $('<div />').addClass('options-container')
            .css({'position': 'absolute', 'display': 'none'});
        $container.appendTo($dropdown);

        $dropdown.prependTo(document.body);
        $dropdown.before($('h1'));

        var $options = $select.children('option');

        for (var i = 0, len = $options.length; i < len; i++) {
            var $currentOption = $($options[i]);
            var $optionsDiv = $('<div />').addClass('dropdown-item')
                .attr('data-index', i)
                .attr('data-value', $currentOption.val())
                .text($currentOption.text())
                .appendTo($container);
        }

         $current.on('click', function () {
            if ($container.css('display') === 'none') {
                $container.show();
            }
            else {
                $container.hide();
            }
        });

        $container.on('click', '.dropdown-item', function () {
            var $this = $(this);
            $current.attr('data-value', $this.attr('data-value'))
                .text($this.text());
            $select.val($this.attr('data-value'));
            $container.hide();
        });
    };
}

module.exports = solve;
