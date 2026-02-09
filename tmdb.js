const TMDB_API_KEY = "ae39b54fe21d657c5f535174b11f8a82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/";

// =============================
var WidgetMetadata = {
  id: "tmdb_full_open_widget",
  title: "TMDB资源模块",
  description: "趋势、热榜、平台一站式的资源模块",
  author: "白馆长",
  version: "0.0.4",
  requiredVersion: "0.0.1",

  modules: [
    { 
      title: "TMDB 今日趋势",
      functionName: "tmdbTrendingToday",
      cacheDuration: 3600,
      params: [
        { 
          name: "media_type", 
          title: "显示类型", 
          type: "enumeration", 
          value: "all",
          enumOptions: [
            { title: "全部趋势", value: "all" },
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
      cacheDuration: 3600,
      params: [
        { 
          name: "media_type", 
          title: "显示类型", 
          type: "enumeration", 
          value: "all",
          enumOptions: [
            { title: "全部趋势", value: "all" },
            { title: "电影", value: "movie" },
            { title: "剧集", value: "tv" }
          ]
        },
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    // 热门电影
    { title: "TMDB 热门电影", functionName: "tmdbPopularMovies", cacheDuration: 1800, params: [ { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    // 热门剧集
    { title: "TMDB 热门剧集", functionName: "tmdbPopularTV", cacheDuration: 1800, params: [ { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    // 高分内容
    { title: "TMDB 高分内容", functionName: "tmdbTopRated", cacheDuration: 21600, params: [ { name: "type", title: "类型", type: "enumeration", enumOptions: [ { title: "电影", value: "movie" }, { title: "剧集", value: "tv" } ], value: "movie" }, { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    // 播出平台
    { 
      title: "TMDB 播出平台", 
      functionName: "tmdbDiscoverByNetwork", 
      cacheDuration: 21600, 
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
    // 出品公司
    { 
      title: "TMDB 出品公司", 
      functionName: "tmdbDiscoverByCompany", 
      cacheDuration: 21600, 
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
// 数据格式化函数
// =============================
function formatItems(items, mediaType) {
  return items
    .filter(i => i.poster_path && i.poster_path.trim() !== "" && i.media_type !== "person")
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
        title: title,
        posterPath: IMAGE + 'w500' + i.poster_path, // 默认先用中等图
        backdropPath: i.backdrop_path ? IMAGE + 'w500' + i.backdrop_path : undefined,
        releaseDate: i.release_date || i.first_air_date,
        rating: i.vote_average,
        description: i.overview,
        popularity: i.popularity || 0
      };
    });
}

// =============================
// ⭐ 趋势专用高清无字海报（自动适配设备）
async function getTrendingBestPoster(id, mediaType) {
  let quality = 'w500'; // 默认小图

  // 自动判断设备
  if (typeof Device !== 'undefined') {
    if (Device.isTV) {
      quality = 'original'; // Apple TV
    } else if (Device.isMac) {
      quality = 'w780'; // Mac
    } else if (Device.isPhone) {
      quality = 'w500'; // iPhone
    }
  }

  try {
    const res = await Widget.http.get(`${BASE_URL}/${mediaType}/${id}/images?api_key=${TMDB_API_KEY}`);
    const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data;
    if (!data || !data.posters) return null;

    const poster = data.posters
      .filter(p => p.iso_639_1 === null)
      .sort((a, b) => b.height - a.height)[0];

    if (!poster) return null;

    if (quality === 'original') {
      return `https://image.tmdb.org/t/p/original${poster.file_path}`;
    } else {
      // w500/w780 按比例裁切原图
      return `https://image.tmdb.org/t/p/${quality}${poster.file_path}`;
    }
  } catch {
    return null;
  }
}

// =============================
// 趋势排序
function sortTrendingItems(items) {
  return items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
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

async function tmdbDiscoverByNetwork(params) { 
  const items = await fetchTMDB("/discover/tv", params); 
  return formatItems(items, "tv"); 
}

async function tmdbDiscoverByCompany(params) { 
  const items = await fetchTMDB("/discover/movie", params);
  const companyMap = {
    "420": "漫威", "3": "皮克斯", "2": "迪士尼", "174": "华纳兄弟",
    "4": "派拉蒙", "33": "环球影业", "5": "哥伦比亚", "41077": "A24",
    "34": "索尼影业"
  };

  return items
    .filter(i => i.poster_path && i.poster_path.trim() !== "")
    .map(i => ({
      id: i.id.toString(),
      type: "tmdb",
      mediaType: "movie",
      title: i.title || i.original_title || i.name || i.original_name,
      posterPath: IMAGE + 'w500' + i.poster_path,
      backdropPath: i.backdrop_path ? IMAGE + 'w500' + i.backdrop_path : undefined,
      releaseDate: i.release_date || i.first_air_date,
      rating: i.vote_average,
      description: i.overview,
      company: companyMap[params.with_companies] || params.with_companies || "未知公司"
    }));
}

// =============================
// 今日趋势（电影+剧集 + 热度排序 + 高清无字海报）
async function tmdbTrendingToday(params) {
  const movieItems = await fetchTMDB("/trending/movie/day", params);
  const tvItems = await fetchTMDB("/trending/tv/day", params);
  let combined = [...movieItems, ...tvItems];

  let formatted = formatItems(combined);
  formatted = sortTrendingItems(formatted);

  await Promise.all(
    formatted.map(async item => {
      const poster = await getTrendingBestPoster(item.id, item.mediaType);
      if (poster) item.posterPath = poster;
    })
  );

  return formatted;
}

// 本周趋势（电影+剧集 + 热度排序 + 高清无字海报）
async function tmdbTrendingWeek(params) {
  const movieItems = await fetchTMDB("/trending/movie/week", params);
  const tvItems = await fetchTMDB("/trending/tv/week", params);
  let combined = [...movieItems, ...tvItems];

  let formatted = formatItems(combined);
  formatted = sortTrendingItems(formatted);

  await Promise.all(
    formatted.map(async item => {
      const poster = await getTrendingBestPoster(item.id, item.mediaType);
      if (poster) item.posterPath = poster;
    })
  );

  return formatted;
}
