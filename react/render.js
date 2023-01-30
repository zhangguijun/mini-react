function render(element, container) {
    // 处理render

    const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode('') : document.createElement(element.type);
    // 赋予属性
    Object.keys(element.props).filter(key => key !== 'children').forEach(name => {
        dom[name] = element.props[name]

    })
    // 递归渲染子元素 一旦开始结束不了 
    // element.props.children.forEach(child => {
    //     render(child, dom)
    // })
    // 重构渲染逻辑




    container.appendChild(dom);
}


let nextUnitOfWork = null;

function workLoop(deadLine) {
    let shouldYield = false; // 是否需要暂停
    // 有工作切不用暂停
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        // 判断是否有足够的时间
        shouldYield = deadLine.timeRemaining() < 1
    }

    requestIdleCallback(workLoop)

}
requestIdleCallback(workLoop)

function performUnitOfWork(nextUnitOfWork) {

}

export default render;