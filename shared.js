/* shared.js — nav toggle, chat widget, KB engine */
const PHONE = '919292026138';

/* ── NAV HAMBURGER ── */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

/* ── ACTIVE NAV LINK ── */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(l => {
    if (l.dataset.page === path) l.classList.add('active');
  });

  /* init chat */
  setTimeout(() => renderSugg('chatMsgs'), 400);
});

/* ── WHATSAPP ── */
function openWA(msg) {
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg||'Hi, I need help with health insurance')}`, '_blank');
}

/* ════════════════════════════════════════
   KNOWLEDGE BASE
════════════════════════════════════════ */
const KB = [
  { kw:['family floater','family plan','family cover','family health','floater'],
    a:`<strong>Family Floater Plan</strong><br><br>Covers all family members under one shared sum insured — typically 20–30% cheaper than separate individual plans.<br><br>Best suited for families where members are below 55 and generally healthy.`,
    wa:'Hi Rasi, I want to understand family floater health plans.' },

  { kw:['premium','cost','price','how much','charge','rate','annual','yearly'],
    a:`<strong>Premium Guide — Kerala 2024</strong><br><br>Individual (30 yrs) ₹5L cover: ~₹4,500–7,000/yr<br>Family of 4, ₹10L cover: ~₹10,000–15,000/yr<br>Senior parents ₹5L cover: ~₹18,000–28,000/yr<br><br>Exact premium depends on age, health history and insurer.`,
    wa:'Hi Rasi, I need a premium quote for health insurance.', needWA:true },

  { kw:['waiting period','wait','pre-existing','existing disease','30 day'],
    a:`<strong>Waiting Periods</strong><br><br>• 30 days — Initial waiting (accidents covered from day 1)<br>• 2–4 years — Pre-existing diseases<br>• 1–2 years — Specific illnesses (cataract, hernia…)<br>• 9 months–2 years — Maternity<br><br>Tip: Buying early means waiting periods complete before you need the coverage.` ,
    wa:'Hi Rasi, I have a question about waiting periods.' },

  { kw:['cashless','network hospital','hospital','health card','tpa'],
    a:`<strong>Cashless Treatment</strong><br><br>Go to a network hospital → show health card → TPA desk raises pre-auth → insurer approves within 2–4 hrs → hospital bills insurer directly. You pay only non-covered items.`,
    wa:'Hi Rasi, I need to know about cashless hospitals in Kerala.' },

  { kw:['claim','reimburse','documents','bills','submit'],
    a:`<strong>Claim Documents</strong><br><br>For reimbursement claims submit within 30–45 days:<br>• Original bills, receipts, prescriptions<br>• Discharge summary + lab reports<br>• Claim form + ID proof + policy copy<br>• Cancelled cheque<br><br>Rasi provides full claim assistance.`,
    wa:'Hi Rasi, I need help with insurance claim process.', needWA:true },

  { kw:['senior','elderly','parents','mother','father','old','60','65','70'],
    a:`<strong>Senior Citizen Plans</strong><br><br>Plans available for ages 60 to 80+ years. Best options: Niva Bupa Senior First, Star Senior Red Carpet (no medicals up to 75), Care Senior.<br><br>Buy earlier — more options available and premiums are lower.`,
    wa:'Hi Rasi, I need a health plan for my senior parents.', needWA:true },

  { kw:['maternity','pregnancy','delivery','baby','newborn'],
    a:`<strong>Maternity Cover</strong><br><br>Waiting period: 9 months to 2 years depending on plan.<br>Covers: Normal delivery, C-section, pre/post-natal, newborn (90 days).<br><br>Best plans: Star Comprehensive (9-month wait), Niva Bupa ReAssure.<br><br>Buy before planning a pregnancy to complete the waiting period.`,
    wa:'Hi Rasi, I need a health plan with maternity cover.', needWA:true },

  { kw:['savings','property','land','gold','assets','protect','protection'],
    a:`<strong>Protecting Your Savings</strong><br><br>Without insurance, one medical event can cost:<br>• Surgery: ₹2–10 Lakhs<br>• ICU (10 days): ₹3–8 Lakhs<br>• Cancer treatment: ₹10–30 Lakhs<br><br>Health insurance creates a financial buffer between hospital bills and your savings, land, gold and family assets.`,
    wa:'Hi Rasi, I want to protect my family savings with health insurance.' },

  { kw:['tax','80d','section 80','deduction','income tax'],
    a:`<strong>Tax Benefit — Section 80D</strong><br><br>Self + family premium: ₹25,000 deduction/year<br>Senior parents premium: ₹50,000 additional<br><strong>Total: up to ₹75,000/year</strong><br><br>At 30% tax bracket = ₹22,500 saved in taxes annually.`,
    wa:'Hi Rasi, I want to know the tax benefit on health insurance.' },

  { kw:['port','porting','switch','change insurer','transfer'],
    a:`<strong>Porting Health Insurance</strong><br><br>You can switch insurer at renewal without losing completed waiting periods (IRDAI mandated).<br><br>Apply 45 days before renewal. No-claim bonus also transfers.`,
    wa:'Hi Rasi, I want to port my existing health insurance.', needWA:true },

  { kw:['top up','topup','super top','extra cover','additional cover'],
    a:`<strong>Top-Up Plans</strong><br><br>Add ₹20L cover above a ₹5L deductible for ~₹3,000/year extra.<br><br>Best strategy: Base plan (₹5–10L) + Super Top-Up (₹20L) = high cover at low total cost.`,
    wa:'Hi Rasi, I want to know about top-up health plans.' },

  { kw:['rasi','safe assets','who are you','about','advisor','agent'],
    a:`<strong>About Rasi — SafeAssets</strong><br><br>Rasi is an IRDAI licensed health insurance advisor based in Kerala.<br><br>His mission: Help families understand health insurance <em>before</em> they need it — not after.<br><br>Zero brokerage. Same premium as buying direct. Malayalam & English support.`,
    wa:'Hi Rasi, I want to speak with you about health insurance.' },
];

function findKB(q) {
  q = q.toLowerCase();
  let best = null, score = 0;
  for (const e of KB) {
    let s = 0;
    for (const k of e.kw) { if (q.includes(k)) s += k.split(' ').length; }
    if (s > score) { score = s; best = e; }
  }
  return score > 0 ? best : null;
}

const SUGG = [
  { l:'Family floater plan', q:'What is a family floater plan?' },
  { l:'How much does it cost?', q:'How much does health insurance cost?' },
  { l:'Cashless claim', q:'How does cashless treatment work?' },
  { l:'Senior parents cover', q:'Health insurance for parents above 60' },
  { l:'Waiting period', q:'What is waiting period in health insurance?' },
  { l:'Protect savings', q:'How does insurance protect my savings?' },
  { l:'Tax benefit 80D', q:'What is the tax benefit on health insurance?' },
  { l:'Port my policy', q:'How do I port my existing health insurance?' },
];

function waBtn(prompt) {
  return `<div style="margin-top:10px"><button class="chat-wa-redirect" onclick="openWA('${prompt.replace(/'/g,"\\'")}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.862a.5.5 0 00.609.61l6.102-1.472A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.502-5.201-1.38l-.374-.217-3.876.935.966-3.788-.237-.389A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> Chat with Rasi on WhatsApp</button></div>`;
}

function addChatMsg(cid, html, role) {
  const c = document.getElementById(cid);
  const d = document.createElement('div');
  d.className = `chat-msg ${role}`;
  d.innerHTML = `<div class="chat-bubble">${html}</div><div class="chat-time">${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</div>`;
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}

function addTyping(cid) {
  const c = document.getElementById(cid);
  const d = document.createElement('div'); d.className='chat-msg bot'; d.id=cid+'-typing';
  d.innerHTML='<div class="chat-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  c.appendChild(d); c.scrollTop = c.scrollHeight;
}
function removeTyping(cid) { const e = document.getElementById(cid+'-typing'); if(e) e.remove(); }

function renderSugg(cid) {
  if (document.getElementById(cid+'-sugg')) return;
  const c = document.getElementById(cid);
  const w = document.createElement('div'); w.id = cid+'-sugg';
  w.style.cssText = 'padding:4px 0 8px';
  w.innerHTML = '<div style="font-size:11px;color:#9BBFB2;margin-bottom:8px">Tap a topic:</div><div class="chat-sugg">'+
    SUGG.map(s=>`<button class="chat-sugg-btn" onclick="chatAsk('${cid}','${s.q.replace(/'/g,"\\'")}',this)">${s.l}</button>`).join('')+'</div>';
  c.appendChild(w); c.scrollTop = c.scrollHeight;
}

function chatAsk(cid, q, btn) {
  if(btn){btn.disabled=true;btn.style.opacity='0.45';}
  const prefix = cid.startsWith('chat') ? '' : '';
  const inputId = cid === 'chatMsgs' ? 'chatInput' : cid.replace('Msgs','Input');
  document.getElementById(inputId).value = q;
  chatSend(cid, inputId, cid.replace('Msgs','SendBtn'));
}

function chatSend(msgId, inputId, btnId) {
  const inp = document.getElementById(inputId);
  const text = inp.value.trim(); if (!text) return;
  inp.value = '';
  const sugg = document.getElementById(msgId+'-sugg'); if(sugg) sugg.remove();
  addChatMsg(msgId, text, 'user');
  addTyping(msgId);
  if(btnId) document.getElementById(btnId).disabled = true;
  setTimeout(() => {
    removeTyping(msgId);
    const m = findKB(text);
    const reply = m ? m.a + waBtn(m.wa) : `I don't have that specific info right now. Rasi can answer this personally!` + waBtn(`Hi Rasi, I have a question: ${text}`);
    addChatMsg(msgId, reply, 'bot');
    if(btnId) document.getElementById(btnId).disabled = false;
    document.getElementById(inputId).focus();
    setTimeout(() => renderSugg(msgId), 500);
  }, 500);
}

/* chat panel toggle */
let chatOpen = false;
function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById('chatPanel').classList.toggle('open', chatOpen);
  document.getElementById('chatFab').style.display = chatOpen ? 'none' : 'flex';
}
