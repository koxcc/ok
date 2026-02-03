const TMDB_API_KEY = "ae39b54fe21d657c5f535174b11f8a82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/w500";

// =============================
// Widget Metadata
// =============================
var WidgetMetadata = {
  id: "curator-tmdb-widget",
  title: "TMDB资源",
  description: "全球最新电影和剧集，自定义筛选",
  author: "curator",
  version: "2.4.0",
  requiredVersion: "0.0.1",

  modules: [
    // 1️⃣ 热门剧集
    { 
      title: "TMDB 热门剧集", 
      functionName: "tmdbPopularTV", 
      cacheDuration: 1800, 
      params: [ 
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ] 
    },

    // 2️⃣ 热门电影
    { 
      title: "TMDB 热门电影", 
      functionName: "tmdbPopularMovies", 
      cacheDuration: 1800, 
      params: [ 
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ] 
    },

    // 3️⃣ 高分内容
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

    // 4️⃣ 播出平台（国内外全部）
    { 
      title: "TMDB 播出平台（国内外）", 
      functionName: "tmdbDiscoverGlobal", 
      cacheDuration: 60, // 60秒刷新
      params: [ 
        { name: "with_networks", title: "播出平台", type: "enumeration", value: "", enumOptions: [
          { title: "全部平台", value: "" },
          { title: "Netflix", value: "213" },
          { title: "Disney+", value: "2739" },
          { title: "Apple TV+", value: "2552" },
          { title: "HBO", value: "49" },
          { title: "Amazon", value: "1024" },
          { title: "Hulu", value: "453" },
          { title: "BBC", value: "332" },
          { title: "腾讯", value: "2007" },
          { title: "爱奇艺", value: "1330" },
          { title: "优酷", value: "1419" },
          { title: "Bilibili", value: "1605" },
          { title: "芒果", value: "1631" },
          { title: "TVB", value: "48" }
        ] },
        { name: "sort_by", title: "排序方式", type: "enumeration", value: "first_air_date.desc", enumOptions: [
          { title: "最新上映↓", value: "first_air_date.desc" },
          { title: "上映时间↑", value: "first_air_date.asc" },
          { title: "人气最高", value: "popularity.desc" },
          { title: "评分最高", value: "vote_average.desc" }
        ] },
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ] 
    },

    // 5️⃣ 出品公司（国内外，中外公司中文显示）
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
// 通用请求函数
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
async function tmdbPopularMovies(params) { 
  const items = await fetchTMDB("/movie/popular", params); 
  return formatItems(items, "movie"); 
}

async function tmdbPopularTV(params) { 
  const items = await fetchTMDB("/tv/popular", params); 
  return formatItems(items, "tv"); 
}

async function tmdbTopRated(params) { 
  const type = params.type || "movie"; 
  const items = await fetchTMDB(`/${type}/top_rated`, params); 
  return formatItems(items, type); 
}

// 全局最新资源（电影 + 剧集，今天及以前，全部平台）
async function tmdbDiscoverGlobal(params) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  let page = 1;
  let allItems = [];
  const MAX_PAGES = 5; // 最多抓取5页，可调整

  // 电影 + 剧集
  const endpoints = ["/discover/movie", "/discover/tv"];
  
  for (const ep of endpoints) {
    while (page <= MAX_PAGES) {
      params.page = page;
      // 强制截止日期
      if (ep.includes("/movie")) params['release_date.lte'] = todayStr;
      else params['first_air_date.lte'] = todayStr;

      const items = await fetchTMDB(ep, params);
      if (!items || items.length === 0) break;

      allItems = allItems.concat(items);
      page++;
    }
    page = 1; // 重置分页
  }

  return formatItems(allItems);
}

// 出品公司
async function tmdbDiscoverByCompany(params) { 
  const items = await fetchTMDB("/discover/movie", params); 
  return formatItems(items, "movie"); 
}
