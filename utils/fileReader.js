export default function FileReaderFunction(myFile) {
    var reader = new FileReader()
    var fileByteArray = []
    reader.readAsArrayBuffer(myFile)
    reader.onloadend = function (evt) {
        if (evt.target.readyState == FileReader.DONE) {
            var arrayBuffer = evt.target.result,
                array = new Uint8Array(arrayBuffer)
            for (var i = 0; i < array.length; i++) {
                fileByteArray.push(array[i])
            }
        }
    }
    console.log({fileByteArray})
    return fileByteArray
}
