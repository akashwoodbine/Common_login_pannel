// SharedContext.tsx
import React, { createContext, useContext, useState } from "react";

type SharedContextType = {
  sharedValue: number;
  setSharedValue: React.Dispatch<React.SetStateAction<number>>;
};

const SharedContext = createContext<SharedContextType | undefined>(undefined);

export const SharedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sharedValue, setSharedValue] = useState(0);
  return (
    <SharedContext.Provider value={{ sharedValue, setSharedValue }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = () => {
  const context = useContext(SharedContext);
  if (!context) throw new Error("useShared must be used within SharedProvider");
  return context;
};
