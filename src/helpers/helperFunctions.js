export const generateYears = () => {
    const start = 1960
    const current = new Date().getFullYear()
    const years = []

    for (let i = current; i >= start; i--) {
        years.push({ label: i, value: i })
    }
    return years
}

export const createImageUrl = (data) => {
    const imageBlob = new Blob([new Uint8Array(data)]);
    const image = URL.createObjectURL(imageBlob);
    return image
}

export const bufferToFile = (buffer, filename) => {
    const blob = new Blob([new Uint8Array(buffer)], { type: 'image/png' });
    return new File([blob], filename, { type: 'image/png' });
};