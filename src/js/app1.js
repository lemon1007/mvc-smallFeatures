import $ from "jquery";
import '../css/app1.css';


// eventBus存在trigger和on方法
// on 监听事件，监听到某事件触发后进行操作
// trigger 触发事件，表示某事件触发了
const eventBus = $({})

// 数据相关放到m
const model = {
    data: {
        // 初始化，取出内存中存储的n，并将其转化成int类型赋值给n
        n: parseInt(localStorage.getItem('n'))
    },
    // 页面中数据发生变化则触发eventBus.trigger
    update(data) {
        Object.assign(model.data, data);
        eventBus.trigger('dataUpdate');
        localStorage.setItem('n', model.data.n.toString())
    },
}

// 视图相关放到v
const view = {
    el: null,
    html: `
            <div class="output">
                <span id="number">{{n}}</span>
            </div>
            <div class="btnInput">
                <button id="add">+1</button>
                <button id="minus">-1</button>
                <button id="mul">x2</button>
                <button id="divide">÷2</button>
            </div>`,

    // 初始化一个不变的容器
    init(container) {
        view.el = $(container)
        view.render();
    },

    // html渲染到页面的函数，每次将改变后的元素重新渲染到页面
    // 用新的页面覆盖旧的页面
    render(n) {
        if (view.el.children.length !== 0)
            view.el.empty();
        $(view.html.replace('{{n}}', n))
            .appendTo(view.el)
    },
}

// 其他部分放到c
const controller = {
    init(container) {
        view.init(container);
        view.render(model.data.n)
        controller.autoBindEvents();
        // 通过eventBus.on监听到数据更新后，进行model.data.n的更新
        eventBus.on('dataUpdate', () => {
            view.render(model.data.n);
        })
    },
    events: {
        'click #add': 'add',
        'click #minus': 'minus',
        'click #mul': 'mul',
        'click #divide': 'divide',
    },
    add() {
        model.update({n: model.data.n + 1})
    },
    minus() {
        model.update({n: model.data.n - 1})
    },
    mul() {
        model.update({n: model.data.n * 2})
    },
    divide() {
        model.update({n: model.data.n / 2})
    },
// 绑定鼠标事件
    autoBindEvents() {
        for (let key in controller.events) {
            const value = controller[controller.events[key]];
            const spaceIndex = key.indexOf(' ');
            const eventStatus = key.slice(0, spaceIndex);
            const eventIName = key.slice(spaceIndex);
            // click events 执行函数
            view.el.on(eventStatus, eventIName, value)
        }
    }
}

// 将controller导出
export default controller


