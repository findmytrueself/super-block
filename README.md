# React + TypeScript + Vite

```
 "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

### 성능 개선 사항 (24.10.25)

1. 모달 통합: 승리와 패배 모달을 하나의 함수로 통합하여 중복 코드를 제거했습니다.

2. 초기 상태 복사 문제 해결: `initialBoard`를 깊은 복사하는 `getInitialBoard` 함수를 도입해, 승리 후 다시하기 버튼 클릭 시, 초기 상태가 유지되도록 수정했습니다.

3. useCallback을 통한 성능 최적화: `bfs`, `handleClick` 함수에 `useCallback`을 적용해 불필요한 함수 재생성을 방지하고 리렌더링을 최적화했습니다.

4. Deque로 시간 복잡도 개선: `Deque`를 사용해 `BFS`에서 큐의 시간 복잡도를 `O(n)`에서 `O(1)`로 줄였습니다.

5. 타입 명시화: 타입을 명확하게 정의하여 코드 가독성과 유지보수성을 개선했습니다.
