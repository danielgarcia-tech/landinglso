import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  showContactModal: boolean;
  showTestimonialsModal: boolean;
  setShowContactModal: (show: boolean) => void;
  setShowTestimonialsModal: (show: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTestimonialsModal, setShowTestimonialsModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showContactModal,
        showTestimonialsModal,
        setShowContactModal,
        setShowTestimonialsModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
