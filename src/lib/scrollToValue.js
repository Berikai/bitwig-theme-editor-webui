let previousElement = null;

export const scrollToValue = (e, value_id) => {
    e.stopPropagation();
    const element = document.getElementById(value_id);
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // @ts-ignore
    element.parentElement.parentElement.style.backgroundColor = 'lime';

    if (previousElement !== null && previousElement !== element) {
        // @ts-ignore
        previousElement.parentElement.parentElement.style.backgroundColor = 'whitesmoke';
    }

    previousElement = element;
}