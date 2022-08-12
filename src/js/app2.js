import $ from "jquery";
import '../css/app2.css';

const eventBus = $({})
// 数据相关放到m
const model = {
    data: {
        // 初始化，取出内存中存储的n，并将其转化成int类型赋值给n
        index: parseInt(localStorage.getItem('index') || 0)
    },
    // 页面中数据发生变化则触发eventBus.trigger
    update(data) {
        Object.assign(model.data, data);
        eventBus.trigger('dataUpdate');
        localStorage.setItem('index', model.data.index.toString())
    },
}


// 视图相关放到v
const view = {
    el: null,
    html: (index) => {
        return `
        <ol class="tabBar">
            <li class="${index === 0 ? 'selected' : ''}" data-index="0">1</li>
            <li class="${index === 1 ? 'selected' : ''}" data-index="1">2</li>
        </ol>
        <ol class="tabContent">
            <li class="${index === 0 ? 'active' : ''}">这里是内容1的部分</li>
            <li class="${index === 1 ? 'active' : ''}">这里是内容2的部分</li>
        </ol>`
    },

    // 初始化一个不变的容器
    init(container) {
        view.el = $(container)
    },

    // html渲染到页面的函数，每次将改变后的元素重新渲染到页面
    // 用新的页面覆盖旧的页面
    render(index) {
        if (view.el.children.length !== 0)
            view.el.empty();
        $(view.html(index)).appendTo(view.el)
    },
}


// 其他部分放到c
const controller = {
    init(container) {
        view.init(container);
        view.render(model.data.index);
        controller.autoBindEvents();
        // 通过eventBus.on监听到数据更新后，进行model.data.n的更新
        eventBus.on('dataUpdate', () => {
            view.render(model.data.index);
        })
    },
    events: {
        'click .tabBar li': 'tabChange',
    },
    tabChange(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        model.update({index: index})
    },
    // 绑定鼠标事件
    autoBindEvents() {
        for (let key in controller.events) {
            const value = controller[controller.events[key]];
            const spaceIndex = key.indexOf(' ');
            const eventStatus = key.slice(0, spaceIndex);
            const eventIName = key.slice(spaceIndex + 1);
            // click events 执行函数
            view.el.on(eventStatus, eventIName, value)
        }
    }
}


export default controller;