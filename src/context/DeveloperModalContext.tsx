import React, { createContext, useContext, useState } from "react";

interface DeveloperModalContextType {
  isOpen: boolean;
  openDeveloperModal: () => void;
  closeDeveloperModal: () => void;
}

const DeveloperModalContext = createContext<DeveloperModalContextType>({
  isOpen: false,
  openDeveloperModal: () => {},
  closeDeveloperModal: () => {},
});

export const DeveloperModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDeveloperModal = () => setIsOpen(true);
  const closeDeveloperModal = () => setIsOpen(false);

  return (
    <DeveloperModalContext.Provider value={{ isOpen, openDeveloperModal, closeDeveloperModal }}>
      {children}
    </DeveloperModalContext.Provider>
  );
};

export const useDeveloperModal = () => useContext(DeveloperModalContext);
