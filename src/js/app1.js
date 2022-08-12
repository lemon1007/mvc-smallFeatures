import $ from "jquery";
import '../css/app1.css';

const $btnAdd = $('#add')
const $btnMinus = $('#minus')
const $btnMul = $('#mul')
const $btnDivide = $('#divide')
const $number = $('#number')

const n = localStorage.getItem('n')
$number.text(n || 100)

$btnAdd.on('click', () => {
    let n = parseInt($number.text());
    n += 1;
    localStorage.setItem('n', n.toString());
    $number.text(n);
})

$btnMinus.on('click', () => {
    let n = parseInt($number.text());
    n -= 1;
    localStorage.setItem('n', n.toString());
    $number.text(n)
})

$btnMul.on('click', () => {
    let n = parseInt($number.text());
    n *= 2;
    localStorage.setItem('n', n.toString());
    $number.text(n)
})

$btnDivide.on('click', () => {
    let n = parseInt($number.text());
    n /= 2;
    localStorage.setItem('n', n.toString());
    $number.text(n)
})