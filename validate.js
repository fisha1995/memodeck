
'use strict';
const DEFAULT_CARDS = [
{ru:"Подними / возьми это.",en:"Pick it up.",hint:"Pick up",emoji:"📦"},
{ru:"Положи / поставь это на стол.",en:"Put it down on the table.",hint:"Put down",emoji:"🛋️"},
{ru:"Отодвинь это в сторону.",en:"Move it aside.",hint:"Move aside",emoji:"➡️"},
{ru:"Передвинь / переставь это сюда.",en:"Move it over here.",hint:"Move over here",emoji:"📍"},
{ru:"Положи это внутрь.",en:"Put it in.",hint:"Put in",emoji:"📥"},
{ru:"Достань / вынь это.",en:"Take it out.",hint:"Take out",emoji:"📤"},
{ru:"Дай это мне.",en:"Give it to me.",hint:"Give to me",emoji:"🤲"},
{ru:"Подними это вверх.",en:"Lift it up.",hint:"Lift up",emoji:"⬆️"},
{ru:"Медленно опусти это.",en:"Lower it slowly.",hint:"Lower slowly",emoji:"⬇️"},
{ru:"Слегка наклони это.",en:"Tilt it slightly.",hint:"Tilt slightly",emoji:"📐"},
{ru:"Держи это вертикально.",en:"Keep it upright.",hint:"Keep upright",emoji:"📏"},
{ru:"Поднеси это ближе.",en:"Bring it closer.",hint:"Bring closer",emoji:"🔍"},
{ru:"Отодвинь / отнеси это дальше.",en:"Move it farther away.",hint:"Move farther away",emoji:"🔭"},
{ru:"Разверни / поверни это.",en:"Turn it around.",hint:"Turn around",emoji:"🔄"},
{ru:"Хорошенько встряхни это.",en:"Give it a good shake.",hint:"Give a good shake",emoji:"🫨"},
{ru:"Осторожно! Не урони это.",en:"Be careful! Don’t drop it.",hint:"Don't drop",emoji:"⚠️"},
{ru:"Неси это осторожно.",en:"Carry it carefully.",hint:"Carry carefully",emoji:"🚶"},
{ru:"Аккуратно положи / поставь это.",en:"Set it down gently.",hint:"Set down gently",emoji:"🪶"},
{ru:"Переверни это вверх дном.",en:"Turn it upside down.",hint:"Turn upside down",emoji:"🙃"},
{ru:"Оставь это там.",en:"Leave it there.",hint:"Leave there",emoji:"🛑"},
{ru:"Подними / возьми телефон.",en:"Pick up the phone.",hint:"Pick up",emoji:"📱"},
{ru:"Поставь чашку на стол.",en:"Put the cup down on the table.",hint:"Put down",emoji:"☕"},
{ru:"Отодвинь книгу в сторону.",en:"Move the book aside.",hint:"Move aside",emoji:"📖"},
{ru:"Передвинь коробку сюда.",en:"Move the box over here.",hint:"Move over here",emoji:"📦"},
{ru:"Положи ключ в карман.",en:"Put the key in your pocket.",hint:"Put in pocket",emoji:"🔑"},
{ru:"Достань ключ из кармана.",en:"Take the key out of your pocket.",hint:"Take out of pocket",emoji:"🗝️"},
{ru:"Дай мне ручку.",en:"Give me the pen.",hint:"Give me",emoji:"🖊️"},
{ru:"Подними коробку вверх.",en:"Lift the box up.",hint:"Lift up",emoji:"📦"},
{ru:"Медленно опусти коробку.",en:"Lower the box slowly.",hint:"Lower slowly",emoji:"📦"},
{ru:"Слегка наклони бутылку.",en:"Tilt the bottle slightly.",hint:"Tilt slightly",emoji:"🍾"},
{ru:"Держи бутылку вертикально.",en:"Keep the bottle upright.",hint:"Keep upright",emoji:"🍾"},
{ru:"Поднеси телефон ближе.",en:"Bring the phone closer.",hint:"Bring closer",emoji:"📱"},
{ru:"Отодвинь телефон подальше.",en:"Move the phone farther away.",hint:"Move farther away",emoji:"📱"},
{ru:"Разверни телефон.",en:"Turn the phone around.",hint:"Turn around",emoji:"📱"},
{ru:"Хорошенько встряхни бутылку.",en:"Give the bottle a good shake.",hint:"Give a good shake",emoji:"🍾"},
{ru:"Осторожно! Не урони стакан.",en:"Be careful! Don’t drop the glass.",hint:"Don't drop glass",emoji:"🥛"},
{ru:"Неси ноутбук осторожно.",en:"Carry the laptop carefully.",hint:"Carry carefully",emoji:"💻"},
{ru:"Аккуратно поставь тарелку.",en:"Set the plate down gently.",hint:"Set down gently",emoji:"🍽️"},
{ru:"Переверни чашку вверх дном.",en:"Turn the cup upside down.",hint:"Turn upside down",emoji:"☕"},
{ru:"Оставь ключи там.",en:"Leave the keys there.",hint:"Leave there",emoji:"🔑"},
{ru:"Поставь чашку в шкаф.",en:"Put the cup in the cabinet.",hint:"Put in cabinet",emoji:"🗄️"},
{ru:"Достань её из шкафа.",en:"Take it out of the cabinet.",hint:"Take out of cabinet",emoji:"🗄️"},
{ru:"Держи чашку за ручку.",en:"Hold the cup by the handle.",hint:"Hold by handle",emoji:"☕"},
{ru:"Не пролей напиток.",en:"Don’t spill the drink.",hint:"Don't spill",emoji:"🥤"},
{ru:"Держи чашку неподвижно.",en:"Keep the cup steady.",hint:"Keep steady",emoji:"☕"},
{ru:"Посмотри на чашку.",en:"Look at the cup.",hint:"Look at",emoji:"👀"},
{ru:"Проверь, чистая ли она.",en:"Check if it’s clean.",hint:"Check if clean",emoji:"✨"},
{ru:"Налей немного воды в чашку.",en:"Pour some water into the cup.",hint:"Pour into",emoji:"🫗"},
{ru:"Добавь немного сахара.",en:"Add some sugar.",hint:"Add sugar",emoji:"🍬"},
{ru:"Размешай напиток.",en:"Stir the drink.",hint:"Stir drink",emoji:"🥄"},
{ru:"Поднеси чашку к губам.",en:"Bring the cup to your lips.",hint:"Bring to lips",emoji:"👄"},
{ru:"Сделай глоток.",en:"Take a sip.",hint:"Take a sip",emoji:"☕"},
{ru:"Помой чашку.",en:"Wash the cup.",hint:"Wash cup",emoji:"🧽"}
];
const STORAGE_KEY='memodeck.v3.data';
function freshData(){return {cards:DEFAULT_CARDS.map((c,i)=>({...c,id:'default-'+i,custom:false})),results:{},totals:{right:0,wrong:0,seen:0},wrongIds:[]};}
function loadData(){try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return freshData();const d=JSON.parse(raw);if(!d||!Array.isArray(d.cards))return freshData();return {cards:d.cards.filter(c=>c&&typeof c.ru==='string'&&typeof c.en==='string').map((c,i)=>({id:String(c.id||('card-'+i)),ru:c.ru,en:c.en,hint:c.hint||'',emoji:c.emoji||'📝',custom:!!c.custom})),results:d.results&&typeof d.results==='object'?d.results:{},totals:{right:Number(d.totals?.right)||0,wrong:Number(d.totals?.wrong)||0,seen:Number(d.totals?.seen)||0},wrongIds:Array.isArray(d.wrongIds)?d.wrongIds:[]};}catch(e){return freshData();}}
let data=loadData(), deck=[], index=0, sessionWrong=[], sessionRight=0, flipped=false, hintVisible=false, editingId=null;
const $=id=>document.getElementById(id);
function saveData(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data));$('saveStatus').textContent='● Сохранено';}catch(e){$('saveStatus').textContent='● Не удалось сохранить';}}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function setTab(tab){document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));$('view-'+tab).classList.remove('hidden');if(tab==='cards')renderList();if(tab==='stats')renderStats();}
function startDeck(cards=data.cards){deck=shuffle(cards);index=0;sessionWrong=[];sessionRight=0;flipped=false;$('finished').classList.add('hidden');$('studyArea').classList.remove('hidden');renderCard();renderTopStats();}
function renderCard(){if(!deck.length){$('studyArea').classList.add('hidden');$('finished').classList.remove('hidden');$('counter').textContent='Нет карточек';$('progressFill').style.width='100%';$('retryWrongBtn').disabled=!data.wrongIds.length;return;}if(index>=deck.length){$('studyArea').classList.add('hidden');$('finished').classList.remove('hidden');$('counter').textContent=`Завершено: ${deck.length}`;$('progressFill').style.width='100%';$('retryWrongBtn').disabled=!sessionWrong.length;return;}const c=deck[index];flipped=false;hintVisible=false;$('flashCard').classList.remove('flipped');$('cardEmoji').textContent=c.emoji||'📝';$('cardRu').textContent=c.ru;$('cardEn').textContent=c.en;$('hintText').textContent=c.hint||'Подсказка не добавлена';$('hintText').classList.remove('show');$('hintBtn').textContent='💡 Подсказка';$('counter').textContent=`Карточка ${index+1} из ${deck.length}`;$('progressFill').style.width=(index/deck.length*100)+'%';}
function renderTopStats(){$('totalStat').textContent=data.cards.length;$('knownStat').textContent=data.totals.right;$('wrongStat').textContent=data.totals.wrong;}
function answer(correct){if(index>=deck.length)return;const c=deck[index];data.totals.seen++;if(correct){sessionRight++;data.totals.right++;data.results[c.id]=(data.results[c.id]||0)+1;data.wrongIds=data.wrongIds.filter(id=>id!==c.id);}else{sessionWrong.push(c);data.totals.wrong++;data.wrongIds=[...new Set([...data.wrongIds,c.id])];}saveData();index++;renderCard();renderTopStats();}
function flip(){flipped=!flipped;$('flashCard').classList.toggle('flipped',flipped);}
function renderList(){const query=$('searchInput').value.trim().toLowerCase();const list=$('cardList');list.replaceChildren();const cards=data.cards.filter(c=>(c.ru+' '+c.en+' '+c.hint).toLowerCase().includes(query));if(!cards.length){list.innerHTML='<div class="empty">Карточек не найдено.</div>';return;}for(const c of cards){const item=document.createElement('div');item.className='item';const em=document.createElement('div');em.className='item-emoji';em.textContent=c.emoji||'📝';const main=document.createElement('div');main.className='item-main';const ru=document.createElement('strong');ru.textContent=c.ru;const en=document.createElement('span');en.textContent=c.en;main.append(ru,en);const edit=document.createElement('button');edit.className='icon-btn';edit.textContent='✏️';edit.title='Редактировать';edit.setAttribute('aria-label','Редактировать карточку');edit.addEventListener('click',()=>editCard(c.id));const del=document.createElement('button');del.className='icon-btn';del.textContent='🗑️';del.title='Удалить';del.setAttribute('aria-label','Удалить карточку');del.addEventListener('click',()=>deleteCard(c.id));item.append(em,main,edit,del);list.append(item);}}
function clearForm(){editingId=null;$('cardForm').reset();$('emojiInput').value='📝';$('formTitle').textContent='➕ Создать карточку';$('saveCardBtn').textContent='Сохранить карточку';$('cancelEditBtn').hidden=true;}
function editCard(id){const c=data.cards.find(x=>x.id===id);if(!c)return;editingId=id;$('ruInput').value=c.ru;$('enInput').value=c.en;$('hintInput').value=c.hint||'';$('emojiInput').value=c.emoji||'📝';$('formTitle').textContent='✏️ Редактировать карточку';$('saveCardBtn').textContent='Сохранить изменения';$('cancelEditBtn').hidden=false;$('ruInput').focus();window.scrollTo({top:0,behavior:'smooth'});}
function deleteCard(id){const c=data.cards.find(x=>x.id===id);if(!c)return;if(!confirm('Удалить карточку «'+c.ru+'»?'))return;data.cards=data.cards.filter(x=>x.id!==id);delete data.results[id];data.wrongIds=data.wrongIds.filter(x=>x!==id);saveData();renderList();renderTopStats();if(index>=deck.length)renderCard();}
$('cardForm').addEventListener('submit',e=>{e.preventDefault();const ru=$('ruInput').value.trim(),en=$('enInput').value.trim();if(!ru||!en)return;const c={id:editingId||('custom-'+Date.now()+'-'+Math.random().toString(36).slice(2,7)),ru,en,hint:$('hintInput').value.trim(),emoji:$('emojiInput').value.trim()||'📝',custom:true};if(editingId){const i=data.cards.findIndex(x=>x.id===editingId);if(i>=0)data.cards[i]=c;}else data.cards.push(c);saveData();clearForm();renderList();renderTopStats();startDeck(data.cards);setTab('cards');});
$('cancelEditBtn').addEventListener('click',clearForm);
$('searchInput').addEventListener('input',renderList);
$('flashCard').addEventListener('click',flip);
$('flashCard').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip();}});
$('hintBtn').addEventListener('click',e=>{e.stopPropagation();hintVisible=!hintVisible;$('hintText').classList.toggle('show',hintVisible);$('hintBtn').textContent=hintVisible?'🙈 Скрыть подсказку':'💡 Подсказка';});
$('wrongBtn').addEventListener('click',()=>answer(false));$('rightBtn').addEventListener('click',()=>answer(true));
$('retryWrongBtn').addEventListener('click',()=>{const wrong=data.cards.filter(c=>data.wrongIds.includes(c.id));startDeck(wrong);});
$('restartBtn').addEventListener('click',()=>startDeck(data.cards));
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
$('exportBtn').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='memodeck-backup.json';a.click();URL.revokeObjectURL(url);});
$('importBtn').addEventListener('click',()=>$('importFile').click());
$('importFile').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{const obj=JSON.parse(await file.text());if(!obj||!Array.isArray(obj.cards))throw new Error('bad file');const cards=obj.cards.filter(c=>c&&typeof c.ru==='string'&&typeof c.en==='string').map((c,i)=>({id:String(c.id||('import-'+Date.now()+'-'+i)),ru:c.ru.trim(),en:c.en.trim(),hint:String(c.hint||''),emoji:String(c.emoji||'📝'),custom:c.custom!==false})).filter(c=>c.ru&&c.en);if(!cards.length)throw new Error('empty');if(!confirm(`Импортировать ${cards.length} карточек? Текущая колода будет заменена.`))return;data={cards,results:obj.results&&typeof obj.results==='object'?obj.results:{},totals:{right:Number(obj.totals?.right)||0,wrong:Number(obj.totals?.wrong)||0,seen:Number(obj.totals?.seen)||0},wrongIds:Array.isArray(obj.wrongIds)?obj.wrongIds:[]};saveData();renderList();renderTopStats();startDeck(data.cards);alert('Импорт завершён.');}catch(err){alert('Не удалось импортировать файл. Выбери JSON-резервную копию MemoDeck.');}finally{$('importFile').value='';}});
$('resetStatsBtn').addEventListener('click',()=>{if(!confirm('Сбросить статистику и список карточек для повторения? Сами карточки останутся.'))return;data.totals={right:0,wrong:0,seen:0};data.results={};data.wrongIds=[];saveData();renderStats();renderTopStats();});
function renderStats(){const t=data.totals;$('statTotal').textContent=data.cards.length;$('statSeen').textContent=t.seen;$('statRight').textContent=t.right;$('statWrong').textContent=t.wrong;$('statAccuracy').textContent=t.seen?Math.round(t.right/t.seen*100)+'%':'0%';$('rightProgress').style.width=t.seen?(t.right/t.seen*100)+'%':'0%';$('wrongProgress').style.width=t.seen?(t.wrong/t.seen*100)+'%':'0%';}
startDeck(data.cards);renderList();renderStats();
