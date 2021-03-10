class TodoApp{
	constructor(target) {
		this.target = document.querySelector(target);
	};

	appendElement(tag, attr = {}, text = "") {
		if(typeof tag === "object") {
			if(attr?.position) {
				return this.insertAdjacentElement(position, tag);
			};

			return this.append(tag);
		};

		const element = document.createElement(tag);
		element.innerHTML = text;

		element.classList.add(attr?.class);

		this.element.append(element);
		return this;
	};

	appendTo(target, position) {

		if(typeof target === "object") {
			if(!position)
				return target.append(this.element);

			return target.insertAdjacentElement(position, this.element);
		};

		const parent = document.querySelector(target);
		if(!position)
			return parent.append(this.element);

		parent.insertAdjacentElement(position, this.element);
	};

	find(selector) {
		return this.target.querySelector(selector);
	};

	findAll(className) {
		return this.target.querySelectorAll(selector);
	};

	set id(id) {
		this.element.setAttribute("id", id);

		return this;
	};

	set class(className) {
		this.classList.add(className);

		return this;
	};

	set text(text) {
		this.append(document.createTextNode(text));

		return this;
	};
};

class Li extends TodoApp{
	constructor(text = "") {
		super();

		this.element = document.createElement("li");
		this.element.innerHTML = text;

		for(const key in this.element) {
			this[key] = this.element[key];
		}

		this.element.__proto__ = Object.assign(this, Object.create(HTMLElement.prototype));

		return this.element;
	};
};

class TodoItem extends TodoApp{
	constructor(value) {
		super();

		const list = new Li();

		list.class = "list";
		list.appendElement("div", {class: "check"}, "");
		list.appendElement("p", {class: "text"}, value);
		list.appendElement("p", {class: "close"}, "X");

		return list;
	};
};

class TodoList{
	constructor(nodeList) {
		this.list = nodeList;
	};

	removeAll() {
		this.list.forEach(item => {
			item.remove();
		});
	};

	item(index) {
		return this.list[index];
	};
};

const $list = document.querySelector("#list");
const $controllor = document.querySelector("#controll");

const controllorCheck = () => {
	if($list.children.length > 0) $controllor.style.display = "flex";
};

const createTodo = (target, value) => {
	const todoItem = new TodoItem(value);

	todoItem.appendTo(target, "afterbegin");
};

const $input = document.querySelector("#main");
$input.addEventListener("keyup", ({ target, key }) => {
	if(key !== "Enter") return false;
	if(target.value === "") return alert("공백은 입력할 수 없습니다");

	controllorCheck($list);
	createTodo("#list", target.value);
	target.value = "";
});