function render(element, container) {
    // 处理render

    const dom =  element.type == "TEXT_ELEMENT"? document.createTextNode('') : document.createElement(element.type);
    // 赋予属性
    Object.keys(element.props).filter(key => key !== 'children').forEach(name => {
        dom[name] =  element.props[name]

    })
    // 递归渲染子元素
    element.props.children.forEach(child => {
        render(child, dom)
    })
    container.appendChild(dom);
}

export default render;