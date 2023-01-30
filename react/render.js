function createDom(fiber) {
    const dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode('') : document.createElement(fiber.type);
    // 赋予属性
    Object.keys(fiber.props).filter(key => key !== 'children').forEach(name => {
        dom[name] = fiber.props[name]

    })

    return dom;
}

function render(element, container) {

    workInProgressRoot = {
        dom: container,
        props: {
            children: [element]
        },
        sibling: null,
        child: null,
        parent: null
    }

    nextUnitOfWork = workInProgressRoot;
}


let nextUnitOfWork = null;
let workInProgressRoot = null;

function commitRoot() {
    commitWork(workInProgressRoot.child);
    workInProgressRoot = null;
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }

    const domParent = fiber.parent.dom;

    domParent.appendChild(fiber.dom);

    commitWork(fiber.child);
    commitWork(fiber.sibling)
}
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

    requestIdleCallback(workLoop);
    // 异步渲染 同步提交
    if (!nextUnitOfWork && workInProgressRoot) {
        commitRoot();
    }

}
requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
    // add dom node

    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    // // 追加父级dom
    // if (fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }
    // create new fibers

    const element = fiber.props.children;
    let preSibling = null;

    for (let index = 0; index < element.length; index++) {
        // const element = array[index];
        const newFiber = {
            type: element[index].type,
            props: element[index].props,
            parent: fiber,
            dom: null,
            child: null,
            sibling: null
        }
        if (index === 0) { // 如果是第一个就是亲儿子否则就是亲儿子的兄弟
            fiber.child = newFiber
        } else {
            preSibling.sibling = newFiber;
        }
        preSibling = newFiber;

    }

    // return next unit of work
    //  We first try with the child, then with the sibling, then with the uncle, and so on.
    if (fiber.child) {
        return fiber.child
    }

    let nextFiber = fiber;

    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent;
    }








}

export default render;