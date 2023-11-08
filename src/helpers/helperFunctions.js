export const generateYears = () => {
    const start = 1960
    const current = new Date().getFullYear()
    const years = []

    for (let i = current; i >= start; i--) {
        years.push({label: i, value: i}) 
    }
    return years
}


