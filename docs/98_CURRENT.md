# Current
> Last updated: 2026-03-03

## Status
- 수업자료 SPA (`lecture/index.html`) 핵심 기능 구현 완료
- GitHub Pages 배포 운영 중: `https://hw5511.github.io/ai-agent-class/`
- 기초 step01 슬라이드 7장 데이터 완성 (01.svg~07.svg + slideDescs)
- 작업 규칙 문서 작성 완료: `docs/99_LECTURE_SITE_RULES.md`

## lecture/ 수업자료 SPA 현재 스펙

### 레이아웃
- 앱 헤더 (기초/심화 탭, 사이드바 토글)
- 좌측 사이드바 (260px, 접이식)
  - step 목록 + 아코디언 (클릭 시 슬라이드 서브목록 펼치기/접기)
  - 서브항목 라벨: `slideDescs[j].goal` 값 표시 (없으면 파일명 폴백)
  - 현재 슬라이드 accent active 표시 (화살표 이동 시에도 동기화)
- 메인 콘텐츠: `grid-template-columns: 3fr 1fr`
  - 좌 3/4: 이미지 슬라이더 (흰 배경, 테두리, translateX 전환)
  - 우 1/4: 슬라이드별 설명 패널 (학습목표 / 주요 내용 / 실습)
- 하단 슬라이드 네비게이션 (이전/다음 버튼, 도트, 카운터 `01 / N`)

### 슬라이드 데이터 구조
```js
{
  num: 1, title: '...', hours: '...', goal: '...', topics: [...], practice: '...',
  slides: ['01.svg', '02.svg', ...],      // 이미지 파일명 배열
  slideDescs: [                            // 슬라이드별 우측 패널 오버라이드 (선택적)
    { goal: '...', topics: [...], practice: '...' },
    null,  // null이면 session 기본값 사용
    ...
  ]
}
```
- 이미지 경로: `assets/{basic|advanced}/step{NN}/{filename}`
- `slideDescs` 없거나 null이면 session 기본값(goal/topics/practice) 사용

### 전체화면 슬라이드 모드
- 이미지 슬라이더 우측 하단 expand 버튼 (hover 시 표시)
- 검정 배경 오버레이, 이미지 width/height 100% + object-fit: contain
- 좌우 화살표 버튼 / 키보드 방향키로 이동
- ESC 키 또는 닫기 버튼으로 종료

### 이미지 제작 규칙
- 이론 슬라이드: SVG 직접 제작 (1280×720)
  - img 태그로 로드되는 SVG는 외부 PNG 참조 불가 → base64 data URI embed 필요
- 스크린샷 슬라이드: 실제 캡처 이미지를 `assets/{course}/step{NN}/` 폴더에 추가

---

## 진행 중인 작업
- 기초 step01 슬라이드 이미지 확보 중 (03~07: 스크린샷 캡처 대기)
- 기초 step02~08 slideDescs 데이터 작성 예정

---

## Recent Completed
- 2026-03-02: 프로젝트 구조 파악 + 4주 커리큘럼 골격 정리
- 2026-03-03: GitHub 2저장소 구조 세팅 (ai-agent-lecture, ai-agent-class)
- 2026-03-03: 상담자료 동영상 썸네일(poster=) base64 버그 수정
- 2026-03-03: 수업자료 SPA 템플릿 구축 (슬라이드 방식, 접이식 사이드바, 뷰포트 반응형)
- 2026-03-03: 이미지 레이아웃 (좌 3/4 이미지 + 우 1/4 설명), step별 이미지 폴더 생성
- 2026-03-03: step 내 이미지 슬라이드 다중 지원 + 카운터 형식 변경 + 배포 assets 포함
- 2026-03-03: 02.svg 재제작 — 상담자료 PNG 이미지 base64 embed, 3열 카드 구성
- 2026-03-03: 우측 설명 영역 너비 축소 (2fr 1fr → 3fr 1fr)
- 2026-03-03: 이미지 슬라이더 배경 흰색 + 테두리 추가
- 2026-03-03: 사이드바 step 아코디언 + 슬라이드 서브목록 (goal 라벨, active 동기화)
- 2026-03-03: 전체화면 슬라이드 모드 (expand 버튼, ESC/닫기, 화면 꽉 채움)
- 2026-03-03: slideDescs[] — 슬라이드별 우측 패널 내용 개별 설정 기능

---
*Last updated: 2026-03-03*
