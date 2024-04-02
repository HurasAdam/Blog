import React from "react";

interface PopupProps {
  handleOpen: () => void;
  handleClose: () => void;
  isOpen: boolean;
}

const Popup: React.FC<PopupProps> = ({
  handlePopupClose,
  isPopupOpen,
  children,
}) => {
  return (
    <>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40"></div>
          <div className="w-3/4 h-1/2 lg:w-[70%] xl:w-1/2  bg-slate-100 rounded-lg relative z-50 shadow-lg">
            <button
              className="absolute top-0 right-0  text-lg "
              onClick={() => handlePopupClose(false)}
            >
              &#10060;
            </button>
            <div className="w-full h-full py-10 px-5 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
