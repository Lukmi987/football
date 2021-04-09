import React, { useEffect } from "react";
import useStorage from "./hooks/useStorage";
import { motion } from "framer-motion";

const ProgressBar = ({ file, setFile, setUrl, collection }) => {
  const { url, progress, error } = useStorage(file, collection);
  useEffect(() => {
    //url we get only when file is fully uploaded
    if (url) {
      setFile(null);
      setUrl(url);
    }
  }, [url, setFile, setUrl]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    />
  );
};

export default ProgressBar;
