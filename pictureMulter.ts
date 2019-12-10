import * as multer from 'multer';
// import * as path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/private/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
})


export const pictureUpload = multer({
    storage: storage,
    // fileFilter: function (req, file, callback) {
    //     const ext = path.extname('/uploads/pictures');
    //     if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //         return callback(new Error('Only images are allowed'), false);
    //     }
    //     callback(null, true);
    // }
})