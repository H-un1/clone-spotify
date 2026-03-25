import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/songModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const addSong = async (req, res) => {
    try {
        // console.log(req.files);

        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        // console.log(audioFile.path)
        // console.log("Uploading Audio:", audioFile.path); 
        // console.log("Uploading Image:", imageFile.path);

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "auto" });
        const duration = `${Math.floor(audioUpload.duration/60)}:${Math.floor(audioUpload.duration%60)}`
        // console.log(name, desc, album, audioFile, imageFile, audioUpload, imageUpload);

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = new songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song Added" })

    } catch (error) {
        console.log("Cloudinary error:", error);

        res.json({ success: false, message: error.message })
    }
}

const listSong = async (req, res) => {
    try {

        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });

    } catch (error){
        res.json({ success: false });
    }
}

const removeSong = async (req, res) => {
    
    try {

        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song removed"})

    } catch (error) {

        res.json({ success: false });
        
    }
}

export {addSong, listSong, removeSong}
