const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','メニューを開く');nav.classList.remove('open');menu.textContent='☰'}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');nav.classList.toggle('open',open);menu.textContent=open?'×':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===location.pathname.split('/').pop())a.setAttribute('aria-current','page')});
const form=document.querySelector('#inquiry-form');
if(form)form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const fields=[['会社名・団体名','company'],['お名前','name'],['メールアドレス','email'],['ご相談のテーマ','topic'],['ご相談内容','message']];const text='株式会社E-マネージ ご相談内容（未送信）\n\n'+fields.map(([label,key])=>label+'：'+data.get(key)).join('\n\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='E-manage-inquiry.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#form-status').textContent='相談内容のファイルを作成しました。ダウンロードをご確認ください。お問い合わせは送信されていません。'});

// Keep the page offset and anchor positions synchronized with the fixed header.
const siteHeader=document.querySelector('.site>header');
if(siteHeader){
 const updateHeaderHeight=()=>document.documentElement.style.setProperty('--site-header-height',siteHeader.getBoundingClientRect().height+'px');
 updateHeaderHeight();
 if('ResizeObserver' in window)new ResizeObserver(updateHeaderHeight).observe(siteHeader);
 else window.addEventListener('resize',updateHeaderHeight);
}
