"use client";

import { useEffect, useState } from "react";
import { SettingsModal } from "../modals/SettingModel";
import { CoverImageModal } from "../modals/CoverImageModel";

const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};

export default ModalProvider;
