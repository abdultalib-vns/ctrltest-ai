import React, { createContext, useContext, useState } from "react";

interface WaitlistContextType {
  isOpen: boolean;
  openWaitlist: () => void;
  closeWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextType>({
  isOpen: false,
  openWaitlist: () => {},
  closeWaitlist: () => {},
});

export const WaitlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openWaitlist = () => setIsOpen(true);
  const closeWaitlist = () => setIsOpen(false);

  return (
    <WaitlistContext.Provider value={{ isOpen, openWaitlist, closeWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => useContext(WaitlistContext);
