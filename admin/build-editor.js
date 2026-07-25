(function(){
  'use strict';
  const h=window.h;
  const DATA=window.POKEMON_BUILD_DATA||[];
  const NORMAL_ITEMS=["あかいいと", "あつぞこブーツ", "いのちのたま", "おうじゃのしるし", "おおきなねっこ", "おんみつマント", "かえんだま", "かいがらのすず", "かたいいし", "きあいのタスキ", "きあいのハチマキ", "きせきのタネ", "きゅうこん", "くろいヘドロ", "くろいてっきゅう", "こだわりスカーフ", "こだわりハチマキ", "こだわりメガネ", "ゴツゴツメット", "さらさらいわ", "しめったいわ", "じゃくてんほけん", "しろいハーブ", "しんかのきせき", "じしゃく", "するどいキバ", "せいれいプレート", "せんせいのツメ", "たつじんのおび", "たべのこし", "だっしゅつパック", "だっしゅつボタン", "ちからのハチマキ", "つめたいいわ", "でんきだま", "とくせいガード", "とつげきチョッキ", "どくどくだま", "のどスプレー", "のろいのおふだ", "パワフルハーブ", "パンチグローブ", "ひかりのこな", "ひかりのねんど", "ピントレンズ", "ふうせん", "フォーカスレンズ", "ぼうじんゴーグル", "メトロノーム", "メンタルハーブ", "ものしりメガネ", "ものまねハーブ", "やわらかいすな", "ゆきだま", "ヨプのみ", "ラムのみ", "リリバのみ", "レッドカード", "ロゼルのみ", "ワイドレンズ", "オボンのみ", "オッカのみ", "カゴのみ", "キーのみ", "クラボのみ", "シュカのみ", "ソクノのみ", "タンガのみ", "チイラのみ", "ナモのみ", "バコウのみ", "ハバンのみ", "バンジのみ", "ビアーのみ", "フィラのみ", "ホズのみ", "マゴのみ", "ヤチェのみ", "ヨロギのみ", "ウイのみ", "イアのみ"];
  const TYPE_JA={Normal:'ノーマル',Fire:'ほのお',Water:'みず',Grass:'くさ',Electric:'でんき',Ice:'こおり',Fighting:'かくとう',Poison:'どく',Ground:'じめん',Flying:'ひこう',Psychic:'エスパー',Bug:'むし',Rock:'いわ',Ghost:'ゴースト',Dragon:'ドラゴン',Dark:'あく',Steel:'はがね',Fairy:'フェアリー'};
  const COLORS={'ノーマル':'#92999f','ほのお':'#e76f51','みず':'#4d8fd6','でんき':'#e3b92f','くさ':'#5aa65a','こおり':'#55bfc5','かくとう':'#c45a45','どく':'#9b65b5','じめん':'#c99650','ひこう':'#7397d1','エスパー':'#d86691','むし':'#8aa63a','いわ':'#a89655','ゴースト':'#7066a8','ドラゴン':'#5b6fc4','あく':'#665c59','はがね':'#708a99','フェアリー':'#d878ad','不明':'#777'};
  const NATURES=['がんばりや（補正なし）','さみしがり（攻撃1.1倍・防御0.9倍）','ゆうかん（攻撃1.1倍・素早さ0.9倍）','いじっぱり（攻撃1.1倍・特攻0.9倍）','やんちゃ（攻撃1.1倍・特防0.9倍）','ずぶとい（防御1.1倍・攻撃0.9倍）','すなお（補正なし）','のんき（防御1.1倍・素早さ0.9倍）','わんぱく（防御1.1倍・特攻0.9倍）','のうてんき（防御1.1倍・特防0.9倍）','おくびょう（素早さ1.1倍・攻撃0.9倍）','せっかち（素早さ1.1倍・防御0.9倍）','まじめ（補正なし）','ようき（素早さ1.1倍・特攻0.9倍）','むじゃき（素早さ1.1倍・特防0.9倍）','ひかえめ（特攻1.1倍・攻撃0.9倍）','おっとり（特攻1.1倍・防御0.9倍）','れいせい（特攻1.1倍・素早さ0.9倍）','てれや（補正なし）','うっかりや（特攻1.1倍・特防0.9倍）','おだやか（特防1.1倍・攻撃0.9倍）','おとなしい（特防1.1倍・防御0.9倍）','なまいき（特防1.1倍・素早さ0.9倍）','しんちょう（特防1.1倍・特攻0.9倍）','きまぐれ（補正なし）'];
  const EMPTY={published:true,pokemon:'',nature:'',ability:'',item:'',hp:0,attack:0,defense:0,spAttack:0,spDefense:0,speed:0,move1:'',move2:'',move3:'',move4:'',usage:'',partners:'',counters:'',gameplan:'',calcs:'',notes:''};
  const POINTS=[['hp','HP'],['attack','攻撃'],['defense','防御'],['spAttack','特攻'],['spDefense','特防'],['speed','素早さ']];
  const TEXTS=[['usage','基本的な使い方'],['partners','相性の良い味方'],['counters','苦手な相手'],['gameplan','選出・立ち回り'],['calcs','ダメージ・耐久目安'],['notes','補足']];
  const plain=v=>v&&typeof v.toJS==='function'?v.toJS():(Array.isArray(v)?v:[]);
  const opt=x=>typeof x==='string'?{value:x,label:x}:x;
  function badge(text,type){return h('span',{style:{display:'inline-block',background:COLORS[type]||'#777',color:'#fff',padding:'3px 9px',borderRadius:'999px',fontSize:'12px',fontWeight:'700',marginRight:'5px'}},text)}
  function select(value,onChange,options,placeholder,disabled){return h('select',{value:value||'',disabled:!!disabled,onChange:e=>onChange(e.target.value),style:{width:'100%',padding:'10px',border:'1px solid #b9c1c8',borderRadius:'6px',background:disabled?'#f2f4f7':'#fff'}},[h('option',{value:''},placeholder)].concat(options.map(x=>{x=opt(x);return h('option',{value:x.value},x.label)})))}
  function numberInput(value,onChange,max){return h('input',{type:'number',value:value??0,min:0,max,step:1,onChange:e=>onChange(Math.max(0,Math.min(max,Number(e.target.value)||0))),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})}
  function field(title,child,hint){return h('label',{style:{display:'block',fontWeight:'700',marginBottom:'12px'}},[h('span',{style:{display:'block',marginBottom:'6px'}},title),child,hint?h('small',{style:{display:'block',fontWeight:'400',color:'#667085',marginTop:'4px'}},hint):null])}
  function allowedItems(p){if(!p)return[];if(p.isMega)return p.megaStone?[p.megaStone]:[];return NORMAL_ITEMS.concat(p.megaStones||[])}
  function Control(props){
    const builds=plain(props.value);
    const emit=next=>props.onChange(next);
    const normalized=()=>builds.map(x=>Object.assign({},EMPTY,x));
    const update=(i,key,val)=>{const next=normalized();next[i][key]=val;emit(next)};
    const remove=i=>emit(builds.filter((_,n)=>n!==i));
    const hasBlank=builds.some(x=>!x||!x.pokemon);
    const add=()=>{
      if(hasBlank)return;
      emit(builds.concat([Object.assign({},EMPTY,{editorId:'build-'+Date.now()+'-'+Math.random().toString(36).slice(2,8)})]));
    };

    function renderBuild(raw,i,isNew){
      const b=Object.assign({},EMPTY,raw);
      const p=DATA.find(x=>x.name===b.pokemon);
      const total=POINTS.reduce((s,[k])=>s+(Number(b[k])||0),0);
      const items=allowedItems(p);
      const pokemonField=isNew
        ? select(b.pokemon,v=>{
            const next=normalized();
            next[i].pokemon=v;
            next[i].ability='';
            next[i].item='';
            ['move1','move2','move3','move4'].forEach(k=>next[i][k]='');
            emit(next);
          },DATA.map(x=>x.name),'一覧から選択')
        : h('div',{style:{padding:'10px',border:'1px solid #b9c1c8',borderRadius:'6px',background:'#f2f4f7',fontWeight:'700'}},b.pokemon);

      return h('section',{key:b.editorId||`${b.pokemon}-${i}`,style:{border:isNew?'2px solid #1570ef':'1px solid #d0d5dd',borderRadius:'10px',padding:'16px',marginBottom:'18px',background:'#fff'}},[
        h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px',marginBottom:'14px'}},[
          h('strong',{},isNew?'新しい育成論を作成':`育成論 ${i+1}｜${b.pokemon}`),
          h('button',{type:'button',onClick:()=>remove(i),style:{border:0,background:'#b42318',color:'#fff',padding:'7px 12px',borderRadius:'6px',flexShrink:0}},isNew?'作成を取り消す':'削除')
        ]),
        isNew
          ? h('div',{style:{padding:'10px 12px',marginBottom:'14px',background:'#eff8ff',borderRadius:'7px',color:'#175cd3',fontSize:'13px'}},'ここでポケモンを選ぶと、新しい育成論として既存一覧に追加されます。')
          : h('div',{style:{padding:'10px 12px',marginBottom:'14px',background:'#fffaeb',borderRadius:'7px',color:'#93370d',fontSize:'13px'}},'既存の育成論を編集中です。別のポケモンを追加する場合は、上の「＋ 新しく育成論を作成」を使用してください。'),
        field('公開する',h('input',{type:'checkbox',checked:b.published!==false,onChange:e=>update(i,'published',e.target.checked)})),
        field('ポケモン名',pokemonField,isNew?'新しく追加するポケモンを選択します。':'上書き防止のため、既存育成論のポケモン名は変更できません。'),
        p?h('div',{style:{margin:'-5px 0 14px'}},p.types.map(t=>{const ja=TYPE_JA[t]||t;return badge(ja,ja)})):null,
        field('性格',select(b.nature,v=>update(i,'nature',v),NATURES,'性格を選択')),
        field('特性',select(b.ability,v=>update(i,'ability',v),p?p.abilities:[],p?'特性を選択':'先にポケモンを選択',!p)),
        field('持ち物',select(b.item,v=>update(i,'item',v),items,p?(p.isMega?'対応するメガストーン固定':'持ち物を選択'):'先にポケモンを選択',!p),p&&p.isMega?'メガシンカ後のため、対応するメガストーンのみ選択できます。':p&&(p.megaStones||[]).length?'通常の持ち物と対応するメガストーンから選択できます。':'メガストーンを除く持ち物から選択できます。'),
        h('div',{style:{fontWeight:'700',margin:'12px 0 8px'}},['能力ポイント ',h('span',{style:{color:total>66?'#b42318':'#344054'}},`合計 ${total} / 66`)]),
        h('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'10px',marginBottom:'16px'}},POINTS.map(([k,n])=>{const other=total-(Number(b[k])||0);const max=Math.max(0,Math.min(32,66-other));return field(n,numberInput(b[k],v=>update(i,k,v),max),`0〜32（現在の上限 ${max}）`)})),
        [1,2,3,4].map(n=>{const k='move'+n;const moves=p?p.moves:[];const chosen=moves.find(m=>m.name===b[k]);return h('div',{style:{marginBottom:'12px'}},[field(`技${n}`,select(b[k],v=>update(i,k,v),moves.map(m=>({value:m.name,label:`${m.name}（${m.type}）`})),p?'技を選択':'先にポケモンを選択',!p)),chosen?h('div',{style:{marginTop:'-7px'}},badge(chosen.type,chosen.type)):null])}),
        TEXTS.map(([k,n])=>field(n,h('textarea',{value:b[k]||'',onChange:e=>update(i,k,e.target.value),rows:4,style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})))
      ]);
    }

    const newEntries=[];
    const existingEntries=[];
    builds.forEach((raw,i)=>(raw&&raw.pokemon?existingEntries:newEntries).push({raw,i}));

    return h('div',{},[
      h('section',{style:{border:'1px solid #84adff',borderRadius:'10px',padding:'16px',marginBottom:'22px',background:'#f5f8ff'}},[
        h('h2',{style:{fontSize:'18px',margin:'0 0 8px'}},'新しく育成論を作成'),
        h('p',{style:{margin:'0 0 12px',color:'#475467',fontSize:'14px'}},'既存の育成論を残したまま、新しいポケモンの育成論を追加します。'),
        h('button',{type:'button',onClick:add,disabled:hasBlank,style:{width:'100%',padding:'12px',border:'1px solid #1570ef',background:hasBlank?'#e4e7ec':'#eff8ff',color:hasBlank?'#667085':'#175cd3',fontWeight:'700',borderRadius:'8px',cursor:hasBlank?'not-allowed':'pointer'}},hasBlank?'新規作成フォームを入力してください':'＋ 新しく育成論を作成')
      ]),
      newEntries.length?h('div',{},newEntries.map(({raw,i})=>renderBuild(raw,i,true))):null,
      h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'24px 0 12px'}},[
        h('h2',{style:{fontSize:'18px',margin:0}},'既に作成したポケモンの育成論一覧'),
        h('span',{style:{fontSize:'13px',color:'#667085'}},`${existingEntries.length}件`)
      ]),
      existingEntries.length
        ? h('div',{},existingEntries.map(({raw,i})=>renderBuild(raw,i,false)))
        : h('div',{style:{padding:'20px',textAlign:'center',border:'1px dashed #98a2b3',borderRadius:'8px',color:'#667085'}},'作成済みの育成論はありません。')
    ]);
  }
  CMS.registerWidget('pokemon-build-list',Control);
})();
