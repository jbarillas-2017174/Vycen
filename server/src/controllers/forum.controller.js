'use strict'

const fs = require('fs');
const Forum = require('../models/forum')
const { validExtension } = require('../utils/validate');
const path = require('path');


exports.addImage = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            user: req.user.sub,
            image: req.files.image.path,
            description: params.description
        }


        let pathFile = './uploads/forum/';
        if (!req.files.image || !req.files.image.type) return res.status(400).send({ message: 'Havent sent image' });
        //ruta en la que llega la imagen
        const filePath = req.files.image.path; // \uploads\sers\file_name.ext
        //separar en jerarquía la ruta de la imágen (linux o MAC: ('\'))
        const fileSplit = filePath.split('\\');// fileSplit = ['uploads', 'users', 'file_name.ext']
        const fileName = fileSplit[2];// fileName = file_name.ext

        const extension = fileName.split('\.'); // extension = ['file_name', 'ext']
        const fileExt = extension[1]; // fileExt = ext;

        const validExt = await validExtension(fileExt, filePath);
        if (validExt === false) return res.status(400).send({ message: 'Invalid extension' });

        const forumImg = new Forum(data);
        await forumImg.save();

        return res.status(200).send({ message: 'Image added successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.getImage = async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const pathFile = './uploads/img/' + fileName;

        const image = fs.existsSync(pathFile);
        if (!image) return res.status(404).send({ message: 'Image not found' });
        return res.sendFile(path.resolve(pathFile));
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}


exports.getImages = async (req, res) => {
    try {
        const directoryPath = './uploads/img'
        const files = await fs.promises.readdir(directoryPath);
        res.status(200).json(files);

        /*const fileName = req.params.fileName;
        const img = await Forum.find();
        let pathFile = []
        for (let i of img) {
            pathFile = './' + i.image;
            await Forum.find({image: })

        }
        console.log(pathFile)
        return res.sendFile(path.resolve(pathFile));

        const image = fs.existsSync(pathFile);
        if (!image) return res.status(404).send({ message: 'Images not found' });
        return res.sendFile(path.resolve(pathFile));*/
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}