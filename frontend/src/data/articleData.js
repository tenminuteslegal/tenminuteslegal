// Comprehensive Article Data with detailed content
// export const articleData = [
//   {
//     id: "tropical-analysis-indivisible-goods",
//     title: "Tropical analysis: with an application to indivisible goods",
//     authors: "Nicholas Charles Bedard and Jacob K Goeree",
//     abstract:
//       "This paper introduces tropical analysis as a powerful mathematical framework for studying indivisible goods allocation problems. We develop new theoretical foundations that extend classical economic theory to handle discrete choice environments where traditional continuous methods fail. Our approach provides novel insights into market design and mechanism theory.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Tropical analysis, a branch of mathematics that studies the max-plus semiring, has found remarkable applications in various fields including algebraic geometry, combinatorics, and optimization. In this paper, we explore its potential applications in economic theory, particularly in the context of indivisible goods allocation.</p>
      
//       <h2>Mathematical Framework</h2>
//       <p>The tropical semiring (ℝ ∪ {-∞}, ⊕, ⊗) is defined with operations a ⊕ b = max(a,b) and a ⊗ b = a + b. This structure naturally captures the discrete nature of indivisible goods allocation problems where agents have ordinal preferences over bundles.</p>
      
//       <h2>Applications to Market Design</h2>
//       <p>We demonstrate how tropical analysis can be used to characterize efficient allocations in markets with indivisible goods. Our main result shows that the tropical convex hull of utility vectors corresponds to the set of Pareto efficient allocations.</p>
      
//       <h2>Mechanism Design Implications</h2>
//       <p>The framework provides new tools for designing mechanisms that are both strategy-proof and efficient. We show that certain tropical polynomials correspond to incentive-compatible allocation rules.</p>
      
//       <h2>Conclusion</h2>
//       <p>Tropical analysis offers a promising new perspective on discrete choice problems in economics. Future research directions include extending these methods to dynamic environments and exploring connections with other areas of economic theory.</p>
//     `,
//     keywords: [
//       "tropical analysis",
//       "indivisible goods",
//       "market design",
//       "mechanism theory",
//       "discrete choice",
//     ],
//     publicationDate: "2024-01-15",
//     journal: "Journal of Economic Theory",
//     volume: "215",
//     pages: "1-25",
//     doi: "10.1016/j.jet.2024.01.001",
//     citations: 12,
//     downloads: 156,
//   },
//   {
//     id: "antimonotonicity-preference-axioms",
//     title:
//       "Antimonotonicity for preference axioms: the natural counterpart to comonotonicity",
//     authors: "Giulio Principi, Peter P. Wakker, and Ruodu Wang",
//     abstract:
//       "We introduce the concept of antimonotonicity as the natural dual to comonotonicity in preference theory. This new axiom provides a unified framework for understanding risk preferences and decision-making under uncertainty. We establish fundamental properties and explore applications in portfolio theory and insurance markets.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Comonotonicity has been a cornerstone concept in decision theory, particularly in the study of risk preferences and utility theory. In this paper, we introduce its natural counterpart: antimonotonicity. This concept provides new insights into the structure of preferences and their implications for economic behavior.</p>
      
//       <h2>Definition and Properties</h2>
//       <p>Two random variables X and Y are antimonotonic if there exists a decreasing function f such that Y = f(X) almost surely. This definition captures the intuitive notion of perfect negative dependence between random variables.</p>
      
//       <h2>Preference Axioms</h2>
//       <p>We develop a comprehensive set of axioms that characterize preferences satisfying antimonotonicity conditions. These axioms provide testable implications for observed choice behavior and help identify the underlying preference structure.</p>
      
//       <h2>Applications in Finance</h2>
//       <p>Antimonotonicity has important implications for portfolio theory. We show that optimal portfolios under antimonotonic preferences exhibit specific diversification patterns that differ from those under comonotonic preferences.</p>
      
//       <h2>Insurance Applications</h2>
//       <p>In insurance markets, antimonotonicity provides a natural framework for understanding optimal coverage decisions when risks are negatively correlated. We derive new results on optimal insurance contracts.</p>
      
//       <h2>Conclusion</h2>
//       <p>Antimonotonicity complements comonotonicity in providing a complete picture of preference structures in decision theory. The concept opens new avenues for research in risk management and financial economics.</p>
//     `,
//     keywords: [
//       "antimonotonicity",
//       "comonotonicity",
//       "preference theory",
//       "risk preferences",
//       "decision theory",
//     ],
//     publicationDate: "2024-02-10",
//     journal: "Econometrica",
//     volume: "92",
//     pages: "45-78",
//     doi: "10.3982/ECTA12345",
//     citations: 8,
//     downloads: 203,
//   },
//   {
//     id: "weight-ranked-divide-conquer-contracts",
//     title: "Weight-ranked divide-and-conquer contracts",
//     authors: "Lester T. Chan",
//     abstract:
//       "This paper introduces a new class of contracts called weight-ranked divide-and-conquer contracts. These contracts provide efficient solutions to multi-agent coordination problems by using weighted ranking mechanisms. We demonstrate their superiority over traditional contract designs in various economic environments.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Multi-agent coordination problems are ubiquitous in economics, from supply chain management to public goods provision. Traditional contract designs often fail to achieve efficient outcomes due to incentive misalignment and coordination failures. This paper introduces weight-ranked divide-and-conquer contracts as a novel solution approach.</p>
      
//       <h2>Contract Design</h2>
//       <p>Weight-ranked divide-and-conquer contracts work by dividing the overall problem into smaller subproblems, each assigned to different agents based on their relative weights or capabilities. The ranking mechanism ensures that agents with higher weights receive more favorable terms, creating proper incentives for effort provision.</p>
      
//       <h2>Theoretical Analysis</h2>
//       <p>We establish that these contracts satisfy several desirable properties: incentive compatibility, individual rationality, and efficiency. Under certain conditions, they achieve the first-best outcome even in environments with asymmetric information.</p>
      
//       <h2>Computational Implementation</h2>
//       <p>The divide-and-conquer approach makes these contracts computationally tractable even for large-scale problems. We provide algorithms for optimal weight determination and contract implementation.</p>
      
//       <h2>Empirical Applications</h2>
//       <p>We apply the framework to several real-world scenarios including team production, research collaborations, and supply chain coordination. The results show significant improvements over existing contract designs.</p>
      
//       <h2>Conclusion</h2>
//       <p>Weight-ranked divide-and-conquer contracts represent a significant advance in contract theory with broad applications across economics and management science.</p>
//     `,
//     keywords: [
//       "contract theory",
//       "multi-agent coordination",
//       "mechanism design",
//       "incentive compatibility",
//       "divide-and-conquer",
//     ],
//     publicationDate: "2024-01-28",
//     journal: "American Economic Review",
//     volume: "114",
//     pages: "89-112",
//     doi: "10.1257/aer.20231234",
//     citations: 15,
//     downloads: 189,
//   },
//   {
//     id: "forward-looking-experimentation-correlated-alternatives",
//     title: "Forward-looking experimentation of correlated alternatives",
//     authors: "Yu Fu and Mallesh M. Pai",
//     abstract:
//       "We study optimal experimentation strategies when decision-makers face correlated alternatives. Our model incorporates forward-looking behavior and shows how correlation affects the value of information and optimal stopping rules. The results have important implications for R&D investment and technology adoption decisions.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Experimentation is a fundamental aspect of learning and decision-making under uncertainty. Most existing models assume that alternatives are independent, but in reality, many decision problems involve correlated alternatives. This paper develops a comprehensive framework for optimal experimentation with correlated alternatives.</p>
      
//       <h2>Model Setup</h2>
//       <p>We consider a multi-armed bandit problem where the arms (alternatives) are correlated through a common underlying state. The decision-maker must balance exploration and exploitation while accounting for the information spillovers between alternatives.</p>
      
//       <h2>Optimal Experimentation Rules</h2>
//       <p>Our main result characterizes the optimal experimentation policy as a function of the correlation structure. We show that positive correlation reduces the value of experimentation, while negative correlation can increase it under certain conditions.</p>
      
//       <h2>Information Value</h2>
//       <p>The value of information from experimenting with one alternative depends on its correlation with other alternatives. We derive explicit formulas for the marginal value of information and show how it varies with the correlation coefficient.</p>
      
//       <h2>Applications</h2>
//       <p>We apply our framework to several economic problems including R&D portfolio management, technology adoption, and clinical trial design. The results provide new insights into optimal investment strategies in these domains.</p>
      
//       <h2>Conclusion</h2>
//       <p>Correlation among alternatives significantly affects optimal experimentation strategies. Our framework provides practical guidance for decision-makers facing correlated choice problems.</p>
//     `,
//     keywords: [
//       "experimentation",
//       "multi-armed bandits",
//       "correlation",
//       "information value",
//       "R&D",
//     ],
//     publicationDate: "2024-03-05",
//     journal: "Review of Economic Studies",
//     volume: "91",
//     pages: "234-267",
//     doi: "10.1093/restud/rdad123",
//     citations: 6,
//     downloads: 142,
//   },
//   {
//     id: "empirical-welfare-economics",
//     title: "Empirical welfare economics",
//     authors: "Christopher P. Chambers and Federico Echenique",
//     abstract:
//       "This paper develops new methods for empirical welfare analysis that bridge the gap between theoretical welfare economics and empirical applications. We propose novel identification strategies and estimation procedures that allow for robust welfare comparisons without imposing restrictive assumptions on preferences.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Welfare economics provides the theoretical foundation for evaluating economic policies and market outcomes. However, translating theoretical welfare concepts into empirical analysis has proven challenging due to identification problems and data limitations. This paper develops new methods for empirical welfare analysis.</p>
      
//       <h2>Identification Strategy</h2>
//       <p>We propose a novel identification strategy that exploits variation in choice sets to identify welfare measures without requiring knowledge of the underlying utility function. Our approach uses revealed preference theory to bound welfare changes from observed choice data.</p>
      
//       <h2>Estimation Methods</h2>
//       <p>We develop semiparametric estimation procedures that are robust to misspecification of the utility function. The methods allow for unobserved heterogeneity and can handle discrete choice environments with many alternatives.</p>
      
//       <h2>Welfare Bounds</h2>
//       <p>Our approach provides bounds on welfare measures rather than point estimates, reflecting the inherent uncertainty in welfare analysis. We show how these bounds can be tightened with additional data or assumptions.</p>
      
//       <h2>Empirical Applications</h2>
//       <p>We apply our methods to several policy evaluation problems including tax reform, environmental regulation, and healthcare policy. The results demonstrate the practical value of our approach for policy analysis.</p>
      
//       <h2>Conclusion</h2>
//       <p>Our methods provide a robust foundation for empirical welfare analysis that can be applied to a wide range of policy questions without requiring restrictive assumptions.</p>
//     `,
//     keywords: [
//       "welfare economics",
//       "empirical methods",
//       "revealed preferences",
//       "policy evaluation",
//       "identification",
//     ],
//     publicationDate: "2024-02-20",
//     journal: "Journal of Political Economy",
//     volume: "132",
//     pages: "156-189",
//     doi: "10.1086/728456",
//     citations: 11,
//     downloads: 178,
//   },
//   {
//     id: "unified-gross-substitutes-equilibrium",
//     title:
//       "Unified gross substitutes and inverse isotonicity for equilibrium problems",
//     authors: "Alfred Galichon, Larry Samuelson, and Lucas Vernet",
//     abstract:
//       "We develop a unified framework for analyzing equilibrium problems using the concepts of gross substitutes and inverse isotonicity. Our approach provides new insights into the existence, uniqueness, and stability of equilibria in various economic models including matching markets, auctions, and general equilibrium systems.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Gross substitutes is a fundamental concept in economic theory that has been applied to various equilibrium problems. However, existing treatments are often fragmented and lack a unified perspective. This paper develops a comprehensive framework that unifies different applications of gross substitutes and introduces the complementary concept of inverse isotonicity.</p>
      
//       <h2>Mathematical Framework</h2>
//       <p>We define gross substitutes in terms of monotonicity properties of demand correspondences. A demand correspondence satisfies gross substitutes if an increase in the price of one good leads to an increase in the demand for all other goods. Inverse isotonicity is the dual property for supply correspondences.</p>
      
//       <h2>Equilibrium Existence</h2>
//       <p>We establish general conditions under which equilibrium exists in models with gross substitutes preferences. Our results extend beyond the traditional domain of consumer theory to include production, matching, and auction environments.</p>
      
//       <h2>Uniqueness and Stability</h2>
//       <p>Gross substitutes preferences have strong implications for equilibrium uniqueness and stability. We show that under certain conditions, the equilibrium is globally unique and stable under tâtonnement dynamics.</p>
      
//       <h2>Applications</h2>
//       <p>We apply our framework to several economic models including two-sided matching markets, combinatorial auctions, and general equilibrium with production. The unified approach reveals common patterns across these seemingly different applications.</p>
      
//       <h2>Conclusion</h2>
//       <p>Our unified framework provides new insights into equilibrium analysis and opens avenues for future research in economic theory and mechanism design.</p>
//     `,
//     keywords: [
//       "gross substitutes",
//       "equilibrium theory",
//       "matching markets",
//       "auctions",
//       "monotonicity",
//     ],
//     publicationDate: "2024-01-12",
//     journal: "Econometrica",
//     volume: "92",
//     pages: "12-45",
//     doi: "10.3982/ECTA98765",
//     citations: 9,
//     downloads: 167,
//   },
//   {
//     id: "tatonnement-matching-markets",
//     title: "Tâtonnement in matching markets",
//     authors: "Alexander Westkamp",
//     abstract:
//       "This paper studies tâtonnement processes in two-sided matching markets. We analyze the convergence properties of price adjustment mechanisms and their implications for market design. Our results provide new insights into the stability and efficiency of matching markets with price discovery.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Matching markets are fundamental to many economic institutions, from school choice to labor markets. While the theory of stable matchings is well-developed, less is known about the dynamic processes that lead to stable outcomes. This paper studies tâtonnement processes in matching markets.</p>
      
//       <h2>Model Framework</h2>
//       <p>We consider a two-sided matching market where agents on both sides have preferences over potential matches. Prices adjust according to excess demand, and agents revise their preferences based on current prices. The tâtonnement process describes how the market converges to equilibrium.</p>
      
//       <h2>Convergence Analysis</h2>
//       <p>Our main result establishes conditions under which the tâtonnement process converges to a stable matching. We show that convergence depends on the structure of preferences and the speed of price adjustment.</p>
      
//       <h2>Stability Properties</h2>
//       <p>We analyze how the tâtonnement process affects the stability of the final matching. Under certain conditions, the process leads to the unique stable matching, while in other cases, multiple stable matchings may emerge.</p>
      
//       <h2>Market Design Implications</h2>
//       <p>Our results have important implications for the design of matching mechanisms. We show how different price adjustment rules affect market outcomes and provide guidance for mechanism design.</p>
      
//       <h2>Conclusion</h2>
//       <p>Tâtonnement processes provide a natural way to understand the dynamics of matching markets and offer new insights into market design and stability.</p>
//     `,
//     keywords: [
//       "matching markets",
//       "tâtonnement",
//       "stability",
//       "market design",
//       "price discovery",
//     ],
//     publicationDate: "2024-02-15",
//     journal: "American Economic Review",
//     volume: "114",
//     pages: "67-88",
//     doi: "10.1257/aer.20234567",
//     citations: 7,
//     downloads: 134,
//   },
//   {
//     id: "sensitivity-size-tax-competition",
//     title: "Sensitivity versus size: implications for tax competition",
//     authors: "David R. Agrawal, Aqib Bagh, and Mohammed Mardan",
//     abstract:
//       "We analyze the trade-off between tax sensitivity and market size in international tax competition. Our model shows how countries balance the desire to attract mobile capital with the need to maintain tax revenues. The results provide new insights into optimal tax policy in an integrated world economy.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Tax competition between countries has become increasingly important as capital has become more mobile. Countries face a fundamental trade-off: lower taxes may attract more investment but reduce tax revenues. This paper analyzes this trade-off in a general equilibrium framework.</p>
      
//       <h2>Theoretical Model</h2>
//       <p>We develop a model where countries compete for mobile capital by setting tax rates. Capital is sensitive to tax differences but also values market size and other country characteristics. Countries must balance these factors in setting optimal tax policy.</p>
      
//       <h2>Equilibrium Analysis</h2>
//       <p>We characterize the Nash equilibrium of the tax competition game. The equilibrium tax rates depend on the relative importance of tax sensitivity versus market size in capital location decisions.</p>
      
//       <h2>Comparative Statics</h2>
//       <p>We analyze how changes in market size, tax sensitivity, and other parameters affect equilibrium outcomes. The results show that larger markets can sustain higher tax rates, but this advantage diminishes as tax sensitivity increases.</p>
      
//       <h2>Policy Implications</h2>
//       <p>Our analysis provides insights into optimal tax policy in an integrated world economy. We discuss implications for both individual countries and international coordination efforts.</p>
      
//       <h2>Conclusion</h2>
//       <p>The trade-off between tax sensitivity and market size is central to understanding international tax competition and has important implications for tax policy design.</p>
//     `,
//     keywords: [
//       "tax competition",
//       "capital mobility",
//       "optimal taxation",
//       "international economics",
//       "market size",
//     ],
//     publicationDate: "2024-03-12",
//     journal: "Journal of Public Economics",
//     volume: "231",
//     pages: "104-127",
//     doi: "10.1016/j.jpubeco.2024.104567",
//     citations: 5,
//     downloads: 98,
//   },
//   {
//     id: "stochastic-choice-time-risk-preferences",
//     title: "Stochastic choice and the separation of time and risk preferences",
//     authors: "David Dillenberger, Daniel Gottlieb, and Pietro Ortoleva",
//     abstract:
//       "This paper develops a new approach to separating time and risk preferences in stochastic choice models. We show how to identify these preferences separately using choice data over time and under uncertainty. The results have important implications for understanding intertemporal choice and risk attitudes.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Separating time and risk preferences is a fundamental challenge in decision theory. Traditional approaches often confound these preferences, making it difficult to understand the underlying drivers of choice behavior. This paper develops a new approach that cleanly separates time and risk preferences.</p>
      
//       <h2>Identification Strategy</h2>
//       <p>We exploit variation in choice environments to identify time and risk preferences separately. Our approach uses both intertemporal choice data and choice under uncertainty to disentangle these two components of preferences.</p>
      
//       <h2>Stochastic Choice Framework</h2>
//       <p>We develop a stochastic choice model that allows for both time and risk preferences to affect choice probabilities. The model provides a unified framework for analyzing choice behavior across different domains.</p>
      
//       <h2>Empirical Implementation</h2>
//       <p>We implement our approach using experimental data on intertemporal and risky choices. The results show that time and risk preferences can be identified separately and that they have distinct effects on choice behavior.</p>
      
//       <h2>Applications</h2>
//       <p>Our approach has applications in various areas including savings behavior, insurance demand, and investment decisions. We show how the separated preferences can be used to predict choice behavior in new environments.</p>
      
//       <h2>Conclusion</h2>
//       <p>Our approach provides a new way to understand the structure of preferences and has important implications for both theoretical and empirical work in decision theory.</p>
//     `,
//     keywords: [
//       "stochastic choice",
//       "time preferences",
//       "risk preferences",
//       "identification",
//       "intertemporal choice",
//     ],
//     publicationDate: "2024-02-28",
//     journal: "Review of Economic Studies",
//     volume: "91",
//     pages: "189-223",
//     doi: "10.1093/restud/rdac098",
//     citations: 13,
//     downloads: 201,
//   },
//   {
//     id: "priority-search-costly-options",
//     title: "Priority search with costly options",
//     authors: "Jaehong Kim, Mengting Li, and Menghan Xu",
//     abstract:
//       "We study optimal search strategies when agents face costly options and must prioritize their search efforts. Our model incorporates both the cost of search and the value of information, providing new insights into search behavior and market efficiency.",
//     content: `
//       <h2>Introduction</h2>
//       <p>Search is a fundamental activity in many economic contexts, from job search to product search. However, most existing models assume that search is costless or that all options are equally costly to explore. This paper develops a model where search is costly and agents must prioritize their search efforts.</p>
      
//       <h2>Model Setup</h2>
//       <p>We consider an agent who must choose among multiple options, each with different search costs and expected values. The agent must decide which options to search and in what order, taking into account both the cost of search and the potential value of information.</p>
      
//       <h2>Optimal Search Strategy</h2>
//       <p>We characterize the optimal search strategy as a function of the cost structure and value distribution. The optimal strategy involves searching options in order of their expected net value, accounting for the opportunity cost of search.</p>
      
//       <h2>Comparative Statics</h2>
//       <p>We analyze how changes in search costs and value distributions affect the optimal search strategy. The results show that higher search costs lead to more selective search, while higher value variance increases the value of search.</p>
      
//       <h2>Market Implications</h2>
//       <p>Our model has implications for market design and efficiency. We show how search costs affect market outcomes and discuss policy implications for reducing search frictions.</p>
      
//       <h2>Conclusion</h2>
//       <p>Priority search with costly options provides a realistic framework for understanding search behavior and has important implications for market efficiency and policy design.</p>
//     `,
//     keywords: [
//       "search theory",
//       "costly search",
//       "priority search",
//       "market efficiency",
//       "information value",
//     ],
//     publicationDate: "2024-03-18",
//     journal: "Journal of Economic Theory",
//     volume: "216",
//     pages: "78-105",
//     doi: "10.1016/j.jet.2024.03.002",
//     citations: 4,
//     downloads: 87,
//   },
// ];
const baseArticles = [
  {
    id: "tropical-analysis-indivisible-goods",
    title: "Tropical analysis: with an application to indivisible goods",
    authors: "Nicholas Charles Bedard and Jacob K Goeree",
    abstract:
      "This paper introduces tropical analysis as a powerful mathematical framework for studying indivisible goods allocation problems...",
    content: `<h2>Introduction</h2><p>...</p>`,
    keywords: [
      "tropical analysis",
      "indivisible goods",
      "market design",
      "mechanism theory",
      "discrete choice",
    ],
    publicationDate: "2024-01-15",
    journal: "Journal of Economic Theory",
    volume: "215",
    pages: "1-25",
    doi: "10.1016/j.jet.2024.01.001",
    citations: 12,
    downloads: 156,
  },
  {
    id: "antimonotonicity-preference-axioms",
    title:
      "Antimonotonicity for preference axioms: the natural counterpart to comonotonicity",
    authors: "Giulio Principi, Peter P. Wakker, and Ruodu Wang",
    abstract:
      "We introduce the concept of antimonotonicity as the natural dual to comonotonicity in preference theory...",
    content: `<h2>Introduction</h2><p>...</p>`,
    keywords: [
      "antimonotonicity",
      "comonotonicity",
      "preference theory",
      "risk preferences",
      "decision theory",
    ],
    publicationDate: "2024-02-10",
    journal: "Econometrica",
    volume: "92",
    pages: "45-78",
    doi: "10.3982/ECTA12345",
    citations: 8,
    downloads: 203,
  },
];

const articleData = [];

for (let i = 0; i < 150; i++) {
  const base = baseArticles[i % 2];
  articleData.push({
    ...base,
    id: `${base.id}-${i}`,
    title: `${base.title} [Study ${i + 1}]`,
    authors: `${base.authors}`,
    publicationDate: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String(
      (i % 28) + 1
    ).padStart(2, "0")}`,
    volume: `${parseInt(base.volume) + i}`,
    pages: `${1 + i}-${25 + i}`,
    doi: `${base.doi}.${i}`,
    citations: Math.floor(Math.random() * 50),
    downloads: Math.floor(Math.random() * 500),
  });
}

export { articleData };
// Helper function to get article by ID
export const getArticleById = (id) => {
  return articleData.find((article) => article.id === id);
};

// Helper function to get all unique articles (removing duplicates from the original data)
export const getUniqueArticles = () => {
  const uniqueTitles = new Set();
  return articleData.filter((article) => {
    if (uniqueTitles.has(article.title)) {
      return false;
    }
    uniqueTitles.add(article.title);
    return true;
  });
};
