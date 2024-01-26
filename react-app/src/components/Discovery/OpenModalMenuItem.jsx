import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  id,
  className,
  iconClassName,
  children
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <div id={id} className={className} onClick={onClick} style={{display:'flex'}}>
      {
        children || <>
          <span>{itemText}</span>
          {iconClassName && <i style={{margin:'auto 0 auto auto'}} className={iconClassName}/>}
        </>
      }
    </div>
  );
}

export default OpenModalMenuItem;
