import { useState } from "react";
import { useSelector } from "react-redux";
// import { useModal } from "../../context/Modal";
import { uploadImg } from "../../redux/csrf";
import "./ImagePicker.css";

const blank = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC'
function ImagePicker({ defaultSrc, setStateFunc, delBtnShow = false, style, id }) {
  // const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [src,setSrc] = useState(defaultSrc || blank)

  const triggerFileInput = () => document.getElementById(`imageUpload-${id}`).click()
  const clearFile = () => {
    setStateFunc(`https://cdn.discordapp.com/embed/avatars/${sessionUser.id%6}.png`)
    setSrc(blank)
  }
    
  const handleImageChange = e => {
    const images = Array.from(e.target.files).filter(f=>f.type.startsWith('image/'))

    uploadImg(images)
      .then(atts => {
        setSrc(atts[0].url)
        setStateFunc(atts[0].url)
      })
      .catch(console.error)
  }

  return <>
    <input
      type="file"
      id={`imageUpload-${id}`}
      style={{ display: 'none' }}
      onChange={handleImageChange}
      accept="image/*"
    />
    <div id={id} className="accountConfigUserIcon" style={style}>
      {src!==blank && delBtnShow && <div className="accountConfigUserAvatarDel" onClick={clearFile}><i className="fas fa-times"/></div>}
      <img className={`accountConfigUserAvatar${src===blank?' empty':''}`} onClick={triggerFileInput} src={src}/>
      {src!==blank && <img className="accountConfigUserAvatarEdit" onClick={triggerFileInput} src="/icons/pencil.svg"/>}
    </div>
  </>
}

export default ImagePicker;
