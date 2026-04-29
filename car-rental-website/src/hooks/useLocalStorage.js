import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  // 逻辑：初始化时从本地存储读取数据
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  // 逻辑：当数据变化时，自动写入本地存储
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}