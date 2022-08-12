import $ from "jquery";
import '../css/app3.css';


const html = `
\t<section id="app3">
\t\t<div class="square"></div>
\t</section>
`

const $element = $(html).appendTo($('body>#main'))

const $square = $('#app3 .square')
const localKey = 'app3.active';
const active = localStorage.getItem(localKey) === 'yes'

$square.toggleClass('active', active)

$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active');
        localStorage.setItem(localKey, 'no');
    } else {
        $square.addClass('active');
        $square.addClass('active');
        localStorage.setItem(localKey, 'yes')
    }
    // $square.toggleClass('active')
})