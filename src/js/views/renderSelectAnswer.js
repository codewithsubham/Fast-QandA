export const renderSelectAnswer = (e, searchingInside, answer) => {
    e.target.innerHTML = "";
    e.target.insertAdjacentHTML(
        "afterbegin",
        `<option value="false" disabled>update answer</option>`
    );
    let index = 0;
    for (let element of document.querySelectorAll(searchingInside)) {
        if (index > 25) {
            return;
        }
        if (element.value.trim() == "") {
            continue;
        }

        let elementOption;
        if (String.fromCharCode(index + 65) === answer) {
            elementOption = `<option value="${String.fromCharCode(
                index + 65
            )}">${String.fromCharCode(index + 65)} is the answer</option>`;
        } else {
            elementOption = `<option value="${String.fromCharCode(
                index + 65
            )}" >${String.fromCharCode(index + 65)} is the answer</option>`;
        }

        e.target.insertAdjacentHTML("beforeend", elementOption);

        ++index;
    }
};
