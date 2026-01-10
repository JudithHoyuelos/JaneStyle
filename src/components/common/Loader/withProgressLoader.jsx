import React, { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import Loader from "@/components/common/Loader/Loader";

const withProgressLoader = (WrappedComponent) => {
  return function WithProgressLoader(props) {
    const { progress } = useProgress();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (progress === 100) {
        const timeout = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timeout);
      }
    }, [progress]);

    return (
      <>
        {loading && <Loader />}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withProgressLoader;
