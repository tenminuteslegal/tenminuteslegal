import ArticleItem from "../article/article";
import JournalPapersPage from "../sidebar/components/JournalPapersPage";

// / Main Content Component
const MainContent = () => {
  const articles = [
    {
      title: "Tropical analysis: with an application to indivisible goods",
      authors: "Nicholas Charles Bedard and Jacob K Goeree",
      pages: "815-829"
    },
    {
      title: "Antimonotonicity for preference axioms: the natural counterpart to comonotonicity",
      authors: "Giulio Principi, Peter P. Wakker, and Ruodu Wang",
      pages: "831-855"
    },
    {
      title: "Weight-ranked divide-and-conquer contracts",
      authors: "Lester T. Chan",
      pages: "857-882"
    },
    {
      title: "Forward-looking experimentation of correlated alternatives",
      authors: "Yu Fu and Mallesh M. Pai",
      pages: "883-909"
    },
    {
      title: "Empirical welfare economics",
      authors: "Christopher P. Chambers and Federico Echenique",
      pages: "911-939"
    },
    {
      title: "Unified gross substitutes and inverse isotonicity for equilibrium problems",
      authors: "Alfred Galichon, Larry Samuelson, and Lucas Vernet",
      pages: "941-971"
    },
    {
      title: "Tâtonnement in matching markets",
      authors: "Alexander Westkamp",
      pages: "973-1006"
    },
    {
      title: "Sensitivity versus size: implications for tax competition",
      authors: "David R. Agrawal, Aqib Bagh, and Mohammed Mardan",
      pages: "1007-1041"
    },
    {
      title: "Stochastic choice and the separation of time and risk preferences",
      authors: "David Dillenberger, Daniel Gottlieb, and Pietro Ortoleva",
      pages: "1043-1080"
    },
    {
      title: "Priority search with costly options",
      authors: "Jaehong Kim, Mengting Li, and Menghan Xu",
      pages: "1081-1134"
    }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          <em>Theoretical Economics</em> publishes leading research in economic theory. It is published by the{' '}
          <span className="text-red-600">Econometric Society</span> four times a year, in January, May, July, and November. 
          All content is freely available. It is included in the <em>Social Sciences Citation Index</em>.
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl text-red-600 font-bold mb-4">Current Issue: Volume 20, Issue 3 (July 2025)</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Table of Contents</h3>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-3">Articles</h4>
          <div className="space-y-1">
            {articles.map((article, index) => (
              <ArticleItem
                key={index}
                title={article.title}
                authors={article.authors}
                pages={article.pages}
              />
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-4">
          Through 2016, the order of papers within each issue is the order of receipt of the final versions. 
          From 2017, within each issue papers are ordered by their length.
        </div>

        <div className="text-xs text-gray-600 mb-4">
          The <span className="text-red-600">print</span> and <span className="text-red-600">view</span> links 
          lead to pdf files of the papers with the same content. The format of the versions in the{' '}
          <span className="text-red-600">view</span> links is optimized for on screen viewing. Papers in this 
          issue have on average been downloaded from 1559 distinct IP addresses. (For each paper, 
          downloads since the paper was first made available as a "Paper to appear" are included in this number.)
        </div>

        <div className="flex space-x-4 text-sm text-red-600 mb-6">
          <a href="#" className="hover:underline">PREVIOUS ISSUE</a>
          <a href="#" className="hover:underline">BROWSE ALL ISSUES</a>
        </div>

        <JournalPapersPage />
      </div>
    </div>
  );
};

export default MainContent;