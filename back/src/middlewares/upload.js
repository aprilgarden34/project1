import multer from "multer";

const storage = multer.diskStorage({
      // 파일 저장 경로 : uploads/
      destination: (req, file, cb) => {
        cb(null, "uploads/");
      },
  
      // 파일 이름 형식 : 오늘날짜_원래이름
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    });
  
const upload =  multer({
        storage: storage,

        // 파일 허용 조건 : 확장자 이미지 타입만 업로드
        fileFilter: function (req, file, cb) {
          const typed = String(file.mimetype)?.split("/")[0] ?? "null"
          if (typed !== 'image') {
            return cb(null, false, new Error('goes wrong on the mimetype'));
          }
          cb(null, true);
        },
        // 파일 크기제한 : 5mb (1024 * 1024)
        limits: {
          fileSize: 5 * 1024 * 1024,
        }
      }).single('file');


export { upload };
