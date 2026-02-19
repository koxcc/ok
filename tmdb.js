const TMDB_API_KEY = "ae39b54fe21d657c5f535174b11f8a82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/";

// =============================
var WidgetMetadata = {
  id: "tmdb_full_open_widget",
  title: "TMDB资源模块",
  description: "趋势、热榜、平台一站式的资源模块",
  author: "白馆长",
  version: "0.0.9",
  requiredVersion: "0.0.1",
  modules: [
    { 
      title: "TMDB 今日趋势",
      functionName: "tmdbTrendingToday",
      cacheDuration: 60,
      params: [
        { name: "media_type", title: "类型", type: "enumeration", value: "all",
          enumOptions: [
            { title: "全部", value: "all" },
            { title: "电影", value: "movie" },
            { title: "剧集", value: "tv" }
          ]
        },
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    { 
      title: "TMDB 本周趋势",
      functionName: "tmdbTrendingWeek",
      cacheDuration: 60,
      params: [
        { name: "media_type", title: "类型", type: "enumeration", value: "all",
          enumOptions: [
            { title: "全部", value: "all" },
            { title: "电影", value: "movie" },
            { title: "剧集", value: "tv" }
          ]
        },
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    { title: "TMDB 热门电影", functionName: "tmdbPopularMovies", cacheDuration: 60, params: [ { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    { title: "TMDB 热门剧集", functionName: "tmdbPopularTV", cacheDuration: 60, params: [ { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    { title: "TMDB 高分内容", functionName: "tmdbTopRated", cacheDuration: 60, params: [ { name: "type", title: "类型", type: "enumeration", enumOptions: [ { title: "电影", value: "movie" }, { title: "剧集", value: "tv" } ], value: "movie" }, { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    { 
      title: "TMDB 播出平台", 
      functionName: "tmdbDiscoverByNetwork", 
      cacheDuration: 60, 
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
          { title: "哔哩哔哩", value: "1605" },
          { title: "芒果TV", value: "1631" },
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
    { 
      title: "TMDB 出品公司", 
      functionName: "tmdbDiscoverByCompany", 
      cacheDuration: 60, 
      params: [ 
        { name: "with_companies", title: "出品公司", type: "enumeration", value: "420", enumOptions: [
          { title: "漫威", value: "420" },         
          { title: "皮克斯", value: "3" },         
          { title: "迪士尼", value: "2" },         
          { title: "华纳兄弟", value: "174" },     
          { title: "派拉蒙", value: "4" },         
          { title: "环球影业", value: "33" },      
          { title: "哥伦比亚", value: "5" },       
          { title: "A24", value: "41077" },        
          { title: "索尼影业", value: "34" }       
        ] }, 
        { name: "sort_by", title: "排序", type: "enumeration", value: "popularity.desc", enumOptions: [ { title: "人气最高", value: "popularity.desc" }, { title: "评分最高", value: "vote_average.desc" } ] },
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
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  if (endpoint.includes("/discover/tv") && !params['first_air_date.lte']) {
    params['first_air_date.lte'] = todayStr;
  }

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
  let json;
  try { 
      json = typeof res.data === "string" ? JSON.parse(res.data) : res.data; 
  } catch(e) { 
      json = {}; 
  }
  return json.results || json || [];
}

// =============================
// 类型映射
// =============================
const genreMap = {
  28: "动作", 12: "冒险", 16: "动画", 35: "喜剧", 80: "犯罪", 99: "纪录片",
  18: "剧情", 10751: "家庭", 14: "奇幻", 36: "历史", 27: "恐怖",
  10402: "音乐", 9648: "悬疑", 10749: "爱情", 878: "科幻",
  10770: "电视电影", 53: "惊悚", 10752: "战争", 37: "西部"
};

// =============================
// 日期与类型格式化
// =============================
function formatDateAndType(item, cardStyle) {
  const dateStr = item.release_date || item.first_air_date || "";
  const genres = item.genre_ids || [];
  const typeStr = genres.length ? '·' + genres.map(g => genreMap[g] || g).join('·') : '';
  if (cardStyle === "Backdrop") {
    // 横版：年份 + 类型
    const yyyy = dateStr ? dateStr.slice(0,4) : "未知";
    return yyyy + typeStr;
  } else {
    // 竖版：完整日期，不显示类型
    return dateStr || "未知";
  }
}

// =============================
// 通用数据格式化
// =============================
function formatItems(items, mediaType, cardStyle="Poster") {
  return items
    .filter(i => i.poster_path || i.backdrop_path)
    .map(i => {
      let title = '';
      switch (i.media_type) {
        case 'movie':
          title = i.title || i.original_title;
          break;
        case 'tv':
          title = i.name || i.original_name;
          break;
        default:
          title = i.title || i.name || i.original_title || i.original_name;
      }
      title = title || "未知";

      return {
        id: i.id.toString(),
        type: "tmdb",
        mediaType: mediaType || i.media_type || (i.title ? "movie" : "tv"),
        title,
        posterPath: IMAGE + "w500" + (i.poster_path || ""),
        backdropPath: i.backdrop_path ? IMAGE + "w1280" + i.backdrop_path : undefined,
        releaseDate: formatDateAndType(i, cardStyle),
        rating: i.vote_average,
        description: i.overview
      };
    });
}

// =============================
// 模块函数实现
// =============================
async function tmdbPopularMovies(params) { 
  const items = await fetchTMDB("/movie/popular", params); 
  return formatItems(items, "movie", "Poster"); 
}

async function tmdbPopularTV(params) { 
  const items = await fetchTMDB("/tv/popular", params); 
  return formatItems(items, "tv", "Poster"); 
}

async function tmdbTopRated(params) { 
  const type = params.type || "movie"; 
  const items = await fetchTMDB(`/${type}/top_rated`, params); 
  return formatItems(items, type, "Poster"); 
}

async function tmdbDiscoverByNetwork(params) { 
  const items = await fetchTMDB("/discover/tv", params); 
  return formatItems(items, "tv", "Poster"); 
}

async function tmdbDiscoverByCompany(params) { 
  const items = await fetchTMDB("/discover/movie", params);
  const companyMap = {
    "420": "漫威","3": "皮克斯","2": "迪士尼","174": "华纳兄弟","4": "派拉蒙",
    "33": "环球影业","5": "哥伦比亚","41077": "A24","34": "索尼影业"
  };
  return items
    .filter(i => i.poster_path)
    .map(i => ({
      id: i.id.toString(),
      type: "tmdb",
      mediaType: "movie",
      title: i.title || i.original_title || i.name || i.original_name,
      posterPath: IMAGE + "w500" + i.poster_path,
      backdropPath: i.backdrop_path ? IMAGE + "w1280" + i.backdrop_path : undefined,
      releaseDate: i.release_date || i.first_air_date,
      rating: i.vote_average,
      description: i.overview,
      company: companyMap[params.with_companies] || params.with_companies || "未知公司"
    }));
}

// =============================
// 今日/本周趋势模块
// =============================
async function tmdbTrendingToday(params) {
  const type = params.media_type || "all";
  const items = await fetchTMDB(`/trending/${type}/day`, params);
  return formatItems(items, type, "Backdrop"); // 横版大图
}

async function tmdbTrendingWeek(params) {
  const type = params.media_type || "all";
  const items = await fetchTMDB(`/trending/${type}/week`, params);
  return formatItems(items, type, "Backdrop"); // 横版大图
}
