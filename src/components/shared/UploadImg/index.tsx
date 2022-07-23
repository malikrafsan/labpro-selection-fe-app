import styles from "./index.module.css";

const UploadImg = ({
  title,
  file,
  onChange,
}: {
  title: string;
  file: File | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={styles.frame}>
      <div className={styles.center}>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>

        <div className={styles.dropzone}>
          <div className={styles.layoutDropzone}>
            <div className={styles.imgContainer}>
              <img
                src="/upload-file-icon.svg"
                className={styles.uploadIcon}
              />
            </div>
            <div className={styles.description + ' text-center'}>
              <div className={styles.topDesc}>
                <span className={styles.purple}>Click to upload</span>{' '}
                or drag and drop
              </div>
              <div className={styles.middleDesc}>
                PNG, JPEG, or JPG
              </div>
              <div className={styles.bottomDesc}>(max 5MB)</div>
            </div>
          </div>
          <input
            type="file"
            className={styles.uploadInput}
            onChange={onChange}
            accept="image/png, image/jpg, image/jpeg"
          />
        </div>
        {file && (
          <div className={styles.file + ' w-100 text-center p-2'}>
            {file.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImg;
