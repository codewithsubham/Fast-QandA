export const renderActivePollResult = (data) => {
    let total = 0;
    for (let numberOfResponse in data) {
        total += data[numberOfResponse];
    }

    for (let progress in data) {
        document.querySelector(`#${progress}_percent`).innerHTML =
            ((data[progress] / total) * 100).toFixed(0) + "%";
        document.querySelector(`#${progress}_bar`).style.width =
            ((data[progress] / total) * 100).toFixed(0) + "%";
    }
    return;
};
