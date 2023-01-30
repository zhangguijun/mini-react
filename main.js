
import { createElement, render } from './react/index'

const element = createElement(
    'h1', 
    {
        id: 'title',
        class: 'hello',
        style: 'background: skyblue',
    },
    'Hello world',
    createElement(
        'a',
        {
            href: 'http://www.baidu.com',
            style: 'color: yellow'
        }, 
        '百度'
    )
)

const container = document.getElementById('root');

render(element, container)

console.log(element)