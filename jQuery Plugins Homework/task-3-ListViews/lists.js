$.fn.lists = function (lists) {
    var $container = this;

    var $listDiv = $('<div />').addClass('list-div'),
        $ul = $('<ul />'),
        $li = $('<li />').attr('draggable', true),
        $heading = $('<h3 />'),
        $link = $('<a />'),
        $button = $('<button />'),
        $input = $('<input />').attr('type', 'text');

    for (var i = 0, len = lists.length; i < len; i += 1) {
        var list = lists[i],
            $currentListDiv = $listDiv.clone(true),
            $currentUl = $ul.clone(true),
            $currentHeading = $heading.clone(true).html(list[0]).appendTo($currentUl),
            $currentBtn = $button.clone(true).appendTo($currentUl),
            $currentInput = $input.clone(true).appendTo($currentUl);

        for (var j = 1, len2 = list.length; j < len2; j += 1) {
            var $currentLi = $li.clone(true),
                $currentLink = $link.clone(true).html(list[j])
                    .attr('href', 'https://www.google.bg/search?q=' + list[j])
                    .attr('target', '_blank')
                    .appendTo($currentLi);
            $currentLi.appendTo($currentUl);
        }
        $currentUl.appendTo($currentListDiv);
        $currentListDiv.appendTo($container);
    }

      // drag and drop functionality:
    function makeDraggable(element){
        element.draggable({
        containment: $container,
        start: function () {
            $draggedLi = $(this);
        }
    });
        return element;
    }
    makeDraggable($('li'));

    $('ul').droppable({
        accept: 'li',
        drop: function () {
            $(this).append($draggedLi);
            $draggedLi.css('left', 0);
            $draggedLi.css('top', 0);
        }
    });

    // clicking on the button displays the input:
    $container.on('click', 'button', function () {
        var $this = $(this);
        $this.next().show();
        $this.hide();
    });
    // adding input value to the list of items:
    $container.on('change', 'input[type=text]', function () {
        var $this = $(this);
        var $text = $this.val();
        var $newLi = ($('<li />')).appendTo($this.parent());
        makeDraggable($newLi);
        $('<a />').html($text).attr('href', 'https://www.google.bg/search?q=' + $text)
            .attr('target', '_blank').appendTo($newLi);
        $this.prev().show();
        $this.hide();
    });

    return $container;
};