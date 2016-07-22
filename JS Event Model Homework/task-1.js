
/* 
 Create a function that takes an id or DOM element and:

 If an id is provided, select the element
 Find all elements with class button or content within the provided element
 Change the content of all .button elements with "hide"
 When a .button is clicked:
 Find the topmost .content element, that is before another .button and:
 If the .content is visible:
 Hide the .content
 Change the content of the .button to "show"
 If the .content is hidden:
 Show the .content
 Change the content of the .button to "hide"
 If there isn't a .content element after the clicked .button and before other .button, do nothing
 Throws if:
 The provided DOM element is non-existent
 The id is either not a string or does not select any DOM element
 */

function solve() {
    return function (element) {
        if (arguments.length < 1) {
            throw new Error('You must provide a DOM element as an argument!')
        }

        if (!(typeof(element) === 'string' || element instanceof HTMLElement)) {
            throw new Error('Element must be a string or a DOM object!');
        }

        container = document.getElementById(element) || document.getElementById(element.id);

        if (container === null) {
            throw new Error('No such element or id!');
        }

        var content = container.getElementsByClassName('content');
        var button = container.getElementsByClassName('button');

        for (var i = 0, len = button.length; i < len; i++) {
            button[i].innerHTML = 'hide';
            if(button[i] !== button[button.length - 1]){
                button[i].addEventListener('click', hideShow, false);
            }
        }

        function hideShow(ev) {
            var target = ev.target;
            var nextSibling = target.nextElementSibling;

            while(nextSibling.className !== 'content') {
                nextSibling = nextSibling.nextElementSibling;
            }

            if (nextSibling.className === 'content'
                && nextSibling.nextElementSibling && nextSibling.nextElementSibling.className === 'button'
            && target.nextElementSibling.className !== 'button') {
                if (nextSibling.style.display === 'none') {
                    nextSibling.style.display = '';
                    target.innerHTML = 'hide';
                }
                else {
                    nextSibling.style.display = 'none';
                    target.innerHTML = 'show';
                }
            }
        }
    };
};
