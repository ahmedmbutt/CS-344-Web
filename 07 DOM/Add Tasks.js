window.onload = function () {
    document.getElementById("AddButton").onclick = function () {
        let list = document.createElement("li");
        list.innerHTML = document.getElementById("TextField").value;
        let icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-trash-alt");
        icon.onclick = function () {
            document.getElementById("Task").removeChild(this.parentElement);
        }
        list.appendChild(icon);
        document.getElementById("Task").appendChild(list);
        document.getElementById("TextField").value = '';
    }
}