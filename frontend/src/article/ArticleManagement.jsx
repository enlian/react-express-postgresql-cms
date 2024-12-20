import AddArticle from "./addArticle";
import ArticleList from "./ArticleList";
import { ArticlesProvider } from "../contexts/articleContext";
import "./../assets/article.scss";

function Index() {
  return (
    <div id="article-box">
      <ArticlesProvider>
        <AddArticle />
        <ArticleList />
      </ArticlesProvider>
    </div>
  );
}

export default Index;
