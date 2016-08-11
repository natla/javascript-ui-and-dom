$.fn.colorpicker = function () {
    var $root = this;
    $root.css('height', $(window).innerHeight());
    $root.css('min-width', $(window).innerWidth());

    var $button = $('<button />').addClass('button').appendTo($root);
    var $section = $('<section />').addClass('color-panel').appendTo($root);
    var $closeBtn = $('<button />').addClass('close-button').appendTo($section);
    var $canvas = $('<canvas />').addClass('canvas').text('unsupported browser').appendTo($section);

    var $hexInput = $('<input />').appendTo($section);
    $hexInput.attr('type', 'text').attr('name', 'hex').attr('placeholder', 'HEX');
    var $rgbInput = $('<input />').appendTo($section);
    $rgbInput.attr('type', 'text').attr('name', 'rgb').attr('placeholder', 'RGB');

    var $colorDiv = $('<div />').addClass('color-div').appendTo($section);

    $button.on('click', function () {
        $section.toggleClass('color-panel-visible');
    });

    $closeBtn.on('click', function () {
        $section.removeClass('color-panel-visible');
    });

    // Functions for converting RGB to HEX and HEX to RGB:
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    $section.on('change', 'input', function () {
        var $this = $(this);
        if ($this.attr('name') === 'rgb') {
            var $value = $this.val().split(',');
            var red = parseInt($value[0]);
            var green = parseInt($value[1]);
            var blue = parseInt($value[2]);
            $hexInput.val(rgbToHex(red, green, blue));
            $colorDiv.css('background-color', 'rgb(' + red + ',' + green + ',' + blue + ')');
        }
        if ($this.attr('name') === 'hex') {
            $value = $this.val();
            red = hexToRgb($value).r;
            green = hexToRgb($value).g;
            blue = hexToRgb($value).b;
            $rgbInput.val(red + ',' + green + ',' + blue);
            $colorDiv.css('background-color', 'rgb(' + red + ',' + green + ',' + blue + ')');
        }
    });

    var canvas = document.getElementsByClassName('canvas')[0];
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = 'imgs/color-picker.png';
    //img.crossOrigin = 'Anonymous';

    img.onload = function () {
        ctx.drawImage(img, 0, 0, 300, 150);
    };

    canvas.addEventListener('click', function (ev) {
        var coordX = ev.layerX;
        var coordY = ev.layerY;

        var imgData = ctx.getImageData(coordX, coordY, 1, 1);
        var red = imgData.data[0];
        var green = imgData.data[1];
        var blue = imgData.data[2];
        //var alpha = imgData.data[3];

        $rgbInput.val(red + ',' + green + ',' + blue);
        $hexInput.val(rgbToHex(red, green, blue));
        $colorDiv.css('background-color', 'rgb(' + red + ',' + green + ',' + blue + ')');
    }, false);

    return $root;
};