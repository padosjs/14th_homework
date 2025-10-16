"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  isOpen: boolean;
}

interface ModalOptions {
  onClose?: () => void;
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

interface ModalItem {
  id: string;
  content: ReactNode;
  onClose?: () => void;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const [modalStack, setModalStack] = useState<ModalItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (modalStack.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalStack.length]);

  const openModal = (content: ReactNode, options?: ModalOptions) => {
    const newModal: ModalItem = {
      id: `modal-${Date.now()}-${Math.random()}`,
      content,
      onClose: options?.onClose,
    };
    setModalStack((prev) => [...prev, newModal]);
  };

  const closeModal = () => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  const value: ModalContextType = {
    openModal,
    closeModal,
    isOpen: modalStack.length > 0,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {isMounted &&
        modalStack.map((modal, index) =>
          createPortal(
            <div
              key={modal.id}
              className={styles.modalOverlay}
              style={{ zIndex: 50 + index }}
              onClick={modal.onClose || closeModal}
              data-testid="modal-overlay"
            >
              <div className={styles.overlay} />
              <div
                className={styles.modalWrapper}
                onClick={(e) => e.stopPropagation()}
              >
                {modal.content}
              </div>
            </div>,
            document.body
          )
        )}
    </ModalContext.Provider>
  );
}

