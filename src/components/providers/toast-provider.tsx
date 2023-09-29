"use client";

import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function ToastProvider() {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <Toaster />;
}

export default ToastProvider;
