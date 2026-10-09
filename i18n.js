/* AI Basics Playground — 공용 언어 전환 스크립트
 * 사용법
 *  1) 페이지 안에서 window.DICT = { ko:{...}, en:{...} } 정의 (키 __title 은 문서 제목)
 *  2) 정적 텍스트: <span data-i18n="key"></span>
 *     속성 번역: <img data-i18n-attr="alt:key,title:key2">
 *  3) JS 동적 문구: t('key', {n: 3})  → 사전 문자열의 {n} 치환
 *  4) 언어가 바뀔 때 다시 그려야 하면 window.onLangChange = function(lang){...}
 *  5) 수준 배지: <span class="level-badge" data-level="beginner|intermediate|advanced"></span>
 */
(function () {
  var KEY = 'ai-basics-lang';
  var LEVEL = {
    ko: { beginner: '입문', intermediate: '기본', advanced: '심화', label: '난이도' },
    en: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', label: 'Level' }
  };

  function getLang() {
    try { return localStorage.getItem(KEY) || 'ko'; } catch (e) { return 'ko'; }
  }

  function dict(lang) {
    return (window.DICT && window.DICT[lang]) || {};
  }

  function t(key, vars) {
    var s = dict(getLang())[key];
    if (s === undefined) s = dict('ko')[key];
    if (s === undefined) return key;
    if (vars) {
      for (var k in vars) {
        s = s.split('{' + k + '}').join(vars[k]);
      }
    }
    return s;
  }

  function apply() {
    var lang = getLang();
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i > 0) el.setAttribute(pair.slice(0, i).trim(), t(pair.slice(i + 1).trim()));
      });
    });
    document.querySelectorAll('.level-badge[data-level]').forEach(function (el) {
      var lv = el.getAttribute('data-level');
      el.textContent = LEVEL[lang].label + ': ' + (LEVEL[lang][lv] || lv);
      el.setAttribute('data-level-class', lv);
    });
    var title = dict(lang).__title;
    if (title) document.title = title;
    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    if (typeof window.onLangChange === 'function') window.onLangChange(lang);
  }

  function setLang(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply();
  }

  function mountToggle() {
    if (document.querySelector('.lang-toggle')) return;
    var div = document.createElement('div');
    div.className = 'lang-toggle';
    div.innerHTML = '<button type="button" data-lang="ko">한국어</button><button type="button" data-lang="en">English</button>';
    div.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) setLang(b.getAttribute('data-lang'));
    });
    document.body.appendChild(div);
  }

  function injectCss() {
    var css = [
      '.lang-toggle { position: fixed; top: 12px; right: 14px; z-index: 9999; display: flex; gap: 0; border-radius: 999px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.2); font-family: "KoPub World 돋움", "Malgun Gothic", sans-serif; }',
      '.lang-toggle button { border: none; background: #f2f1df; color: #3a3a2a; font-size: .8rem; padding: 6px 12px; cursor: pointer; font-family: inherit; }',
      '.lang-toggle button.active { background: #e8a0aa; color: #fff; font-weight: 700; }',
      '.lang-toggle button:hover:not(.active) { background: #e6e3cc; }',
      '.level-badge { display: inline-block; font-size: .7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: #f2f1df; color: #3a3a2a; vertical-align: middle; white-space: nowrap; }',
      '.level-badge[data-level-class="beginner"] { background: #cfe3c6; color: #2f4d2a; }',
      '.level-badge[data-level-class="intermediate"] { background: #f3dfa0; color: #5a4a10; }',
      '.level-badge[data-level-class="advanced"] { background: #e8a0aa; color: #fff; }'
    ].join('\n');
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  window.I18N = { t: t, getLang: getLang, setLang: setLang, apply: apply };
  window.t = t;

  injectCss();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mountToggle(); apply(); });
  } else {
    mountToggle(); apply();
  }
})();
