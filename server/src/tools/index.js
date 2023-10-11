export function byteArrayToIntArray(array) {
    const intArray = []
    for (let i = 0; i < array.length; i+=4)
    {
        intArray.push((array[i]) |
            (array[i+1] << 8) |
            (array[i+2] << 16) |
            (array[i+3] << 24));
    }
    return intArray
}

// -110 --- -20