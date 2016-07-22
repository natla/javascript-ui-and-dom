/*
 Create a function that takes an id or DOM element and an array of contents
 * if an id is provided, select the element
 * Add divs to the element
 * Each div's content must be one of the items from the contents array
 * The function must remove all previous content from the DOM element provided
 * Throws if:
 * The provided first parameter is neither string or existing DOM element
 * The provided id does not select anything (there is no element that has such an id)
 * Any of the function params is missing
 * Any of the function params is not as described
 * Any of the contents is neither `string` nor `number`
 * In that case, the content of the element **must not be** changed
 */

function changeDiv(element, contents) {
    if (arguments.length < 2) {
        throw new Error('You must provide 2 arguments to the function');
    }
    if (!(typeof(element) === 'string' || element instanceof HTMLElement)) {
        throw new Error('Element must be a string or an exisiting DOM element!');
    }
    if (contents.constructor !== Array) {  // also works this way: if (!Array.isArray(contents))
        throw new Error('Contents must be an array!');
    }

    selected = document.getElementById(element) || document.getElementById(element.id);

    if (selected === null) {
        throw new Error('No such element or id!');
    }

    fragment = document.createDocumentFragment();

    var newDiv = document.createElement('div');

    for (var i = 0, len = contents.length; i < len; i++) {
        if (typeof(contents[i]) !== 'string' && typeof(contents[i]) !== 'number') {
            throw new Error('The elements in contents must be strings or numbers!');
        }
        var currentDiv = newDiv.cloneNode(true);
        currentDiv.innerHTML = contents[i];
        fragment.appendChild(currentDiv);
    }
    selected.innerHTML = '';
    selected.appendChild(fragment);
}

