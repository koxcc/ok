const TMDB_API_KEY = "ae39b54fe21d657c5f535174b11f8a82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/w500";

// =============================
var WidgetMetadata = {
  id: "curator-tmdb-widget",
  title: "TMDB资源",
  description: "按自己喜好做",
  author: "curator",
  version: "2.2.0",
  requiredVersion: "0.0.1",

  modules: [
    // 1️⃣ 全球最新剧集
    { 
      title: "TMDB 全球最新剧集", 
      functionName: "tmdbLatestTV", 
      cacheDuration: 60, // 60秒刷新
      params: [ 
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ] 
    },

    // 2️⃣ 全球最新电影
    { 
      title: "TMDB 全球最新电影", 
      functionName: "tmdbLatestMovie", 
      cacheDuration: 60, 
      params: [ 
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ] 
    },

    // 3️⃣ 热门剧集
    { 
      title: "TMDB 热门剧集", 
      functionName: "tmdbPopularTV", 
      cacheDuration: 1800, 
      params: [ 
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ] 
    },

    // 4️⃣ 热门电影
    { 
      title: "TMDB 热门电影", 
      functionName: "tmdbPopularMovies", 
      cacheDuration: 1800, 
      params: [ 
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ] 
    },

    // 5️⃣ 高分内容
    { 
      title: "TMDB 高分内容", 
      functionName: "tmdbTopRated", 
      cacheDuration: 21600, 
      params: [ 
        { name: "type", title: "类型", type: "enumeration", enumOptions: [ 
          { title: "电影", value: "movie" }, 
          { title: "剧集", value: "tv" } 
        ], value: "movie" }, 
        { name: "language", title: "语言", type: "language", value: "zh-CN" }, 
        { name: "page", title: "页码", type: "page" } 
      ] 
    },

    // 6️⃣ 出品公司
    { 
      title: "TMDB 出品公司", 
      functionName: "tmdbDiscoverByCompany", 
      cacheDuration: 21600, 
      params: [ 
        { 
          name: "with_companies", 
          title: "出品公司", 
          type: "enumeration", 
          value: "", 
          enumOptions: [
            // 国外公司中文
            { title: "漫威", value: "420" },
            { title: "皮克斯", value: "3" },
            { title: "迪士尼", value: "2" },
            { title: "华纳兄弟", value: "174" },
            { title: "派拉蒙", value: "4" },
            { title: "环球", value: "33" },
            { title: "哥伦比亚", value: "5" },
            { title: "A24", value: "41077" },
            // 国内公司
            { title: "腾讯", value: "2007" },
            { title: "爱奇艺", value: "1330" },
            { title: "优酷", value: "1419" },
            { title: "芒果", value: "1631" },
            { title: "Bilibili", value: "1605" },
            { title: "华策影视", value: "6538" },
            { title: "光线传媒", value: "1161" },
            { title: "阿里影业", value: "521" },
            { title: "北京文化", value: "1831" }
          ] 
        },
        { name: "sort_by", title: "排序", type: "enumeration", value: "popularity.desc", enumOptions: [ 
          { title: "人气最高", value: "popularity.desc" }, 
          { title: "评分最高", value: "vote_average.desc" } 
        ] },
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" } 
      ] 
    }
  ]
};

// =============================
// 拼接 URL
// =============================
function buildUrl(endpoint, params) {
  let url = BASE_URL + endpoint + '?api_key=' + TMDB_API_KEY;
  for (let k in params) {
    if (params[k] !== undefined && params[k] !== '') {
      url += `&${k}=${encodeURIComponent(params[k])}`;
    }
  }
  return url;
}

// =============================
// 通用请求函数
// =============================
async function fetchTMDB(endpoint, params = {}) {
  const url = buildUrl(endpoint, params);
  const res = await Widget.http.get(url);
  const json = res.data;
  return json.results || json || [];
}

// =============================
// 格式化 + 过滤
// =============================
function formatItems(items, mediaType) {
  return items
    .filter(i => i.vote_average >= 4 && i.poster_path)
    .map(i => ({
      id: i.id.toString(),
      type: "tmdb",
      mediaType: mediaType || (i.title ? "movie" : "tv"),
      title: i.title || i.name,
      posterPath: IMAGE + i.poster_path,
      backdropPath: i.backdrop_path ? IMAGE + i.backdrop_path : undefined,
      releaseDate: i.release_date || i.first_air_date,
      rating: i.vote_average,
      description: i.overview
    }));
}

// =============================
// 模块实现函数
// =============================

// 热门电影
async function tmdbPopularMovies(params) { 
  const items = await fetchTMDB("/movie/popular", params); 
  return formatItems(items, "movie"); 
}

// 热门剧集
async function tmdbPopularTV(params) { 
  const items = await fetchTMDB("/tv/popular", params); 
  return formatItems(items, "tv"); 
}

// 高分内容
async function tmdbTopRated(params) { 
  const type = params.type || "movie"; 
  const items = await fetchTMDB(`/${type}/top_rated`, params); 
  return formatItems(items, type); 
}

// 全球最新剧集
async function tmdbLatestTV(params) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  params['first_air_date.lte'] = todayStr;
  let page = 1;
  let allItems = [];
  const MAX_PAGES = 5;

  while (page <= MAX_PAGES) {
    params.page = page;
    const items = await fetchTMDB("/discover/tv", params);
    if (!items || items.length === 0) break;
    allItems = allItems.concat(items);
    page++;
  }

  allItems.sort((a,b) => new Date(b.first_air_date) - new Date(a.first_air_date));
  return formatItems(allItems, "tv");
}

// 全球最新电影
async function tmdbLatestMovie(params) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  params['release_date.lte'] = todayStr;
  let page = 1;
  let allItems = [];
  const MAX_PAGES = 5;

  while (page <= MAX_PAGES) {
    params.page = page;
    const items = await fetchTMDB("/discover/movie", params);
    if (!items || items.length === 0) break;
    allItems = allItems.concat(items);
    page++;
  }

  allItems.sort((a,b) => new Date(b.release_date) - new Date(a.release_date));
  return formatItems(allItems, "movie");
}

// 出品公司
async function tmdbDiscoverByCompany(params) { 
  const items = await fetchTMDB("/discover/movie", params); 
  return formatItems(items, "movie"); 
}
