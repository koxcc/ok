WidgetMetadata = {
  title: "TMDB资源模块",
  description: "趋势、热榜、平台一站式的模块资源",
  author: "Hakuna Matata",
  version: "0.0.6",
  requiredVersion: "0.0.2",
  detailCacheDuration: 60,
  modules: [
     {
      title: "TMDB 今日趋势",
      description: "今日的全部趋势",
      requiresWebView: false,
      functionName: "loadTrendingAllDay",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      title: "TMDB 本周趋势",
      description: "本周全部趋势",
      requiresWebView: false,
      functionName: "loadTrendingAllWeek",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      title: "TMDB 热门剧集",
      description: "今日热门电视剧",
      requiresWebView: false,
      functionName: "loadTodayHotTV",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "sort_by", title: "地区", type: "enumeration", enumOptions: [{ title: "全部地区", value: "" }, { title: "中国", value: "CN" }, { title: "美国", value: "US" }, { title: "韩国", value: "KR" }, { title: "日本", value: "JP" }], value: "" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      title: "TMDB 热门电影",
      description: "今日热门电影",
      requiresWebView: false,
      functionName: "loadTodayHotMovies",
      cacheDuration: 3600,
      params: [
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "sort_by", title: "地区", type: "enumeration", enumOptions: [{ title: "全部地区", value: "" }, { title: "中国", value: "CN" }, { title: "美国", value: "US" }, { title: "韩国", value: "KR" }, { title: "日本", value: "JP" }], value: "" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      title: "TMDB 高分内容",
      description: "高分电影或剧集",
      requiresWebView: false,
      functionName: "tmdbTopRated",
      cacheDuration: 3600,
      params: [
        { name: "type", title: "🎭类型", type: "enumeration", enumOptions: [{ title: "电影", value: "movie" }, { title: "剧集", value: "tv" }], value: "movie" },
        { name: "language", title: "语言", type: "language", value: "zh-CN" },
        { name: "page", title: "页码", type: "page" }
      ]
    },
    {
      title: "TMDB 播出平台",
      description: "按平台筛选剧集",
      requiresWebView: false,
      functionName: "tmdbDiscoverByNetwork",
      cacheDuration: 3600,
      params: [
        { name: "with_networks", title: "平台", type: "enumeration", enumOptions: [{ title: "全部", value: "" }, { title: "Netflix", value: "213" }, { title: "Disney+", value: "2739" }, { title: "HBO", value: "49" }], value: "" },
        { name: "with_genres", title: "类型", type: "enumeration", enumOptions: [{ title: "全部", value: "" }, { title: "动画", value: "16" }, { title: "喜剧", value: "35" }, { title: "剧情", value: "18" }], value: "" },
        { name: "air_status", title: "状态", type: "enumeration", enumOptions: [{ title: "已上映", value: "released" }, { title: "未上映", value: "upcoming" }], value: "released" },
        { name: "sort_by", title: "排序", type: "enumeration", enumOptions: [{ title: "上映时间↓", value: "first_air_date.desc" }, { title: "人气最高", value: "popularity.desc" }], value: "first_air_date.desc" },
        { name: "page", title: "页码", type: "page" },
        { name: "language", title: "语言", type: "language", value: "zh-CN" }
      ]
    },
    {
      title: "TMDB 出品公司",
      description: "按公司筛选电影",
      requiresWebView: false,
      functionName: "tmdbCompanies",
      cacheDuration: 3600,
      params: [
        { name: "with_companies", title: "公司", type: "enumeration", enumOptions: [{ title: "全部", value: "" }, { title: "Disney", value: "2" }, { title: "Warner Bros", value: "174" }, { title: "Marvel", value: "420" }], value: "" },
        { name: "with_genres", title: "类型", type: "enumeration", enumOptions: [{ title: "全部", value: "" }, { title: "动作", value: "28" }, { title: "科幻", value: "878" }, { title: "动画", value: "16" }], value: "" },
        { name: "air_status", title: "状态", type: "enumeration", enumOptions: [{ title: "已上映", value: "released" }, { title: "未上映", value: "upcoming" }], value: "released" },
        { name: "sort_by", title: "排序", type: "enumeration", enumOptions: [{ title: "上映时间↓", value: "primary_release_date.desc" }, { title: "人气最高", value: "popularity.desc" }], value: "primary_release_date.desc" },
        { name: "page", title: "页码", type: "page" },
        { name: "language", title: "语言", type: "language", value: "zh-CN" }
      ]
    },
    {
      title: "TMDB 搜索屏蔽",
      description: "按名称/类型屏蔽",
      requiresWebView: false,
      functionName: "searchAndBlock",
      cacheDuration: 0,
      params: [
        { name: "block_type", title: "屏蔽类型", type: "enumeration", enumOptions: [{ title: "按名称", value: "by_name" }, { title: "按类型", value: "by_genre" }, { title: "手动ID", value: "manual_id" }], value: "by_name" },
        { name: "action", title: "操作", type: "enumeration", enumOptions: [{ title: "仅搜索", value: "search_only" }, { title: "搜索并屏蔽", value: "search_and_block" }], value: "search_only" },
        { name: "query", title: "影片名", type: "input", value: "", placeholder: "鬼灭之刃" },
        { name: "genre_name", title: "类型名", type: "input", value: "", placeholder: "真人秀" },
        { name: "language", title: "语言", type: "enumeration", enumOptions: [{ title: "中文", value: "zh-CN" }, { title: "英文", value: "en-US" }], value: "zh-CN" },
        { name: "tmdb_id", title: "TMDB ID", type: "input", value: "", placeholder: "550" },
        { name: "media_type", title: "媒体类型", type: "enumeration", enumOptions: [{ title: "剧集", value: "tv" }, { title: "电影", value: "movie" }], value: "tv" }
      ]
    },
    {
      title: "TMDB 屏蔽管理",
      description: "查看/管理屏蔽",
      requiresWebView: false,
      functionName: "manageBlockedItems",
      cacheDuration: 0,
      params: [
        { name: "manage_type", title: "管理类型", type: "enumeration", enumOptions: [{ title: "屏蔽内容", value: "items" }, { title: "屏蔽类型", value: "genres" }], value: "items" },
        { name: "action", title: "操作", type: "enumeration", enumOptions: [{ title: "查看", value: "view" }, { title: "清空", value: "clear" }, { title: "取消屏蔽", value: "unblock" }, { title: "导出", value: "export" }, { title: "导入", value: "import" }], value: "view" },
        { name: "unblock_id", title: "取消ID", type: "input", value: "", placeholder: "2190", belongTo: { paramName: "action", value: ["unblock"] } },
        { name: "unblock_media_type", title: "媒体类型", type: "enumeration", enumOptions: [{ title: "剧集", value: "tv" }, { title: "电影", value: "movie" }], value: "tv", belongTo: { paramName: "action", value: ["unblock"], paramName2: "manage_type", value2: ["items"] } },
        { name: "import_data", title: "导入数据", type: "input", value: "", placeholder: "550,1399", belongTo: { paramName: "action", value: ["import"] } }
      ]
    },
    {
      title: "豆瓣自定义片单",
      description: "解析豆瓣片单",
      requiresWebView: false,
      functionName: "loadEnhancedDoubanList",
      cacheDuration: 3600,
      params: [
        { name: "url", title: "🔗 片单地址", type: "input", value: "https://www.douban.com/doubanapp/dispatch?uri=/subject_collection/movie_real_time_hotest/&dt_dapp=1" },
        { name: "page", title: "页码", type: "page" }
      ]
    }
  ]
};

// 屏蔽配置
const GENRE_STORAGE_KEY = "forward_blocked_genres";
const STORAGE_KEY = "forward_blocked_items";
const TMDB_GENRE_MAPPING = { "真人秀":10764,"动画":16,"喜剧":35,"剧情":18,"犯罪":80,"科幻":878,"恐怖":27,"纪录片":99 };
const REVERSE_GENRE_MAPPING = Object.fromEntries(Object.entries(TMDB_GENRE_MAPPING).map(([k,v])=>[v,k]));
let blockedIdCache=null, blockedGenresCache=null, blockedItemsCache=null, tmdbGenresCache=null;

function clearAllCaches(){blockedIdCache=null; blockedGenresCache=null; blockedItemsCache=null; tmdbGenresCache=null;}
function clearBlockedIdCache(){blockedIdCache=null;}
function clearBlockedGenresCache(){blockedGenresCache=null;}
function clearBlockedItemsCache(){blockedItemsCache=null;}

function getBlockedIdSet(){
  try{
    if(blockedIdCache) return blockedIdCache;
    const items=getBlockedItems();
    const s=new Set();
    items.forEach(i=>{const id=String(i.id); const nid=parseInt(i.id); s.add(id+"_"+i.media_type); s.add(nid+"_"+i.media_type); s.add(id); s.add(nid);});
    blockedIdCache=s;
    return s;
  }catch{return new Set();}
}

function getBlockedGenres(){try{if(blockedGenresCache)return blockedGenresCache; const s=Widget.storage.get(GENRE_STORAGE_KEY); blockedGenresCache=s?JSON.parse(s):[]; return blockedGenresCache;}catch{return[];}}
function saveBlockedGenres(g){try{Widget.storage.set(GENRE_STORAGE_KEY,JSON.stringify(g)); blockedGenresCache=g; clearBlockedIdCache(); return true;}catch{return false;}}
function getBlockedItems(){try{if(blockedItemsCache)return blockedItemsCache; const s=Widget.storage.get(STORAGE_KEY); blockedItemsCache=s?JSON.parse(s):[]; return blockedItemsCache;}catch{return[];}}
function saveBlockedItems(i){try{Widget.storage.set(STORAGE_KEY,JSON.stringify(i)); blockedItemsCache=i; clearBlockedIdCache(); return true;}catch{return false;}}

function isItemBlocked(item){
  if(!item?.id)return false;
  const s=getBlockedIdSet();
  const id=String(item.id); const nid=parseInt(item.id);
  if(s.has(id)||s.has(nid))return true;
  const mt=item.mediaType||item.media_type;
  if(mt&&(s.has(id+"_"+mt)||s.has(nid+"_"+mt)))return true;
  if(item.originalDoubanId){const did=String(item.originalDoubanId); const dnid=parseInt(item.originalDoubanId); if(s.has(did)||s.has(dnid))return true;}
  return false;
}

function isItemBlockedByGenre(item){
  if(!item?.genre_ids)return false;
  const bg=getBlockedGenres();
  const s=new Set(bg.map(g=>g.id));
  return item.genre_ids.some(id=>s.has(id));
}

function isItemBlockedEnhanced(item){return isItemBlocked(item)||isItemBlockedByGenre(item);}
function filterBlockedItemsEnhanced(items){if(!Array.isArray(items))return items; const s=getBlockedIdSet(); const bg=getBlockedGenres(); const gs=new Set(bg.map(g=>g.id)); return items.filter(i=>{if(!i?.id)return true; const id=String(i.id); const nid=parseInt(i.id); if(s.has(id)||s.has(nid))return false; if(i.genre_ids?.some(g=>gs.has(g)))return false; const mt=i.mediaType||i.media_type; if(mt&&(s.has(id+"_"+mt)||s.has(nid+"_"+mt)))return false; if(i.originalDoubanId){const did=String(i.originalDoubanId); const dnid=parseInt(i.originalDoubanId); if(s.has(did)||s.has(dnid))return false;} return true;});}

function addBlockedGenre(name,id,desc=""){const list=getBlockedGenres(); if(list.some(g=>g.id===id||g.name===name))return false; list.push({id,name,description:desc||`屏蔽${name}`,blocked_date:new Date().toISOString()}); return saveBlockedGenres(list);}
function removeBlockedGenre(id){const list=getBlockedGenres().filter(g=>g.id!==id); return saveBlockedGenres(list);}
function addBlockedItem(item){const list=getBlockedItems(); if(list.some(b=>b.id===String(item.id)&&b.media_type===item.media_type))return false; list.push({id:String(item.id),media_type:item.media_type,title:item.title,poster_path:item.poster_path,overview:item.overview,blocked_date:new Date().toISOString(),vote_average:item.vote_average||0}); return saveBlockedItems(list);}
function removeBlockedItem(id,mt){const list=getBlockedItems().filter(i=>!(i.id===String(id)&&i.media_type===mt)); return saveBlockedItems(list);}
function clearBlockedItems(){try{Widget.storage.clear(); clearAllCaches(); return true;}catch{return false;}}

// 辅助函数
async function fetchTmdbGenres(){if(tmdbGenresCache)return tmdbGenresCache; const [mg,tg]=await Promise.all([Widget.tmdb.get('/genre/movie/list',{params:{language:'zh-CN'}}),Widget.tmdb.get('/genre/tv/list',{params:{language:'zh-CN'}})]); tmdbGenresCache={movie:mg.genres.reduce((a,c)=>({...a,[c.id]:c.name}),{}),tv:tg.genres.reduce((a,c)=>({...a,[c.id]:c.name}),{})}; return tmdbGenresCache;}
function getTmdbGenreTitles(ids,mt){const map=tmdbGenresCache?.[mt]||{}; return ids.slice(0,3).map(id=>map[id]||`未知(${id})`).filter(Boolean).join('•');}
function getDoubanGenreTitles(g){if(!g)return""; let arr=[]; if(typeof g==="string")arr=g.split(/[\/、, \s]+/).map(s=>s.trim()).filter(Boolean); else if(Array.isArray(g))arr=g.map(s=>s?.trim()).filter(Boolean); const u=[...new Set(arr)]; return u.slice(0,3).join(' ');}
function extractGenresFromText(t){if(!t)return[]; const kw=["动作","科幻","灾难","爱情","喜剧","悬疑","犯罪","冒险","奇幻","战争","历史","武侠","惊悚","恐怖","动画","剧情","西部","家庭","音乐","运动","古装","歌舞","传记","短片","纪录片","文艺","青春","校园","职场","都市","农村","军事","警探","谍战","宫廷","神话","魔幻"]; const set=new Set(); kw.forEach(k=>t.includes(k)&&set.add(k)); return Array.from(set).slice(0,3);}
function formatItemDescription(item){let d=item.description||""; if(item.itemType&&!/类型|type/i.test(d))d=`类型: ${item.itemType} | `+d; if(item.rating&&!/评分|rating/i.test(d))d=`评分: ${item.rating} | `+d; if(item.releaseDate){const y=String(item.releaseDate).slice(0,4); if(/^\d{4}$/.test(y)&&!/年份|year/i.test(d))d=`年份: ${y} | `+d;} return d.replace(/^\|*\s*|\s*\|*$/g,"");}
function calculatePagination(p){const page=Math.max(1,parseInt(p.page)||1); const limit=parseInt(p.limit)||20; const start=(page-1)*limit; return {page,limit,start};}
function getBeijingDate(){const d=new Date(); const utc=d.getTime()+d.getTimezoneOffset()*60000; const bj=new Date(utc+8*3600000); const y=bj.getFullYear(); const m=String(bj.getMonth()+1).padStart(2,'0'); const day=String(bj.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`;}
function parseDoubanAppDispatchUrl(u){u=u.trim().replace(/\s/g,""); const q=u.split('?')[1]||""; const params=new URLSearchParams(q); const uri=params.get('uri')||""; if(uri.includes('subject_collection/'))return `https://m.douban.com/${uri.replace(/^\//,"")}`; if(uri.includes('doulist/'))return `https://www.douban.com/${uri.replace(/^\//,"")}`; return null;}

// TMDB 请求
const MIN_VOTE_COUNT={movie:50,tv:30};
const POPULARITY_QUALITY_STANDARDS={movie:{minVoteCount:10,minVoteAverage:3.0},tv:{minVoteCount:1,minVoteAverage:3.0}};
const DOMESTIC_PLATFORMS=['2007','1330','1419','1605','1631'];
const DOMESTIC_MIN_VOTE_COUNT={tv:5};
const DOMESTIC_PLATFORM_STANDARDS={movie:{minVoteCount:5,minVoteAverage:3.0},tv:{minVoteCount:1,minVoteAverage:3.0}};

async function fetchTmdbData(api,p){const [data,genres]=await Promise.all([Widget.tmdb.get(api,{params:p}),fetchTmdbGenres()]); const res=data.results.filter(it=>{const mt=it.media_type||(it.title?"movie":"tv"); const ok=it.poster_path&&it.id&&(it.title||it.name)?.trim()&&it.genre_ids?.length; if(!ok)return false; if(p.sort_by==="vote_average.desc"){const dom=DOMESTIC_PLATFORMS.includes(String(p.with_networks)); const min=dom?DOMESTIC_MIN_VOTE_COUNT[mt]:MIN_VOTE_COUNT[mt]; return it.vote_count>=min;} return true;}).map(it=>{const mt=it.media_type||(it.title?"movie":"tv"); return{id:it.id,type:"tmdb",title:it.title||it.name,description:it.overview,releaseDate:it.release_date||it.first_air_date,backdropPath:it.backdrop_path,posterPath:it.poster_path,rating:it.vote_average,mediaType:mt,genreTitle:getTmdbGenreTitles(it.genre_ids,mt),genre_ids:it.genre_ids};}); return filterBlockedItemsEnhanced(res);}

// 热门剧集 & 电影（已修复）
async function loadTodayHotTV(p) {
  const page = parseInt(p.page) || 1;
  const region = p.sort_by || "";
  const lang = p.language || "zh-CN";
  
  if (region) {
    const dom = region === "CN";
    const std = dom ? DOMESTIC_PLATFORM_STANDARDS.tv : POPULARITY_QUALITY_STANDARDS.tv;
    return fetchTmdbData("/discover/tv", {
      language: lang,
      page,
      with_origin_country: region,
      sort_by: "popularity.desc",
      "vote_count.gte": std.minVoteCount,
      "vote_average.gte": std.minVoteAverage
    });
  }
  
  return fetchTmdbData("/trending/tv/day", { language: lang, page });
}

async function loadTodayHotMovies(p) {
  const page = parseInt(p.page) || 1;
  const region = p.sort_by || "";
  const lang = p.language || "zh-CN";
  
  if (region) {
    const dom = region === "CN";
    const std = dom ? DOMESTIC_PLATFORM_STANDARDS.movie : POPULARITY_QUALITY_STANDARDS.movie;
    return fetchTmdbData("/discover/movie", {
      language: lang,
      page,
      with_origin_country: region,
      sort_by: "popularity.desc",
      "vote_count.gte": std.minVoteCount,
      "vote_average.gte": std.minVoteAverage
    });
  }
  
  return fetchTmdbData("/trending/movie/day", { language: lang, page });
}

// 今日趋势 + 本周趋势 · 全部（电影+剧集混排）
async function loadTrendingAllDay(p) {
  const page = parseInt(p.page) || 1;
  const lang = p.language || "zh-CN";
  return fetchTmdbData("/trending/all/day", { language: lang, page });
}
async function loadTrendingAllWeek(p) {
  const page = parseInt(p.page) || 1;
  const lang = p.language || "zh-CN";
  return fetchTmdbData("/trending/all/week", { language: lang, page });
}

async function tmdbTopRated(p){const t=p.type||"movie"; return fetchTmdbData(`/${t}/top_rated`,{language:p.language||"zh-CN",page:p.page||1});}
async function tmdbDiscoverByNetwork(p={}){const today=getBeijingDate(); const q={language:p.language||"zh-CN",page:p.page||1,with_networks:p.with_networks,with_genres:p.with_genres,sort_by:p.sort_by||"first_air_date.desc"}; if(q.sort_by==="vote_average.desc"){const dom=DOMESTIC_PLATFORMS.includes(String(p.with_networks)); q["vote_count.gte"]=dom?DOMESTIC_MIN_VOTE_COUNT.tv:MIN_VOTE_COUNT.tv;} if(p.air_status==="released")q["first_air_date.lte"]=today; else if(p.air_status==="upcoming")q["first_air_date.gte"]=today; return fetchTmdbData("/discover/tv",q);}
async function tmdbCompanies(p={}){const today=getBeijingDate(); const q={language:p.language||"zh-CN",page:p.page||1,with_companies:p.with_companies,sort_by:p.sort_by||"primary_release_date.desc",include_adult:false,include_video:false}; if(q.sort_by==="vote_average.desc")q["vote_count.gte"]=MIN_VOTE_COUNT.movie; if(q.sort_by==="popularity.desc"){q["vote_count.gte"]=POPULARITY_QUALITY_STANDARDS.movie.minVoteCount; q["vote_average.gte"]=POPULARITY_QUALITY_STANDARDS.movie.minVoteAverage;} if(q.sort_by==="vote_average.desc")q["vote_average.gte"]=6.0; if(p.air_status==="released")q["primary_release_date.lte"]=today; else if(p.air_status==="upcoming")q["primary_release_date.gte"]=today; return fetchTmdbData("/discover/movie",q);}

// 屏蔽搜索/管理
async function searchAndBlock(p){const bt=p.block_type||"by_name"; const act=p.action||"search_only"; if(bt==="by_genre"){const name=(p.genre_name||"").trim(); const id=TMDB_GENRE_MAPPING[name]; if(!id)return[{id:"g_err",type:"info",title:"⚠️ 不支持的类型",description:`可屏蔽：${Object.keys(TMDB_GENRE_MAPPING).join('、')}`}]; const ok=addBlockedGenre(name,id); return[{id:"g_ok",type:"info",title:ok?"✅ 已屏蔽类型":"ℹ️ 已存在",description:`屏蔽【${name}】`}];} if(bt==="manual_id"){const id=p.tmdb_id?.trim(); const mt=p.media_type||"tv"; if(!id||!/^\d+$/.test(id))return[{id:"m_err",type:"info",title:"⚠️ ID 格式错误"}]; const fake={id,media_type:mt,title:`TMDB ${mt} ${id}`}; const ok=addBlockedItem(fake); return[{id:"m_ok",type:"info",title:ok?"✅ 已屏蔽":"ℹ️ 已存在",description:fake.title}];} const q=(p.query||"").trim(); const lang=p.language||"zh-CN"; if(!q)return[{id:"s_empty",type:"info",title:"🔍 请输入影片名"}]; const [movieRes,tvRes]=await Promise.all([Widget.tmdb.get("/search/movie",{params:{query:q,language:lang}}),Widget.tmdb.get("/search/tv",{params:{query:q,language:lang}})]); const list=[...(movieRes.results||[]).map(i=>({...i,media_type:"movie"})),...(tvRes.results||[]).map(i=>({...i,media_type:"tv"}))].filter(i=>i.poster_path&&i.id&&(i.title||i.name)).slice(0,15); if(act==="search_only")return list.map(i=>({id:i.id,type:"tmdb",title:i.title||i.name,description:i.overview,posterPath:i.poster_path,mediaType:i.media_type,link:`block://${i.id}/${i.media_type}/${encodeURIComponent(i.title||i.name)}`})); const added=[]; for(const i of list.slice(0,5))if(addBlockedItem(i))added.push(i.title||i.name); return[{id:"b_res",type:"info",title:"✅ 批量屏蔽完成",description:`已屏蔽：${added.join('、')||'无新项目'}`}];}
async function manageBlockedItems(p){const mt=p.manage_type||"items"; const act=p.action||"view"; if(act==="clear"){const ok=clearBlockedItems(); return[{id:"clr",type:"info",title:ok?"✅ 已清空":"❌ 失败",description:ok?"所有屏蔽已清除":"操作异常"}];} if(act==="unblock"){const id=p.unblock_id?.trim(); const umt=p.unblock_media_type||"tv"; if(!id)return[{id:"ub_err",type:"info",title:"⚠️ 请输入ID"}]; const ok=mt==="items"?removeBlockedItem(id,umt):removeBlockedGenre(parseInt(id)); return[{id:"ub_ok",type:"info",title:ok?"✅ 已取消":"❌ 失败",description:`ID：${id}`}];} if(act==="export"){const items=getBlockedItems(); const ids=items.map(i=>i.id).join(','); return[{id:"exp",type:"info",title:"📤 导出屏蔽列表",description:`共 ${items.length} 个：\n${ids||'空'}`}];} if(act==="import"){const data=(p.import_data||"").trim().replace(/['"]/g,''); if(!data)return[{id:"imp_empty",type:"info",title:"⚠️ 请输入数据"}]; const ids=data.split(',').map(s=>s.trim()).filter(s=>/^\d+$/.test(s)); const items=getBlockedItems(); let c=0; for(const id of ids){const exist=items.some(i=>i.id===id); if(!exist){items.push({id,media_type:"movie",title:`ID ${id}`,poster_path:"",overview:"导入",blocked_date:new Date().toISOString()}); c++;}} saveBlockedItems(items); return[{id:"imp_ok",type:"info",title:"✅ 导入完成",description:`新增 ${c} 个，总计 ${items.length}`}];} if(mt==="genres"){const list=getBlockedGenres(); if(!list.length)return[{id:"g_empty",type:"info",title:"ℹ️ 无屏蔽类型"}]; return list.map(g=>({id:`g_${g.id}`,type:"info",title:`🚫 ${g.name}`,description:g.description||`ID：${g.id}`}));} const items=getBlockedItems(); if(!items.length)return[{id:"b_empty",type:"info",title:"ℹ️ 屏蔽列表为空"}]; const sorted=[...items].sort((a,b)=>new Date(b.blocked_date)-new Date(a.blocked_date)); return[{id:"tip",type:"info",title:"💡 取消屏蔽说明",description:"记录ID → 操作选【取消屏蔽】→ 填入ID"},...sorted.map(i=>({id:`b_${i.id}_${i.media_type}`,type:"info",title:`🚫 ${i.title}`,description:`${i.media_type==="movie"?"电影":"剧集"} | ID：${i.id} | ${i.blocked_date.slice(0,10)}`,posterPath:i.poster_path?`https://image.tmdb.org/t/p/w500${i.poster_path}`:"",mediaType:i.media_type,link:`unblock://${i.id}/${i.media_type}/${encodeURIComponent(i.title)}`}))];}

// 详情函数
async function loadDetail(link){try{if(link.startsWith("block://")){const parts=link.replace("block://","").split("/"); const [id,mediaType,encodedTitle]=parts; const title=decodeURIComponent(encodedTitle); const endpoint=mediaType==="movie"?`/movie/${id}`:`/tv/${id}`; const res=await Widget.tmdb.get(endpoint,{params:{language:"zh-CN"}}); const item=res.data||res; const ok=addBlockedItem({id,media_type:mediaType,title:item.title||item.name,poster_path:item.poster_path,overview:item.overview,vote_average:item.vote_average}); return{videoUrl:"",title:ok?"✅ 屏蔽成功":"ℹ️ 已存在",description:`${mediaType==="movie"?"电影":"剧集"}「${title}」已加入屏蔽`};} if(link.startsWith("unblock://")){const parts=link.replace("unblock://","").split("/"); const [id,mediaType,encodedTitle]=parts; const ok=removeBlockedItem(id,mediaType); return{videoUrl:"",title:ok?"✅ 取消屏蔽成功":"❌ 失败",description:`ID ${id} 已从屏蔽列表移除`};} return{videoUrl:"",title:"❌ 无效链接",description:"无法识别操作"};}catch(e){return{videoUrl:"",title:"❌ 操作失败",description:e.message};}}

// 豆瓣片单
async function loadEnhancedDoubanList(p){const url=p.url; if(url.includes("doubanapp/dispatch")){const parsed=parseDoubanAppDispatchUrl(url); if(parsed)return loadEnhancedDoubanList({...p,url:parsed});} if(url.includes("subject_collection/"))return loadEnhancedSubjectCollection(p); if(url.includes("doulist/"))return loadEnhancedDefaultList(p); return[];}
async function loadEnhancedSubjectCollection(p){const listId=p.url.match(/subject_collection\/(\w+)/)?.[1]; if(!listId)return[]; const page=p.page||1; const start=(page-1)*20; const apiUrl=`https://m.douban.com/rexxar/api/v2/subject_collection/${listId}/items?start=${start}&count=20&updated_at&items_only=1&for_mobile=1`; const res=await Widget.http.get(apiUrl,{headers:{Referer:`https://m.douban.com/subject_collection/${listId}/`,"User-Agent":"Mozilla/5.0"}}); const items=res.data?.subject_collection_items||[]; return filterBlockedItemsEnhanced(items.map(i=>({id:i.id,type:"douban",title:i.title,description:formatItemDescription({description:i.card_subtitle,rating:i.rating?.value,releaseDate:i.year}),rating:i.rating?.value,releaseDate:i.year,genreTitle:getDoubanGenreTitles(i.genres),coverUrl:i.cover?.url})));}
async function loadEnhancedDefaultList(p){const listId=p.url.match(/doulist\/(\d+)/)?.[1]; if(!listId)return[]; const page=p.page||1; const start=(page-1)*25; const pageUrl=`https://www.douban.com/doulist/${listId}/?start=${start}`; const res=await Widget.http.get(pageUrl,{headers:{Referer:"https://movie.douban.com","User-Agent":"Mozilla/5.0"}}); const doc=Widget.dom.parse(res.data); const links=Widget.dom.select(doc,".doulist-item .title a"); const doubanItems=[]; for(const el of links){const text=await Widget.dom.text(el); const title=text.trim().split(' ')[0]; if(title)doubanItems.push({title,type:"multi"});} return filterBlockedItemsEnhanced(await fetchImdbItemsForDouban(doubanItems));}
async function fetchImdbItemsForDouban(items){const res=[]; for(const i of items){const [movieRes,tvRes]=await Promise.all([Widget.tmdb.get("/search/movie",{params:{query:i.title,language:"zh-CN"}}),Widget.tmdb.get("/search/tv",{params:{query:i.title,language:"zh-CN"}})]); const match=[...movieRes.results,...tvRes.results].find(m=>m.poster_path); if(match)res.push({id:match.id,type:"tmdb",title:match.title||match.name,description:match.overview,releaseDate:match.release_date||match.first_air_date,posterPath:match.poster_path,rating:match.vote_average,mediaType:match.media_type||"movie",genreTitle:getTmdbGenreTitles(match.genre_ids,match.media_type||"movie")});} return res;}
  
