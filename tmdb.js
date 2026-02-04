const TMDB_API_KEY = "ae39b54fe21d657c5f535174b11f8a82";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE = "https://image.tmdb.org/t/p/w500";

// =============================
// Widget curator
// =============================
var WidgetMetadata = {
  id: "tmdb_full_open_widget",
  title: "TMDB资源模块",
  description: "",
  author: "Bai",
  version: "0.1.0",
  requiredVersion: "0.0.1",

  modules: [
    { 
      title: "TMDB 今日趋势",
      functionName: "tmdbTrendingToday",
      cacheDuration: 1800,
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
      cacheDuration: 1800,
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
    { title: "TMDB 热门电影", functionName: "tmdbPopularMovies", cacheDuration: 1800, params: [ { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    { title: "TMDB 热门剧集", functionName: "tmdbPopularTV", cacheDuration: 1800, params: [ { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
    { title: "TMDB 高分内容", functionName: "tmdbTopRated", cacheDuration: 21600, params: [ { name: "type", title: "类型", type: "enumeration", enumOptions: [ { title: "电影", value: "movie" }, { title: "剧集", value: "tv" } ], value: "movie" }, { name: "language", title: "语言", type: "language", value: "zh-CN" }, { name: "page", title: "页码", type: "page" } ] },
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

  if (endpoint.includes("/discover/tv")) {
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
  const json = res.data;
  return json.results || json || [];
}

// =============================
// 数据格式化（中文优先 -> 英文 -> 原始片名）
// =============================
function formatItems(items, mediaType) {
  return items
    .filter(i => i.poster_path && i.poster_path.trim() !== "")
    .map(i => {
      let title = '';
      switch (i.media_type) {
        case 'movie':
          title = i.title || i.original_title || i.original_title || "";
          break;
        case 'tv':
          title = i.name || i.original_name || i.original_name || "";
          break;
        case 'person':
          title = i.name || i.original_name || i.original_name || "";
          break;
        default:
          title = i.title || i.name || i.original_title || i.original_name || "";
      }

      return {
        id: i.id.toString(),
        type: "tmdb",
        mediaType: i.media_type === "person" ? "person" : (mediaType || (i.title ? "movie" : "tv")),
        title,
        posterPath: IMAGE + i.poster_path,
        backdropPath: i.backdrop_path ? IMAGE + i.backdrop_path : undefined,
        releaseDate: i.release_date || i.first_air_date,
        rating: i.vote_average,
        description: i.overview
      };
    });
}

// =============================
// 模块实现函数 + 渲染
// =============================
async function tmdbPopularMovies(params) { return renderAndReturn(await fetchTMDB("/movie/popular", params), "movie"); }
async function tmdbPopularTV(params) { return renderAndReturn(await fetchTMDB("/tv/popular", params), "tv"); }
async function tmdbTopRated(params) { const type = params.type || "movie"; return renderAndReturn(await fetchTMDB(`/${type}/top_rated`, params), type); }
async function tmdbDiscoverByNetwork(params) { return renderAndReturn(await fetchTMDB("/discover/tv", params), "tv"); }
async function tmdbDiscoverByCompany(params) { 
  const items = await fetchTMDB("/discover/movie", params);
  const companyMap = { "420":"漫威","3":"皮克斯","2":"迪士尼","174":"华纳兄弟","4":"派拉蒙","33":"环球影业","5":"哥伦比亚","41077":"A24","34":"索尼影业" };
  const formatted = items.filter(i=>i.poster_path && i.poster_path.trim()!=="").map(i=>({
    id:i.id.toString(),
    type:"tmdb",
    mediaType:"movie",
    title:i.title || i.original_title || i.original_title || "",
    posterPath:IMAGE+i.poster_path,
    backdropPath:i.backdrop_path?IMAGE+i.backdrop_path:undefined,
    releaseDate:i.release_date||i.first_air_date,
    rating:i.vote_average,
    description:i.overview,
    company:companyMap[params.with_companies]||"未知公司"
  }));
  renderItems(formatted);
  return formatted;
}
async function tmdbTrendingToday(params) { return renderAndReturn(await fetchTMDB(`/trending/${params.media_type||'all'}/day`, params), params.media_type||"all"); }
async function tmdbTrendingWeek(params) { return renderAndReturn(await fetchTMDB(`/trending/${params.media_type||'all'}/week`, params), params.media_type||"all"); }

// =============================
// 渲染到页面
// =============================
function renderAndReturn(items, mediaType) { 
  const formatted = formatItems(items, mediaType); 
  renderItems(formatted); 
  return formatted;
}

function renderItems(items, containerId="tmdb-widget-container") {
  let container = document.getElementById(containerId);
  if(!container){
    container = document.createElement("div");
    container.id = containerId;
    container.style.display = "grid";
    container.style.gridTemplateColumns = "repeat(auto-fill, minmax(120px,1fr))";
    container.style.gap = "12px";
    container.style.padding = "10px";
    document.body.appendChild(container);
  }
  container.innerHTML = "";

  items.forEach(item=>{
    const card=document.createElement("div");
    card.style.borderRadius="8px";
    card.style.overflow="hidden";
    card.style.background="#fff";
    card.style.boxShadow="0 2px 8px rgba(0,0,0,0.15)";
    card.style.display="flex";
    card.style.flexDirection="column";
    card.style.cursor="pointer";
    card.style.transition="transform 0.2s";
    card.onmouseenter=()=>card.style.transform="scale(1.05)";
    card.onmouseleave=()=>card.style.transform="scale(1)";

    const img=document.createElement("img");
    img.src=item.posterPath;
    img.alt=item.title;
    img.style.width="100%";
    img.style.height="180px";
    img.style.objectFit="cover";
    card.appendChild(img);

    const title=document.createElement("div");
    title.innerText=item.title;
    title.style.fontSize="14px";
    title.style.fontWeight="500";
    title.style.margin="6px 6px 0 6px";
    title.style.overflow="hidden";
    title.style.textOverflow="ellipsis";
    title.style.whiteSpace="nowrap";
    card.appendChild(title);

    const info=document.createElement("div");
    info.innerText=`${item.mediaType.toUpperCase()} | ⭐ ${item.rating}`;
    info.style.fontSize="12px";
    info.style.color="#555";
    info.style.margin="0 6px 6px 6px";
    card.appendChild(info);

    container.appendChild(card);
  });
}
