# 수업자료 사이트 작업 규칙
> `https://hw5511.github.io/ai-agent-class/`
> Last updated: 2026-03-03

---

## 1. 파일 구조 원칙

```
lecture/
├── index.html          # 단일 SPA 파일 (CSS/JS 인라인 — 절대 분리하지 않음)
├── assets/
│   ├── basic/
│   │   ├── step01/     # 01.svg, 02.svg, 03.png ...
│   │   ├── step02/
│   │   └── ...
│   └── advanced/
│       ├── step01/
│       └── ...
└── .github/workflows/deploy.yml
```

- **`index.html` 단일 파일 원칙**: CSS와 JS는 인라인으로 유지한다. 파일 분리 금지.
- **이미지 경로 규칙**: `assets/{basic|advanced}/step{NN}/{filename}` (step 번호 2자리 패딩)
- **배포 시 assets 포함 필수**: `deploy.yml`에 `cp -r assets _site/assets` 반드시 존재해야 함.

---

## 2. 데이터 수정 방법

### 강의 내용 수정 (COURSES 오브젝트)
`index.html` 내 `const COURSES = { ... }` 블록에서 수정한다.

각 session의 구조:
```js
{
  num: 1,
  title: '강의 제목',
  hours: '2시간',
  goal: '강의 전체 학습 목표',           // 슬라이드별 오버라이드 없을 때 기본값
  topics: ['주요 내용 1', '...'],         // 기본값
  practice: '실습 설명',                  // 기본값
  slides: ['01.svg', '02.png', ...],     // 이미지 파일명 배열 (빈 배열이면 플레이스홀더)
  slideDescs: [                           // 슬라이드별 우측 패널 오버라이드 (선택적)
    { goal: '...', topics: [...], practice: '...' },
    null,   // null: session 기본값 그대로 사용
    ...
  ]
}
```

### slideDescs 작성 규칙
- `slideDescs`의 인덱스는 `slides` 배열과 1:1 대응
- 특정 필드만 오버라이드 가능 (`practice: null`이면 session 기본값 사용)
- 라벨이 없으면 사이드바 서브항목에 파일명이 표시됨 → **goal은 반드시 작성** 권장

---

## 3. 이미지 투입 방법

### 스크린샷 슬라이드 (일반 이미지)
1. 해당 step 폴더에 이미지 파일 추가: `assets/basic/step01/03.png`
2. session의 `slides` 배열에 파일명 추가: `slides: ['01.svg', '02.svg', '03.png']`
3. `slideDescs`에 해당 인덱스 내용 작성
4. `git add assets/ && git commit && git push`

### 이론 슬라이드 (SVG 직접 제작)
- 사이즈: **1280 × 720px**
- **주의**: `<img>` 태그로 로드되는 SVG는 외부 이미지(PNG 등) 참조 불가
  - 외부 이미지를 포함해야 할 경우 → **base64 data URI로 embed**
  - Python으로 변환: `base64.b64encode(open('file.png','rb').read()).decode()`
- 스타일 참고: `consultation/sections/02_what_is_agent.html` (신경망), `04a_global_agents.html` (3열 카드)

---

## 4. 배포 절차

```bash
cd /c/woohee_dev/404_ai_agent_lecture/lecture
git add .
git commit -m "feat/fix/style: 변경 내용 요약"
git push origin main
```

- push 후 GitHub Actions가 자동으로 GitHub Pages 배포
- 반영까지 약 1~2분 소요
- 배포 상태 확인: `https://github.com/hw5511/ai-agent-class/actions`

---

## 5. CSS 수정 규칙

`index.html` 내 `<style>` 블록은 10개 섹션으로 구성되어 있다:

```
1. CSS Variables & Reset
2. App Shell (header, body, sidebar-toggle)
3. Sidebar
4. Nav Item (step 목록, 아코디언 서브항목)
5. Slide Area
6. Session Content (session-inner, header, body)
7. Slide Area (슬라이더, 이미지 슬라이드)
8. Desc Panel (goal-card, topic-list, practice-card)
9. Fullscreen Overlay (fs-overlay, fs-nav, fs-ui)
10. Badge Variants
```

- 새 컴포넌트 추가 시 해당 섹션 주석 블록 내에 작성
- CSS 변수(`--primary`, `--accent`, `--border` 등)를 최대한 활용할 것
- 색상 하드코딩 금지 (예외: `#ffffff`, `#000000`)

---

## 6. 상태 관리 변수

```js
let currentCourse  = 'basic';    // 'basic' | 'advanced'
let currentSession = 0;          // step 인덱스 (0-based)
let currentSlide   = 0;          // step 내 이미지 슬라이드 인덱스 (0-based)
let sidebarOpen    = true;
```

- 이 변수들이 단일 source of truth
- 화면 업데이트 함수: `applySlidePositions()`, `applyImageSlidePositions()`, `updateIndicator()`, `updateSidebarActive()`, `updateDescPanel()`
- 이동 로직은 반드시 `goToSlide(delta)` 또는 `goToSession(index, slideIndex)` 경유

---

## 7. 주요 함수 역할

| 함수 | 역할 |
|------|------|
| `renderSlides(course)` | 전체 step HTML 생성 (course 변경 시 호출) |
| `renderSidebar(course)` | 사이드바 nav 생성 + 이벤트 등록 |
| `renderDots(count)` | 하단 도트 인디케이터 재생성 |
| `applySlidePositions()` | step translateX 위치 적용 |
| `applyImageSlidePositions()` | 이미지 슬라이드 translateX 위치 적용 |
| `updateIndicator()` | 카운터/도트/버튼 disabled 갱신 |
| `updateSidebarActive()` | 사이드바 active 클래스 갱신 |
| `updateDescPanel()` | 우측 패널 내용 슬라이드에 맞게 갱신 |
| `goToSlide(delta)` | step 내 이미지 이동 (경계에서 step 전환) |
| `goToSession(index, slide)` | 특정 step + 슬라이드로 이동 |
| `openFullscreen()` / `closeFullscreen()` | 전체화면 모드 진입/종료 |
| `fsUpdateImage()` | 전체화면 모드 이미지/카운터 갱신 |

---

## 8. 콘텐츠 추가 체크리스트

새 강의 슬라이드를 추가할 때:

- [ ] `assets/{course}/step{NN}/` 폴더에 이미지 파일 추가
- [ ] `COURSES` 데이터에서 해당 session의 `slides` 배열에 파일명 추가
- [ ] `slideDescs` 배열에 슬라이드별 goal/topics/practice 작성
- [ ] 로컬에서 `index.html`을 브라우저로 열어 슬라이드 동작 확인
- [ ] `git add assets/ index.html && git commit && git push`
- [ ] GitHub Pages 배포 완료 후 사이트에서 최종 확인

---
*Last updated: 2026-03-03*
