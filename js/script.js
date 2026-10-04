const SAI=['Custos Mingau','Beleza','Assinaturas','Faculdade','Cartão de crédito','Parcelamentos','Uber','Outros'];
const ENT=['Salário','Vendas','Outras entradas'];
const EMO={'Custos Mingau':'🥣','Beleza':'💄','Assinaturas':'📺','Faculdade':'🎓','Cartão de crédito':'💳','Parcelamentos':'🧾','Uber':'🚗','Outros':'📦','Salário':'💼','Vendas':'🛒','Outras entradas':'💰','Receitas':'💰'};
const COR={'Custos Mingau':'#f59e0b','Beleza':'#ec4899','Assinaturas':'#8b5cf6','Faculdade':'#3b82f6','Cartão de crédito':'#ef4444','Parcelamentos':'#14b8a6','Uber':'#22c55e','Outros':'#94a3b8'};
const $=id=>document.getElementById(id);
const brl=v=>v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
let rows=[];try{rows=JSON.parse(localStorage.getItem('fin')||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem('fin',JSON.stringify(rows))}catch(e){}};
const hoje=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
let cur=hoje().slice(0,7), tipo='Saída', catSel=SAI[0];

/* campo de valor: digita só números, a vírgula entra sozinha (centavos) */
function formataValor(){
  let d=$('valor').value.replace(/\D/g,'').replace(/^0+/,'').slice(0,11);
  if(!d){$('valor').value='';return}
  d=d.padStart(3,'0');
  const int=d.slice(0,-2).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  $('valor').value=int+','+d.slice(-2);
}
const lerValor=()=>parseFloat($('valor').value.replace(/\./g,'').replace(',','.'))||0;

function setTipo(t){
  tipo=t;
  $('bS').className='s'+(t=='Saída'?' on':'');
  $('bE').className='e'+(t=='Entrada'?' on':'');
  $('money').className='money'+(t=='Entrada'?' e':'');
  const lista=t=='Saída'?SAI:ENT;catSel=lista[0];desenhaChips();
}
function desenhaChips(){
  const lista=tipo=='Saída'?SAI:ENT;
  $('chips').innerHTML=lista.map(c=>`<button type="button" class="chip${c==catSel?' on':''}" data-c="${esc(c)}"><em>${EMO[c]}</em>${esc(c)}</button>`).join('');
}
function mudaMes(n){
  let [y,m]=cur.split('-').map(Number);m+=n;
  if(m<1){m=12;y--}if(m>12){m=1;y++}
  cur=y+'-'+String(m).padStart(2,'0');render();
}
function render(){
  const [y,m]=cur.split('-').map(Number);
  const nome=new Date(y,m-1,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'});
  $('mesLabel').textContent=nome.charAt(0).toUpperCase()+nome.slice(1);
  const v=rows.filter(r=>(r.data||'').slice(0,7)==cur).sort((a,b)=>a.data<b.data?1:-1);
  const ent=v.filter(r=>r.tipo=='Entrada').reduce((s,r)=>s+r.valor,0);
  const sai=v.filter(r=>r.tipo!='Entrada').reduce((s,r)=>s+r.valor,0);
  $('tIn').textContent=brl(ent);$('tOut').textContent=brl(sai);
  $('saldo').textContent=brl(ent-sai);
  $('hero').className='hero'+(ent-sai<0?' neg':'');

  const por={};v.filter(r=>r.tipo!='Entrada').forEach(r=>por[r.cat]=(por[r.cat]||0)+r.valor);
  const lista=Object.entries(por).sort((a,b)=>b[1]-a[1]);
  let acc=0;const stops=lista.map(([c,val])=>{const a=acc/sai*100;acc+=val;return `${COR[c]||'#94a3b8'} ${a}% ${acc/sai*100}%`});
  $('donut').style.background=sai>0?`conic-gradient(${stops.join(',')})`:'var(--soft)';
  $('dTot').textContent=brl(sai);
  $('cats').innerHTML=lista.length?lista.map(([c,val])=>{const p=val/sai*100;return `<div class="cat"><div class="t"><span>${EMO[c]||'📦'} ${esc(c)}</span><span>${brl(val)} · ${Math.round(p)}%</span></div><div class="bar"><div style="width:${p}%;background:${COR[c]||'#94a3b8'}"></div></div></div>`}).join(''):'<div class="empty">Nenhum gasto neste mês ainda.</div>';

  $('lista').innerHTML=v.length?v.map(r=>{const e=r.tipo=='Entrada';const d=r.data.split('-').reverse().slice(0,2).join('/');
    return `<div class="item"><div class="ico">${EMO[r.cat]||'📦'}</div><div class="mid"><b>${esc(r.desc||r.cat)}</b><small>${esc(r.cat)} · ${d}</small></div><div class="val ${e?'in':'out'}">${e?'+':'−'} ${brl(r.valor)}</div><button class="x" data-id="${r.id}" title="Excluir">×</button></div>`}).join(''):'<div class="empty">Nenhum lançamento neste mês.<br>Use o formulário acima para começar 👆</div>';
}
function adicionar(){
  const valor=lerValor();
  if(!(valor>0)){$('err').textContent='Digite um valor para continuar.';$('valor').focus();return}
  const data=$('data').value||hoje();
  rows.push({id:Date.now()+Math.floor(Math.random()*1000),data,desc:$('desc').value.trim(),cat:catSel,tipo,valor});
  save();cur=data.slice(0,7);
  $('valor').value='';$('desc').value='';$('err').textContent='';
  render();$('valor').focus();
}
$('valor').addEventListener('input',formataValor);
$('bS').onclick=()=>setTipo('Saída');
$('bE').onclick=()=>setTipo('Entrada');
$('ant').onclick=()=>mudaMes(-1);
$('prox').onclick=()=>mudaMes(1);
$('addBtn').onclick=adicionar;
$('desc').addEventListener('keydown',e=>{if(e.key=='Enter')adicionar()});
$('valor').addEventListener('keydown',e=>{if(e.key=='Enter')adicionar()});
$('chips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;catSel=b.dataset.c;desenhaChips()});
$('lista').addEventListener('click',e=>{const b=e.target.closest('.x');if(!b)return;rows=rows.filter(r=>String(r.id)!=b.dataset.id);save();render()});
$('data').value=hoje();
setTipo('Saída');render();