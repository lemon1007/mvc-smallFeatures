import $ from "jquery";
import '../css/app4.css';


const html = `
\t<section id="app4">
\t\t<div class="circle"></div>
\t</section>
\t
`
const $element = $(html).appendTo($('body>#main'))

const $circle = $('#app4 .circle')

$circle.on('mouseenter', () => {
    $circle.addClass('active')
}).on('mouseleave',()=>{
    $circle.removeClass('active')
})