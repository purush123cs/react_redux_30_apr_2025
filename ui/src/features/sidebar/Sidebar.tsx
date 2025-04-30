import "./Sidebar.css"
import { useState } from 'react';

interface Category {
    id: number;
    title: string;
    color: string;
}

interface SidebarProps {
    categories: Category[];
    categoryGroup: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ categories, categoryGroup }) => {

    const [onActive, setOnActive] = useState<boolean>(false);
    const [offActive, setOffActive] = useState<boolean>(true);
    const [sort, setSort] = useState<string>('');
    const [useCategory, setUseCategory] = useState<{ [key: string]: boolean }>({});
    const cols: string[] = ["timestamp", "score"];
    
    const changeView = (view: string, template: string) => {
        if (view === 'on') {
            setOnActive(true);
            setOffActive(false);
        } else {
            setOnActive(false);
            setOffActive(true);
        }
        console.log(`View changed to: ${view}, Template: ${template}`);
    };

    const toggleCategory = (category: string) => {
        setUseCategory((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <div className="sidebar">
            <div className="header-content">
                <div className="menu-left">
                    <h3>View by:</h3>
                    <button
                        className={`list ${onActive ? 'selected' : ''}`}
                        onClick={() => changeView('on', 'content/list.html')}
                    >
                        off
                    </button>
                    <button
                        className={`grid ${offActive ? 'selected' : ''}`}
                        onClick={() => changeView('off', 'content/grid.html')}
                    >
                        on
                    </button>
                </div>

                <div className="menu-right">
                    <h3>Sort by:&nbsp;</h3>
                    <select
                        className="sortBy"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        {cols.map((col, index) => (
                            <option key={index} value={col}>
                                {col}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="categoryFacet">
                {categoryGroup.map((articleCategory, parentIndex) => (
                    <label key={parentIndex}>
                        <input
                            type="checkbox"
                            checked={!!useCategory[articleCategory]}
                            onChange={() => toggleCategory(articleCategory)}
                        />
                        {categories.map((category) =>
                            parentIndex + 1 === category.id ? (
                                <span className={`facetCategory${category.id}`} key={category.id}>{category.title}</span>
                            ) : null
                        )}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;