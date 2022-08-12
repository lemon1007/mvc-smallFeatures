import $ from "jquery";
import '../css/app3.css';


const $square = $('#app3 .square')

$square.on('click',()=>{
    $square.toggleClass('active')
})