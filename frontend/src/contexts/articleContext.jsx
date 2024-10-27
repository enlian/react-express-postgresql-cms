import { createContext, useContext, useReducer, useEffect, useState } from "react";

// 创建上下文
const ArticlesContext = createContext(null);
const ArticlesDispatchContext = createContext(null);

// 定义 reducer
function articlesReducer(articles, action) {
  switch (action.type) {
    case "added": {
      if (!action.article.title || !action.article.content) {
        return articles;
      }
      return [action.article, ...articles];
    }
    case "changed": {
      return articles.map((t) =>
        t.id === action.article.id ? action.article : t
      );
    }
    case "deleted": {
      return articles.filter((t) => t.id !== action.id);
    }
    case "set": {
      return action.articles; // 初始化文章列表
    }
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
}

// 提供者组件
export function ArticlesProvider({ children }) {
  const [articles, dispatch] = useReducer(articlesReducer, []);
  const [isLoading, setIsLoading] = useState(true); // 添加加载状态

  // 使用 useEffect 从 API 拉取数据
  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/articles", {
          method: "POST", // 使用 POST 请求
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: "user-token" }), // 可以在这里传递 token
        });
        const data = await response.json();
        dispatch({ type: "set", articles: data }); // 初始化文章列表
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setIsLoading(false); // 加载完成后设为 false
      }
    }

    fetchArticles();
  }, []); // 空依赖数组表示只在组件挂载时执行

  return (
    <ArticlesContext.Provider value={{ articles, isLoading }}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesContext.Provider>
  );
}

// 导出Context参数 articles 和 isLoading
export function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error("useArticles must be used within an ArticlesProvider");
  }
  return context;
}

// 导出Context参数 dispatch，dispatch 作为一个执行方法，用于更新状态
export function useArticlesDispatch() {
  const context = useContext(ArticlesDispatchContext);
  if (!context) {
    throw new Error(
      "useArticlesDispatch must be used within an ArticlesProvider"
    );
  }
  return context;
}
