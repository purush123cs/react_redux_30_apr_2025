import "./ContentList.css"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router";
import data from "../../model/data.json";
import Sidebar from '../sidebar/Sidebar'; // Adjusted path to match the correct file location

interface Article {
  id: number;
  category: number;
  timestamp: string;
  score: number;
  title: string;
  html: string;
}

interface Category {
  id: number;
  title: string;
  color: string;
}

interface UseCategory {
  [key: number]: boolean; // Keys are category IDs (numbers), and values are booleans (selected state)
}

export const ContentList = () => {
  
  const [useCategory, setUseCategory] = useState<UseCategory>({  });
  const [sort, setSort] = useState<string>("timestamp");
  const [onActive, setOnActive] = useState<boolean>(true);
  const [offActive, setOffActive] = useState<boolean>(false);
  const [narrowWidth, setNarrowWidth] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("content/list.html");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [categoryGroup, setCategoryGroup] = useState<string[]>([]);

  // React Router hooks
  const { selectedTemplate: routeTemplate } = useParams<{ selectedTemplate: string }>();
  const navigate = useNavigate();

  // Set selected template based on route or default
  useEffect(() => {
    if (!narrowWidth && routeTemplate) {
      setSelectedTemplate(`content/${routeTemplate}.html`);
    } else {
      setSelectedTemplate("content/list.html");
    }
  }, []);

  useEffect(() => {
    // Set articles and categories from the imported JSON file
    setArticles(data.articles || []);
    setCategories(data.categories || []);
  }, []);

  // Change view handler
  const changeView = (button: "on" | "off", template: string) => {
    if (button === "on") {
      setOnActive(true);
      setOffActive(false);
    } else {
      setOnActive(false);
      setOffActive(true);
    }
    setSelectedTemplate(template);
  };

  // Watch for changes in articles and useCategory
  useEffect(() => {
    const uniqueItems = <K extends keyof Article>(data: Article[], key: K): string[] => {
      const result: string[] = [];
      if (data) {
        data.forEach((item) => {
          const value = item[key] as unknown as string;
          if (!result.includes(value)) {
            result.push(value);
          }
        });
      }
      return result;
    };

    const categoryGroup = uniqueItems(articles, "category");
    setCategoryGroup(categoryGroup);

    let selected = false;
    const filterAfterCategory = articles.filter((article) => {
      for (const category in useCategory) {
        if (useCategory[category]) {
          selected = true;
          if (Number(category) === article.category) {
            return true;
          }
        }
      }
      return false;
    });

    setFilteredArticles(selected ? filterAfterCategory : articles);
  }, [articles, useCategory]);

  // Sort articles dynamically based on the `sort` key
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (a[sort as keyof Article] < b[sort as keyof Article]) return -1;
    if (a[sort as keyof Article] > b[sort as keyof Article]) return 1;
    return 0;
  });

  return (
    <div className="content-container">
      <div className="content flex-row">
        <div className="grid-content">
          <div className="list">
            {sortedArticles.map((article) => (
              <div key={article.id} className={`cat-div cat${article.category}`}>
                <h3>{article.title}</h3>
                <p>{new Date(article.timestamp).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <p>Score: {article.score}</p>
                <div
                  className="htmlOfArticle"
                  dangerouslySetInnerHTML={{ __html: article.html }}
                  onClick={() => navigate(`/detail/${article.id}/list`)}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div><Sidebar categories={categories} categoryGroup={categoryGroup} /></div>
      </div>
    </div>
  );
}
