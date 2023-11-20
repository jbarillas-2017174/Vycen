'use strict'
const firebase = require('firebase/storage');
const fs = require('fs');

exports.prueba = async (req, res) => {
    console.log('PRUEBA')
    return res.send({ message: 'Prueba' })
}

exports.uploadImage = async (req, res) => {
    try {
        const imageBlob = req.file.buffer;
        const imageName = req.file.originalname;
        fs.writeFileSync('./src/assets/'+imageName, Buffer.from(imageBlob))
        return res.send({message: imageName})
        // const storage = firebase.getStorage();
        // const storageRef = firebase.ref(storage, imageName);
        // let responseFirebase = await firebase.uploadBytes(storageRef, imageBlob);
        // if (responseFirebase) {
        //     return res.send({ message: 'Image uploaded successfully' })
        // } else {
        //     return res.send({ message: 'Error ' })
        // }
    } catch (error) {
        console.log(error)
        return res.send({ error: error })
    }
}

exports.getImages = async (req, res) => {
    const storage = firebase.getStorage();
    const storageRef = firebase.ref(storage);
    let fileNames = []
    let files = await firebase.listAll(storageRef)

    await Promise.all(files.items.map(async (itemRef) => {
        const fileName = itemRef.name;
        const fileDownloadURL = await firebase.getDownloadURL(itemRef);
        fileNames.push({ name: fileName, downloadURL: fileDownloadURL });
      }));

    return res.send({ files: fileNames });
}