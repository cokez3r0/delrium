// Supabase 방명록 스크립트
// _config.yml 에서 Liquid로 주입된 SUPABASE_URL, SUPABASE_ANON_KEY를 사용합니다.

(function () {
  const url = window.SUPABASE_URL;
  const key = window.SUPABASE_ANON_KEY;

  if (!url || url.includes('YOUR_PROJECT') || !key || key.includes('YOUR_ANON')) {
    document.getElementById('gb-list').innerHTML =
      '<p class="gb-empty"> </p>';
    return;
  }

  const { createClient } = supabase;
  const db = createClient(url, key);

  const list = document.getElementById('gb-list');
  const form = document.getElementById('gb-form');
  const nameInput = document.getElementById('gb-name');
  const msgInput  = document.getElementById('gb-msg');
  const submitBtn = document.getElementById('gb-submit');

  // 승인된 메시지만 불러오기 (RLS가 처리)
  async function loadMessages() {
    list.innerHTML = '<p class="gb-empty">불러오는 중...</p>';
    const { data, error } = await db
      .from('guestbook')
      .select('name, message, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      list.innerHTML = '<p class="gb-empty">메시지를 불러올 수 없습니다.</p>';
      return;
    }

    if (!data || data.length === 0) {
      list.innerHTML = '<p class="gb-empty">아직 방명록이 비어있어요. 첫 번째로 남겨보세요!</p>';
      return;
    }

    list.innerHTML = data.map(item => {
      const date = new Date(item.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric', month: '2-digit', day: '2-digit'
      });
      return `
        <div class="gb-item">
          <div class="gb-meta">
            <span class="gb-name">${escHtml(item.name)}</span>
            <span class="gb-date">${date}</span>
          </div>
          <p class="gb-msg">${escHtml(item.message)}</p>
        </div>`;
    }).join('');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    if (!name || !message) return;

    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';

    const { error } = await db.from('guestbook').insert({ name, message });

    submitBtn.disabled = false;
    submitBtn.textContent = '남기기';

    if (error) {
      alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    nameInput.value = '';
    msgInput.value = '';
    // 승인 후 보이므로 즉시 갱신 대신 안내 메시지
    const notice = document.createElement('p');
    notice.className = 'gb-empty';
    notice.textContent = '메시지가 전달되었습니다. 확인 후 게시됩니다.';
    form.after(notice);
    setTimeout(() => notice.remove(), 4000);
  });

  function escHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  loadMessages();
})();
