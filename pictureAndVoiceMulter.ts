import * as multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let type = file.mimetype;
        let typeSplit = type.split('/');
        let typeArray = typeSplit[1];
        if (typeArray == "png" || typeArray == "jpg" || typeArray == "gif" || typeArray == "jpeg") {
            cb(null, __dirname + '/uploads/pictures');
        } else if (typeArray == "mp3" || typeArray == "wav" || typeArray == "dct"  || typeArray == "m4a" || typeArray == "flac") {
            cb(null, __dirname + '/uploads/voiceTapes');
        } else {
            return cb(new Error, '/uploads/rubbish'); // Further improvement  (if (res.status === 500) { swal (" Not Allow!!")}) 
        }
    },
    filename: function (req, file, cb) {
        console.log(file.fieldname);
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
})


export const pictureAndVoiceUpload = multer({
    storage: storage,
})
