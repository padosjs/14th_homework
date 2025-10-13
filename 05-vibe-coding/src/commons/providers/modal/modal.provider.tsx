"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  const value: ModalContextType = {
    openModal,
    closeModal,
    isOpen,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isMounted &&
        isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            
            {/* Modal Wrapper - max-w-md, w-full 제거됨 */}
            <div
              className="relative z-10 bg-white rounded-lg shadow-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {modalContent}
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
}

