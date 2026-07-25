(function(){
  const h=window.h;
  const DATA=window.POKEMON_BUILD_DATA||[];
  const TYPE_JA={Normal:'ノーマル',Fire:'ほのお',Water:'みず',Grass:'くさ',Electric:'でんき',Ice:'こおり',Fighting:'かくとう',Poison:'どく',Ground:'じめん',Flying:'ひこう',Psychic:'エスパー',Bug:'むし',Rock:'いわ',Ghost:'ゴースト',Dragon:'ドラゴン',Dark:'あく',Steel:'はがね',Fairy:'フェアリー'};
  const COLORS={'ノーマル':'#92999f','ほのお':'#e76f51','みず':'#4d8fd6','でんき':'#e3b92f','くさ':'#5aa65a','こおり':'#55bfc5','かくとう':'#c45a45','どく':'#9b65b5','じめん':'#c99650','ひこう':'#7397d1','エスパー':'#d86691','むし':'#8aa63a','いわ':'#a89655','ゴースト':'#7066a8','ドラゴン':'#5b6fc4','あく':'#665c59','はがね':'#708a99','フェアリー':'#d878ad','不明':'#777'};
  const NATURES=[
    'がんばりや（補正なし）','さみしがり（攻撃1.1倍・防御0.9倍）','ゆうかん（攻撃1.1倍・素早さ0.9倍）','いじっぱり（攻撃1.1倍・特攻0.9倍）','やんちゃ（攻撃1.1倍・特防0.9倍）',
    'ずぶとい（防御1.1倍・攻撃0.9倍）','すなお（補正なし）','のんき（防御1.1倍・素早さ0.9倍）','わんぱく（防御1.1倍・特攻0.9倍）','のうてんき（防御1.1倍・特防0.9倍）',
    'おくびょう（素早さ1.1倍・攻撃0.9倍）','せっかち（素早さ1.1倍・防御0.9倍）','まじめ（補正なし）','ようき（素早さ1.1倍・特攻0.9倍）','むじゃき（素早さ1.1倍・特防0.9倍）',
    'ひかえめ（特攻1.1倍・攻撃0.9倍）','おっとり（特攻1.1倍・防御0.9倍）','れいせい（特攻1.1倍・素早さ0.9倍）','てれや（補正なし）','うっかりや（特攻1.1倍・特防0.9倍）',
    'おだやか（特防1.1倍・攻撃0.9倍）','おとなしい（特防1.1倍・防御0.9倍）','なまいき（特防1.1倍・素早さ0.9倍）','しんちょう（特防1.1倍・特攻0.9倍）','きまぐれ（補正なし）'
  ];
  const EMPTY={published:true,pokemon:'',nature:'',ability:'',item:'',hp:0,attack:0,defense:0,spAttack:0,spDefense:0,speed:0,move1:'',move2:'',move3:'',move4:'',usage:'',partners:'',counters:'',gameplan:'',calcs:'',notes:''};
  const POINTS=[['hp','HP'],['attack','攻撃'],['defense','防御'],['spAttack','特攻'],['spDefense','特防'],['speed','素早さ']];
  const TEXTS=[['usage','基本的な使い方'],['partners','相性の良い味方'],['counters','苦手な相手'],['gameplan','選出・立ち回り'],['calcs','ダメージ・耐久目安'],['notes','補足']];
  const toPlain=v=>v&&typeof v.toJS==='function'?v.toJS():(Array.isArray(v)?v:[]);
  function badge(text,type){return h('span',{style:{display:'inline-block',background:COLORS[type]||'#777',color:'#fff',padding:'3px 9px',borderRadius:'999px',fontSize:'12px',fontWeight:'700',marginRight:'5px'}},text)}
  function select(value,onChange,options,placeholder){return h('select',{value:value||'',onChange:e=>onChange(e.target.value),style:{width:'100%',padding:'10px',border:'1px solid #b9c1c8',borderRadius:'6px',background:'#fff'}},[h('option',{value:''},placeholder||'選択してください')].concat(options.map(x=>h('option',{value:x.value||x},x.label||x))))}
  function input(value,onChange,type='text',extra={}){return h('input',Object.assign({type,value:value??'',onChange:e=>onChange(type==='number'?Number(e.target.value):e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}},extra))}
  function label(text,child,hint){return h('label',{style:{display:'block',fontWeight:'700',marginBottom:'12px'}},[h('span',{style:{display:'block',marginBottom:'6px'}},text),child,hint?h('small',{style:{display:'block',fontWeight:'400',color:'#667085',marginTop:'4px'}},hint):null])}
  function Control(props){
    const builds=toPlain(props.value);
    const emit=next=>props.onChange(next);
    const update=(i,key,val)=>{const next=builds.map(x=>Object.assign({},EMPTY,x));next[i][key]=val;emit(next)};
    const remove=i=>emit(builds.filter((_,n)=>n!==i));
    const add=()=>emit(builds.concat([Object.assign({},EMPTY)]));
    return h('div',{},[
      builds.map((raw,i)=>{const b=Object.assign({},EMPTY,raw);const p=DATA.find(x=>x.name===b.pokemon);const total=POINTS.reduce((s,[k])=>s+(Number(b[k])||0),0);const moveOptions=(p?p.moves:[]).map(m=>({value:m.name,label:`${m.name}（${m.type}）`}));
        return h('section',{key:i,style:{border:'1px solid #d0d5dd',borderRadius:'10px',padding:'16px',marginBottom:'18px',background:'#fff'}},[
          h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}},[h('strong',{},`育成論 ${i+1}${b.pokemon?'｜'+b.pokemon:''}`),h('button',{type:'button',onClick:()=>remove(i),style:{border:0,background:'#b42318',color:'#fff',padding:'7px 12px',borderRadius:'6px',cursor:'pointer'}},'削除')]),
          label('公開する',h('input',{type:'checkbox',checked:b.published!==false,onChange:e=>update(i,'published',e.target.checked)})),
          label('ポケモン名',select(b.pokemon,v=>{const next=builds.map(x=>Object.assign({},EMPTY,x));next[i].pokemon=v;['move1','move2','move3','move4'].forEach(k=>next[i][k]='');emit(next)},DATA.map(x=>x.name),'一覧から選択')),
          p?h('div',{style:{margin:'-5px 0 14px'}},p.types.map(t=>badge(TYPE_JA[t]||t,TYPE_JA[t]||t))):null,
          label('性格',select(b.nature,v=>update(i,'nature',v),NATURES,'性格を選択')),
          label('特性',input(b.ability,v=>update(i,'ability',v))),
          label('持ち物',input(b.item,v=>update(i,'item',v))),
          h('div',{style:{fontWeight:'700',margin:'12px 0 8px'}},['能力ポイント ',h('span',{style:{color:total>66?'#b42318':'#344054'}},`合計 ${total} / 66`)]),
          h('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'10px',marginBottom:'16px'}},POINTS.map(([k,n])=>{const otherTotal=total-(Number(b[k])||0);const allowed=Math.max(0,Math.min(32,66-otherTotal));return label(n,input(b[k],v=>update(i,k,Math.max(0,Math.min(allowed,Number(v)||0))),'number',{min:0,max:allowed,step:1}), `0〜32（現在の上限 ${allowed}）`)})),
          total>66?h('div',{style:{color:'#b42318',fontWeight:'700',margin:'-8px 0 16px'}},'能力ポイントの合計を66以下にしてください。'):null,
          [1,2,3,4].map(n=>{const key='move'+n;const selected=p&&p.moves.find(m=>m.name===b[key]);return h('div',{style:{marginBottom:'12px'}},[label(`技${n}`,select(b[key],v=>update(i,key,v),moveOptions,p?'技を選択':'先にポケモンを選択')),selected?h('div',{style:{marginTop:'-7px'}},badge(selected.type,selected.type)):null])}),
          TEXTS.map(([k,n])=>label(n,h('textarea',{value:b[k]||'',onChange:e=>update(i,k,e.target.value),rows:4,style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})))
        ])
      }),
      h('button',{type:'button',onClick:add,style:{width:'100%',padding:'12px',border:'1px solid #1570ef',background:'#eff8ff',color:'#175cd3',fontWeight:'700',borderRadius:'8px',cursor:'pointer'}},'＋ 育成論を追加')
    ])
  }
  function validate(value){const builds=toPlain(value);const errors=[];builds.forEach((b,i)=>{const nums=POINTS.map(([k])=>Number(b[k])||0);if(nums.some(n=>n<0||n>32))errors.push(`育成論${i+1}: 各能力ポイントは0〜32です。`);if(nums.reduce((a,c)=>a+c,0)>66)errors.push(`育成論${i+1}: 能力ポイント合計は66以下です。`);if(!b.pokemon)errors.push(`育成論${i+1}: ポケモンを選択してください。`);const p=DATA.find(x=>x.name===b.pokemon);if(p){['move1','move2','move3','move4'].forEach(k=>{if(b[k]&&!p.moves.some(m=>m.name===b[k]))errors.push(`育成論${i+1}: ${b[k]}は${b.pokemon}の技一覧にありません。`)})}});return errors.length?errors.join('\n'):true}
  CMS.registerWidget('pokemon-build-list', Control);
})();
