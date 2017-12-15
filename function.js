

/*
   获取某一个元素的子元素
* */

function childNode(element) {
    let arr = [];
    let childnodes = element.childNodes;
    /*childnodes.forEach(function (ele) {
        if (ele.nodeType == 1) {
            arr.push(ele)
        }
    });*/
    /*
    *  添加
    *  冒充 : 数组 冒充
    *  nodeList -> 数组
    * */
    arr = Array.prototype.filter.call(childnodes, function (element) {
        return element.nodeType == 1
    });
    /*for (let i = 0; i < childnodes.length; i++) {
        if (childnodes[i].nodeType == 1) {
            arr.push(childnodes[i]);
        }
    }*/
    return arr;
}

function firstElementChild(element) {
    return childNode(element)[0];
}

function createCircle(num) {
    let box = document.querySelector('.box');
    for (let i = 0; i < num; i++) {
        let divs = document.createElement('div');
        divs.classList.add('circle');

        let w = Math.floor(Math.random() * 30 + 20);

        let color = getColor();
        let l = (innerWidth - w) * Math.random() - innerWidth / 2,
            t = (innerHeight - w) * Math.random() - innerHeight / 2;
        // divs.style.cssText = `
        //      background:${color};
        //      width:${w}px;
        //      height:${w}px;
        // `;
        box.appendChild(divs);

        /*setTimeout(function(){
            divs.style.left = `${l}px`;
            divs.style.top = `${t}px`;
        },100)*/
    }

}

// function getColor() {
//     let str = `rgb(${Math.floor(Math.random() * 256)},
//     ${Math.floor(Math.random() * 256)},
//     ${Math.floor(Math.random() * 256)})`;
//     return str;
// }

/*
*  获取指定元素
*   $(select)
*   select  String  选择器
*
*  $('#box')
*  $('.box')
*  $('div')
*
*  $('<p>')
*
*  $(function(){})
*  1、首字符
*    分类
*      #    id
*      .    class
*      tag  tagname
* */

function $(select) {
    if (typeof select == 'string') {
        let selector = select.trim();
        let firstChar = selector.charAt(0);
        if (firstChar == '#') {
            return document.getElementById(selector.substring(1));
        } else if (firstChar == '.') {
            return document.getElementsByClassName(selector.substring(1));
        } else if (/^[a-zA-Z][A-Za-z1-6]{0,6}$/.test(selector)) {
            return document.getElementsByTagName(selector);
        } else if (/^<[a-zA-Z][A-Za-z1-6]{0,6}>$/.test(selector)) {
            return document.createElement(selector.slice(1, -1));
        }
    } else if (typeof select == 'function') {
        window.onload = function () {
            // select();
        }
    }
}


/*
*  prepend()
*   在某一个元素的 最前面 插入一个子元素 =>  第一个元素节点之前
*
*   1、第一个元素节点
* */
function prepend(parentNode,child) {
    let firstChild = parentNode.firstElementChild;
    parentNode.insertBefore(child,firstChild)
}

HTMLElement.prototype.append =  function(child){
    this.appendChild(child);
};
HTMLElement.prototype.append =  function(parentNode){
//        parentNode.append(this);
    parentNode.appendChild()
};
HTMLElement.prototype.prepend = function (child) {
    let firstChild = this.firstElementChild;
    if(firstChild){
        this.insertBefore(child,firstChild);
    }else{
        this.appendChild(child);
    }
};
HTMLElement.prototype.prepengTo = function (parentNode) {
    parentNode.prepend(this);
};

//    外部

// * box.insert(div)
// * 把div添加到box之前
// * div.insertTo(box)
// * 添加div到box之前
// * insert 插入

//    insert 对应的前面

HTMLElement.prototype.insert = function (node) {
    let parent = this.parentNode;
    parent.insertBefore(node,this);
};
    // 元素后面 -> 元素兄弟元素(元素节点)的前面

HTMLElement.prototype.after = function(node){
    let next = this.nextElementSibling;
    if(next){
        next.insert(node);
        // 下一个前面
    }else {
        let parent = this.parentNode;
        parent.append(node);
    }
};
HTMLElement.prototype.afterTo = function(node){
    node.after(this);
};

// 查找
HTMLElement.prototype.parent = function(){
    return this.parentNode;
};



HTMLElement.prototype.parents = function () {
    let arr = [];
    let parent = this.parentNode;
    if(this.nodeName == 'BODY'){
        arr.push(parent);
    }
    while (parent.nodeName != 'HTML');
        arr.push(parent);
        parent = parent.parentNode;
        if(parent.nodeName == 'HTML'){
            arr.push(parent);
        }
        return arr;
};
/*获取定位节点*/
HTMLElement.prototype.offsetParents = function(){
    let parents = this.parents();
    /*获取父元素*/
    let node = null;
    for(let i=0;i<parents.length;i++){
        /*遍历父元素*/
        let v = window.getComputedStyle(parents[i],null).position;
        /*获取定位属性*/
        if(v == 'relative'|| v=='absolute'){
            /*判断定位属性 */
            node=parent[i];
            break;
        }
        if(!node){
            node = document.body;
        }
    }
    return node;
}


