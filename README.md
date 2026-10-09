# AI Basics Playground

AI 기초 개념을 인터랙티브 시뮬레이션으로 체험하는 사이트입니다. 고등학교 인공지능 기초 교과, 대학 교양 AI 수업, 교사 연수 등에서 활용할 수 있는 시뮬레이션 10종을 모았습니다.

Explore core AI concepts through interactive, browser-based simulations. Ten tools covering search, logic, machine learning and deep learning, built for high-school AI courses, introductory university classes and teacher training.

🔗 **https://8laos.github.io/ai-basics/**

## 특징 / Features

- 한국어 · English 전환: 우상단 토글, 선택한 언어는 브라우저에 저장되어 모든 페이지에 적용 (Korean/English toggle, remembered across pages)
- 수준 표시 / Levels: 입문 Beginner · 기본 Intermediate · 심화 Advanced
- 설치 없이 브라우저에서 바로 실행 (No installation, runs in any modern browser)
- 교사 가이드 포함 (Teacher guide included)

## 시뮬레이션 목록 / Simulations

| 영역 / Area | 시뮬레이션 / Simulation | 수준 / Level |
|------|-----------|------|
| 탐색과 문제해결 / Search & Problem Solving | 4-Queen 탐색 시각화 (4-Queens Search) | 기본 Intermediate |
| | 탐색 알고리즘 비교 (Search Algorithm Comparison) | 심화 Advanced |
| | 강 건너기 탐색 시각화 (River Crossing Search) | 기본 Intermediate |
| 논리와 추론 / Logic & Reasoning | 명제 논리 진리표 생성기 (Truth Table Generator) | 입문 Beginner |
| | 술어 논리 추론 도구 (Predicate Logic Reasoning) | 심화 Advanced |
| 기계학습 / Machine Learning | 경사하강법 시각화 (Gradient Descent) | 심화 Advanced |
| | 오리일까 거위일까? 분류 알고리즘 비교 (Duck or Goose? Classifiers) | 입문 Beginner |
| | K-means 클러스터링 (K-means Clustering) | 기본 Intermediate |
| | 강화학습 게임 (Reinforcement Learning Game) | 입문 Beginner |
| 딥러닝 / Deep Learning | 순전파 · 역전파 시각화 (Forward & Backpropagation) | 심화 Advanced |

## 구조 / Structure

- `index.html`: 홈 (카테고리별 카드)
- `i18n.js`: 공용 언어 전환 스크립트. 각 페이지는 `window.DICT = {ko, en}` 을 정의하고 이 스크립트를 불러옴
- 각 폴더: 시뮬레이션 1종 (`4queen/`, `search-compare/`, `river-crossing/`, `truthtable/`, `predicate/`, `gradient-descent/`, `duck-or-goose/`, `kmeans/`, `nn/`)
- `guide/`: 교사 가이드
- 강화학습 게임은 별도 저장소 [reinforced-duck](https://github.com/8laos/reinforced-duck) (Unity WebGL)

## 문의 / Contact

seok1251@knue.ac.kr
