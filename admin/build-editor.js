(function(){
  'use strict';
  const h=window.h;
  const DATA=window.POKEMON_BUILD_DATA||[];
  const NORMAL_ITEMS=["あかいいと", "あつぞこブーツ", "いのちのたま", "おうじゃのしるし", "おおきなねっこ", "おんみつマント", "かえんだま", "かいがらのすず", "かたいいし", "きあいのタスキ", "きあいのハチマキ", "きせきのタネ", "きゅうこん", "くろいヘドロ", "くろいてっきゅう", "こだわりスカーフ", "こだわりハチマキ", "こだわりメガネ", "ゴツゴツメット", "さらさらいわ", "しめったいわ", "じゃくてんほけん", "しろいハーブ", "しんかのきせき", "じしゃく", "するどいキバ", "せいれいプレート", "せんせいのツメ", "たつじんのおび", "たべのこし", "だっしゅつパック", "だっしゅつボタン", "ちからのハチマキ", "つめたいいわ", "でんきだま", "とくせいガード", "とつげきチョッキ", "どくどくだま", "のどスプレー", "のろいのおふだ", "パワフルハーブ", "パンチグローブ", "ひかりのこな", "ひかりのねんど", "ピントレンズ", "ふうせん", "フォーカスレンズ", "ぼうじんゴーグル", "メトロノーム", "メンタルハーブ", "ものしりメガネ", "ものまねハーブ", "やわらかいすな", "ゆきだま", "ヨプのみ", "ラムのみ", "リリバのみ", "レッドカード", "ロゼルのみ", "ワイドレンズ", "オボンのみ", "オッカのみ", "カゴのみ", "キーのみ", "クラボのみ", "シュカのみ", "ソクノのみ", "タンガのみ", "チイラのみ", "ナモのみ", "バコウのみ", "ハバンのみ", "バンジのみ", "ビアーのみ", "フィラのみ", "ホズのみ", "マゴのみ", "ヤチェのみ", "ヨロギのみ", "ウイのみ", "イアのみ"];
  const TYPE_JA={Normal:'ノーマル',Fire:'ほのお',Water:'みず',Grass:'くさ',Electric:'でんき',Ice:'こおり',Fighting:'かくとう',Poison:'どく',Ground:'じめん',Flying:'ひこう',Psychic:'エスパー',Bug:'むし',Rock:'いわ',Ghost:'ゴースト',Dragon:'ドラゴン',Dark:'あく',Steel:'はがね',Fairy:'フェアリー'};
  const COLORS={'ノーマル':'#92999f','ほのお':'#e76f51','みず':'#4d8fd6','でんき':'#e3b92f','くさ':'#5aa65a','こおり':'#55bfc5','かくとう':'#c45a45','どく':'#9b65b5','じめん':'#c99650','ひこう':'#7397d1','エスパー':'#d86691','むし':'#8aa63a','いわ':'#a89655','ゴースト':'#7066a8','ドラゴン':'#5b6fc4','あく':'#665c59','はがね':'#708a99','フェアリー':'#d878ad','不明':'#777'};
  const NATURES=['がんばりや（補正なし）','さみしがり（攻撃1.1倍・防御0.9倍）','ゆうかん（攻撃1.1倍・素早さ0.9倍）','いじっぱり（攻撃1.1倍・特攻0.9倍）','やんちゃ（攻撃1.1倍・特防0.9倍）','ずぶとい（防御1.1倍・攻撃0.9倍）','すなお（補正なし）','のんき（防御1.1倍・素早さ0.9倍）','わんぱく（防御1.1倍・特攻0.9倍）','のうてんき（防御1.1倍・特防0.9倍）','おくびょう（素早さ1.1倍・攻撃0.9倍）','せっかち（素早さ1.1倍・防御0.9倍）','まじめ（補正なし）','ようき（素早さ1.1倍・特攻0.9倍）','むじゃき（素早さ1.1倍・特防0.9倍）','ひかえめ（特攻1.1倍・攻撃0.9倍）','おっとり（特攻1.1倍・防御0.9倍）','れいせい（特攻1.1倍・素早さ0.9倍）','てれや（補正なし）','うっかりや（特攻1.1倍・特防0.9倍）','おだやか（特防1.1倍・攻撃0.9倍）','おとなしい（特防1.1倍・防御0.9倍）','なまいき（特防1.1倍・素早さ0.9倍）','しんちょう（特防1.1倍・特攻0.9倍）','きまぐれ（補正なし）'];
  const EMPTY={published:true,pokemon:'',buildType:'',nature:'',ability:'',item:'',hp:0,attack:0,defense:0,spAttack:0,spDefense:0,speed:0,move1:'',move2:'',move3:'',move4:'',usage:'',partners:'',goodAgainst:'',counters:'',gameplan:'',calcs:'',notes:''};
  const POINTS=[['hp','HP'],['attack','攻撃'],['defense','防御'],['spAttack','特攻'],['spDefense','特防'],['speed','素早さ']];
  const TEXTS=[['usage','基本的な使い方'],['partners','相性の良い味方'],['goodAgainst','得意な相手'],['counters','苦手な相手'],['gameplan','選出・立ち回り'],['calcs','ダメージ・耐久目安'],['notes','対策']];
  const plain=v=>v&&typeof v.toJS==='function'?v.toJS():(Array.isArray(v)?v:[]);
  const opt=x=>typeof x==='string'?{value:x,label:x}:x;
  function badge(text,type){return h('span',{style:{display:'inline-block',background:COLORS[type]||'#777',color:'#fff',padding:'3px 9px',borderRadius:'999px',fontSize:'12px',fontWeight:'700',marginRight:'5px'}},text)}
  function select(value,onChange,options,placeholder,disabled){return h('select',{value:value||'',disabled:!!disabled,onChange:e=>onChange(e.target.value),style:{width:'100%',padding:'10px',border:'1px solid #b9c1c8',borderRadius:'6px',background:disabled?'#f2f4f7':'#fff'}},[h('option',{value:''},placeholder)].concat(options.map(x=>{x=opt(x);return h('option',{value:x.value},x.label)})))}
  function numberInput(value,onChange,max){return h('input',{type:'number',value:value??0,min:0,max,step:1,onChange:e=>onChange(Math.max(0,Math.min(max,Number(e.target.value)||0))),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})}
  function field(title,child,hint){return h('label',{style:{display:'block',fontWeight:'700',marginBottom:'12px'}},[h('span',{style:{display:'block',marginBottom:'6px'}},title),child,hint?h('small',{style:{display:'block',fontWeight:'400',color:'#667085',marginTop:'4px'}},hint):null])}
  function allowedItems(p){if(!p)return[];if(p.isMega)return p.megaStone?[p.megaStone]:[];return NORMAL_ITEMS.concat(p.megaStones||[])}
  const Control=window.createClass({
    getInitialState:function(){return {searchText:'',openKey:null};},
    render:function(){
    const props=this.props;
    const searchText=this.state.searchText;
    const openKey=this.state.openKey;
    const setSearchText=value=>this.setState({searchText:value});
    const setOpenKey=value=>this.setState({openKey:value});
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

      const form=[
        isNew
          ? h('div',{style:{padding:'10px 12px',marginBottom:'14px',background:'#eff8ff',borderRadius:'7px',color:'#175cd3',fontSize:'13px'}},'ここでポケモンを選ぶと、新しい育成論として既存一覧に追加されます。')
          : h('div',{style:{padding:'10px 12px',marginBottom:'14px',background:'#fffaeb',borderRadius:'7px',color:'#93370d',fontSize:'13px'}},'既存の育成論を編集中です。別のポケモンを追加する場合は、上の「＋ 新しく育成論を作成」を使用してください。'),
        field('公開する',h('input',{type:'checkbox',checked:b.published!==false,onChange:e=>update(i,'published',e.target.checked)})),
        field('ポケモン名',pokemonField,isNew?'新しく追加するポケモンを選択します。':'上書き防止のため、既存育成論のポケモン名は変更できません。'),
        field('型',h('input',{type:'text',value:b.buildType||'',placeholder:'例：追い風サポート型、毒撒き型',onChange:e=>update(i,'buildType',e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}}),'同じポケモンの育成論を見分けるための名前を入力します。'),
        p?h('div',{style:{margin:'-5px 0 14px'}},p.types.map(t=>{const ja=TYPE_JA[t]||t;return badge(ja,ja)})):null,
        field('性格',select(b.nature,v=>update(i,'nature',v),NATURES,'性格を選択')),
        field('特性',select(b.ability,v=>update(i,'ability',v),p?p.abilities:[],p?'特性を選択':'先にポケモンを選択',!p)),
        field('持ち物',select(b.item,v=>update(i,'item',v),items,p?(p.isMega?'対応するメガストーン固定':'持ち物を選択'):'先にポケモンを選択',!p),p&&p.isMega?'メガシンカ後のため、対応するメガストーンのみ選択できます。':p&&(p.megaStones||[]).length?'通常の持ち物と対応するメガストーンから選択できます。':'メガストーンを除く持ち物から選択できます。'),
        h('div',{style:{fontWeight:'700',margin:'12px 0 8px'}},['能力ポイント ',h('span',{style:{color:total>66?'#b42318':'#344054'}},`合計 ${total} / 66`)]),
        h('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'10px',marginBottom:'16px'}},POINTS.map(([k,n])=>{const other=total-(Number(b[k])||0);const max=Math.max(0,Math.min(32,66-other));return field(n,numberInput(b[k],v=>update(i,k,v),max),`0〜32（現在の上限 ${max}）`)})),
        [1,2,3,4].map(n=>{const k='move'+n;const moves=p?p.moves:[];const chosen=moves.find(m=>m.name===b[k]);return h('div',{style:{marginBottom:'12px'}},[field(`技${n}`,select(b[k],v=>update(i,k,v),moves.map(m=>({value:m.name,label:`${m.name}（${m.type}）`})),p?'技を選択':'先にポケモンを選択',!p)),chosen?h('div',{style:{marginTop:'-7px'}},badge(chosen.type,chosen.type)):null])}),
        TEXTS.map(([k,n])=>field(n,h('textarea',{value:b[k]||'',onChange:e=>update(i,k,e.target.value),rows:4,style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})))
      ];

      if(isNew){
        return h('section',{key:b.editorId||`new-${i}`,style:{border:'2px solid #1570ef',borderRadius:'10px',padding:'16px',marginBottom:'18px',background:'#fff'}},[
          h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px',marginBottom:'14px'}},[
            h('strong',{},'新しい育成論を作成'),
            h('button',{type:'button',onClick:()=>remove(i),style:{border:0,background:'#b42318',color:'#fff',padding:'7px 12px',borderRadius:'6px',flexShrink:0}},'作成を取り消す')
          ]),
          form
        ]);
      }

      const key=b.editorId||`${b.pokemon}-${i}`;
      const isOpen=openKey===key;
      return h('section',{key,style:{border:isOpen?'2px solid #1570ef':'1px solid #d0d5dd',borderRadius:'9px',marginBottom:'8px',background:'#fff',overflow:'hidden'}},[
        h('button',{type:'button',onClick:()=>setOpenKey(isOpen?null:key),style:{width:'100%',border:0,background:isOpen?'#eff8ff':'#fff',padding:'12px 14px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px',textAlign:'left',cursor:'pointer'}},[
          h('span',{style:{display:'flex',alignItems:'center',gap:'9px',minWidth:0}},[
            h('span',{style:{fontSize:'16px',color:'#475467',width:'18px'}},isOpen?'▼':'▶'),
            h('span',{style:{minWidth:0,overflow:'hidden'}},[
              h('strong',{style:{display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},b.pokemon),
              b.buildType?h('span',{style:{display:'block',fontSize:'12px',color:'#667085',marginTop:'2px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},b.buildType):null
            ]),
            b.published===false?h('span',{style:{fontSize:'11px',background:'#f2f4f7',color:'#667085',padding:'2px 7px',borderRadius:'999px'}},'非公開'):null
          ]),
          h('span',{style:{fontSize:'13px',color:'#175cd3',fontWeight:'700',flexShrink:0}},isOpen?'閉じる':'編集する')
        ]),
        isOpen?h('div',{style:{padding:'16px',borderTop:'1px solid #d0d5dd'}},[
          h('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'12px'}},[
            h('button',{type:'button',onClick:()=>remove(i),style:{border:0,background:'#b42318',color:'#fff',padding:'7px 12px',borderRadius:'6px'}},'この育成論を削除')
          ]),
          form
        ]):null
      ]);
    }

    const newEntries=[];
    const existingEntries=[];
    builds.forEach((raw,i)=>(raw&&raw.pokemon?existingEntries:newEntries).push({raw,i}));
    const query=searchText.trim().toLowerCase();
    const filteredExisting=query?existingEntries.filter(({raw})=>`${raw.pokemon||''} ${raw.buildType||''}`.toLowerCase().includes(query)):existingEntries;

    return h('div',{},[
      h('section',{style:{border:'1px solid #84adff',borderRadius:'10px',padding:'16px',marginBottom:'22px',background:'#f5f8ff'}},[
        h('h2',{style:{fontSize:'18px',margin:'0 0 8px'}},'新しく育成論を作成'),
        h('p',{style:{margin:'0 0 12px',color:'#475467',fontSize:'14px'}},'既存の育成論を残したまま、新しいポケモンの育成論を追加します。'),
        h('button',{type:'button',onClick:add,disabled:hasBlank,style:{width:'100%',padding:'12px',border:'1px solid #1570ef',background:hasBlank?'#e4e7ec':'#eff8ff',color:hasBlank?'#667085':'#175cd3',fontWeight:'700',borderRadius:'8px',cursor:hasBlank?'not-allowed':'pointer'}},hasBlank?'新規作成フォームを入力してください':'＋ 新しく育成論を作成')
      ]),
      newEntries.length?h('div',{},newEntries.map(({raw,i})=>renderBuild(raw,i,true))):null,
      h('div',{style:{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'24px 0 12px',gap:'10px'}},[
        h('h2',{style:{fontSize:'18px',margin:0}},'既に作成したポケモンの育成論一覧'),
        h('span',{style:{fontSize:'13px',color:'#667085'}},query?`${filteredExisting.length} / ${existingEntries.length}件`:`${existingEntries.length}件`)
      ]),
      existingEntries.length?h('div',{style:{marginBottom:'12px'}},[
        h('input',{type:'search',value:searchText,placeholder:'ポケモン名・型で育成論を検索',onChange:e=>setSearchText(e.target.value),style:{width:'100%',padding:'11px 12px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'8px',fontSize:'14px'}})
      ]):null,
      filteredExisting.length
        ? h('div',{},filteredExisting.map(({raw,i})=>renderBuild(raw,i,false)))
        : h('div',{style:{padding:'20px',textAlign:'center',border:'1px dashed #98a2b3',borderRadius:'8px',color:'#667085'}},existingEntries.length?'検索条件に一致する育成論はありません。':'作成済みの育成論はありません。')
    ]);
    }
  });
  CMS.registerWidget('pokemon-build-list',Control);

  const TEAM_MEMBER_EMPTY={pokemon:'',nature:'',ability:'',item:'',hp:0,attack:0,defense:0,spAttack:0,spDefense:0,speed:0,move1:'',move2:'',move3:'',move4:''};
  const TEAM_EMPTY={published:true,teamName:'',pokemon1:null,pokemon2:null,pokemon3:null,pokemon4:null,pokemon5:null,pokemon6:null,concept:'',leads:'',gameplan:'',counters:'',notes:''};
  function normalizeMember(value){
    if(typeof value==='string')return Object.assign({},TEAM_MEMBER_EMPTY,{pokemon:value});
    return Object.assign({},TEAM_MEMBER_EMPTY,value||{});
  }
  function teamTextInput(value,onChange,placeholder){return h('input',{type:'text',value:value||'',placeholder:placeholder||'',onChange:e=>onChange(e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})}
  const TeamControl=window.createClass({
    getInitialState:function(){return {searchText:'',openKey:null,openMember:null};},
    render:function(){
      const props=this.props;
      const teams=plain(props.value);
      const emit=next=>props.onChange(next);
      const normalized=()=>teams.map(x=>Object.assign({},TEAM_EMPTY,x));
      const updateTeam=(i,key,val)=>{const next=normalized();next[i][key]=val;emit(next)};
      const updateMember=(i,slot,key,val)=>{
        const next=normalized();
        const member=normalizeMember(next[i][slot]);
        member[key]=val;
        if(key==='pokemon'){
          member.ability='';member.item='';member.move1='';member.move2='';member.move3='';member.move4='';
        }
        next[i][slot]=member;
        emit(next);
      };
      const remove=i=>emit(teams.filter((_,n)=>n!==i));
      const hasBlank=teams.some(t=>!t||!t.teamName);
      const add=()=>{if(!hasBlank)emit(teams.concat([Object.assign({},TEAM_EMPTY,{editorId:'team-'+Date.now()+'-'+Math.random().toString(36).slice(2,8)})]));};
      const memberName=m=>typeof m==='string'?m:(m&&m.pokemon)||'';

      const renderMember=(rawMember,i,slot,n)=>{
        const m=normalizeMember(rawMember);
        const pkm=DATA.find(x=>x.name===m.pokemon);
        const total=POINTS.reduce((sum,[k])=>sum+(Number(m[k])||0),0);
        const items=allowedItems(pkm);
        const memberKey=`${i}-${slot}`;
        const isOpen=this.state.openMember===memberKey;
        return h('section',{key:slot,style:{border:isOpen?'2px solid #1570ef':'1px solid #d0d5dd',borderRadius:'8px',overflow:'hidden',background:'#fff'}},[
          h('button',{type:'button',onClick:()=>this.setState({openMember:isOpen?null:memberKey}),style:{width:'100%',border:0,padding:'11px 12px',background:isOpen?'#eff8ff':'#f9fafb',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',textAlign:'left'}},[
            h('strong',{},`${n}匹目：${m.pokemon||'未選択'}`),
            h('span',{style:{fontSize:'12px',color:'#175cd3',fontWeight:'700'}},isOpen?'閉じる':'設定する')
          ]),
          isOpen?h('div',{style:{padding:'14px',borderTop:'1px solid #d0d5dd'}},[
            field('ポケモン名',select(m.pokemon,v=>updateMember(i,slot,'pokemon',v),DATA.map(x=>x.name),'一覧から選択')),
            pkm?h('div',{style:{margin:'-5px 0 14px'}},pkm.types.map(t=>{const ja=TYPE_JA[t]||t;return badge(ja,ja)})):null,
            field('性格',select(m.nature,v=>updateMember(i,slot,'nature',v),NATURES,'性格を選択')),
            field('特性',select(m.ability,v=>updateMember(i,slot,'ability',v),pkm?pkm.abilities:[],pkm?'特性を選択':'先にポケモンを選択',!pkm)),
            field('持ち物',select(m.item,v=>updateMember(i,slot,'item',v),items,pkm?(pkm.isMega?'対応するメガストーン固定':'持ち物を選択'):'先にポケモンを選択',!pkm)),
            h('div',{style:{fontWeight:'700',margin:'12px 0 8px'}},['能力ポイント ',h('span',{style:{color:total>66?'#b42318':'#344054'}},`合計 ${total} / 66`)]),
            h('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'9px',marginBottom:'14px'}},POINTS.map(([k,label])=>{const other=total-(Number(m[k])||0);const max=Math.max(0,Math.min(32,66-other));return field(label,numberInput(m[k],v=>updateMember(i,slot,k,v),max),`0〜32（上限 ${max}）`)})),
            h('div',{style:{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'9px'}},[1,2,3,4].map(moveNo=>{
              const key='move'+moveNo;
              const moves=pkm?pkm.moves:[];
              return field(`技${moveNo}`,select(m[key],v=>updateMember(i,slot,key,v),moves.map(move=>({value:move.name,label:`${move.name}（${move.type}）`})),pkm?'技を選択':'先にポケモンを選択',!pkm));
            }))
          ]):null
        ]);
      };

      const renderTeam=(raw,i,isNew)=>{
        const t=Object.assign({},TEAM_EMPTY,raw);
        const key=t.editorId||`team-${i}-${t.teamName}`;
        const isOpen=isNew||this.state.openKey===key;
        const names=[1,2,3,4,5,6].map(n=>memberName(t['pokemon'+n])).filter(Boolean);
        const form=h('div',{},[
          field('公開する',h('input',{type:'checkbox',checked:t.published!==false,onChange:e=>updateTeam(i,'published',e.target.checked)})),
          field('構築名',teamTextInput(t.teamName,v=>updateTeam(i,'teamName',v),'例：雨＋追い風スタンダード')),
          h('div',{style:{fontWeight:'800',margin:'18px 0 9px'}},'構築ポケモン（6匹）'),
          h('div',{style:{display:'grid',gap:'9px',marginBottom:'16px'}},[1,2,3,4,5,6].map(n=>renderMember(t['pokemon'+n],i,'pokemon'+n,n))),
          field('構築コンセプト',h('textarea',{value:t.concept||'',rows:4,onChange:e=>updateTeam(i,'concept',e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})),
          field('基本選出',h('textarea',{value:t.leads||'',rows:4,onChange:e=>updateTeam(i,'leads',e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})),
          field('動かし方',h('textarea',{value:t.gameplan||'',rows:4,onChange:e=>updateTeam(i,'gameplan',e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})),
          field('苦手な相手・注意点',h('textarea',{value:t.counters||'',rows:4,onChange:e=>updateTeam(i,'counters',e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}})),
          field('補足',h('textarea',{value:t.notes||'',rows:4,onChange:e=>updateTeam(i,'notes',e.target.value),style:{width:'100%',padding:'10px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'6px'}}))
        ]);
        if(isNew)return h('section',{key,style:{border:'2px solid #1570ef',borderRadius:'10px',padding:'16px',marginBottom:'18px',background:'#fff'}},[
          h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}},[h('strong',{},'新しい構築を作成'),h('button',{type:'button',onClick:()=>remove(i),style:{border:0,background:'#b42318',color:'#fff',padding:'7px 12px',borderRadius:'6px'}},'作成を取り消す')]),form
        ]);
        return h('section',{key,style:{border:isOpen?'2px solid #1570ef':'1px solid #d0d5dd',borderRadius:'9px',marginBottom:'8px',background:'#fff',overflow:'hidden'}},[
          h('button',{type:'button',onClick:()=>this.setState({openKey:isOpen?null:key,openMember:null}),style:{width:'100%',border:0,background:isOpen?'#eff8ff':'#fff',padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',textAlign:'left',cursor:'pointer'}},[
            h('span',{},[h('strong',{style:{display:'block'}},t.teamName||'名称未設定の構築'),h('span',{style:{display:'block',fontSize:'12px',color:'#667085',marginTop:'2px'}},names.join(' / ')||'ポケモン未登録')]),
            h('span',{style:{fontSize:'13px',color:'#175cd3',fontWeight:'700'}},isOpen?'閉じる':'編集する')
          ]),
          isOpen?h('div',{style:{padding:'16px',borderTop:'1px solid #d0d5dd'}},[h('div',{style:{display:'flex',justifyContent:'flex-end',marginBottom:'12px'}},h('button',{type:'button',onClick:()=>remove(i),style:{border:0,background:'#b42318',color:'#fff',padding:'7px 12px',borderRadius:'6px'}},'この構築を削除')),form]):null
        ]);
      };

      const newEntries=[],existingEntries=[];
      teams.forEach((raw,i)=>(raw&&raw.teamName?existingEntries:newEntries).push({raw,i}));
      const query=this.state.searchText.trim().toLowerCase();
      const filtered=query?existingEntries.filter(({raw})=>{const t=Object.assign({},TEAM_EMPTY,raw);return (`${t.teamName} `+[1,2,3,4,5,6].map(n=>memberName(t['pokemon'+n])).join(' ')).toLowerCase().includes(query)}):existingEntries;
      return h('div',{},[
        h('section',{style:{border:'1px solid #84adff',borderRadius:'10px',padding:'16px',marginBottom:'22px',background:'#f5f8ff'}},[
          h('h2',{style:{fontSize:'18px',margin:'0 0 8px'}},'新しく構築を作成'),
          h('p',{style:{margin:'0 0 12px',color:'#475467',fontSize:'14px'}},'6匹それぞれの性格・特性・持ち物・能力ポイント・技を選択して登録します。'),
          h('button',{type:'button',onClick:add,disabled:hasBlank,style:{width:'100%',padding:'12px',border:'1px solid #1570ef',background:hasBlank?'#e4e7ec':'#eff8ff',color:hasBlank?'#667085':'#175cd3',fontWeight:'700',borderRadius:'8px'}},hasBlank?'新規作成フォームを入力してください':'＋ 新しく構築を作成')
        ]),
        newEntries.length?h('div',{},newEntries.map(({raw,i})=>renderTeam(raw,i,true))):null,
        h('div',{style:{display:'flex',justifyContent:'space-between',alignItems:'center',margin:'24px 0 12px'}},[h('h2',{style:{fontSize:'18px',margin:0}},'作成済みの構築一覧'),h('span',{style:{fontSize:'13px',color:'#667085'}},`${filtered.length} / ${existingEntries.length}件`)]),
        existingEntries.length?h('input',{type:'search',value:this.state.searchText,placeholder:'構築名・ポケモン名で検索',onChange:e=>this.setState({searchText:e.target.value}),style:{width:'100%',padding:'11px 12px',boxSizing:'border-box',border:'1px solid #b9c1c8',borderRadius:'8px',fontSize:'14px',marginBottom:'12px'}}):null,
        filtered.length?h('div',{},filtered.map(({raw,i})=>renderTeam(raw,i,false))):h('div',{style:{padding:'20px',textAlign:'center',border:'1px dashed #98a2b3',borderRadius:'8px',color:'#667085'}},existingEntries.length?'検索条件に一致する構築はありません。':'作成済みの構築はありません。')
      ]);
    }
  });
  CMS.registerWidget('pokemon-team-list',TeamControl);

})();
