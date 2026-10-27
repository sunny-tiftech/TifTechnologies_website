import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api } from "@/lib/AuthContext";
import { defaultContent } from "@/lib/data";

const ContentContext = createContext({ content: defaultContent, pages: [], refresh: () => {} });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [pages, setPages] = useState([]);

  const refresh = useCallback(() => {
    api
      .get("/content")
      .then((r) => {
        if (r.data && r.data.hero) setContent({ ...defaultContent, ...r.data });
      })
      .catch(() => {});
    api
      .get("/pages")
      .then((r) => setPages(Array.isArray(r.data) ? r.data : []))
      .catch(() => setPages([]));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <ContentContext.Provider value={{ content, pages, refresh }}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
