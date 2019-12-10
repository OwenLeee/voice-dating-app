// import * as multer from 'multer';
// import * as path from 'path';

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + '/uploads/voiceTapes');
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
//     }
// })

// export const voiceUpload = multer({
//     storage: storage,
//     fileFilter: function (req, file, callback) {
//         const ext = path.extname('./uploads/voiceTapes');
//         if (ext !== '.mp3' && ext !== '.wav' && ext !== '.dct' && ext !== '.m4a' && ext !== '.flac') {
//             return callback(new Error('Only audio is allowed'), false);
//         }
//         callback(null, true);
//     }
// });
