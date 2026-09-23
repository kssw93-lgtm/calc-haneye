"use client";

import { useEffect, useRef, type RefObject } from "react";

/** 마운트 시 한 번만, URL로 전달된 초기값이 있으면 폼의 현재 DOM 값으로 FormData를 만들어 자동 계산한다. */
export function useAutoCalculateOnMount(
  formRef: RefObject<HTMLFormElement | null>,
  shouldRun: boolean,
  compute: (data: FormData) => void
) {
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    if (shouldRun && formRef.current) {
      compute(new FormData(formRef.current));
    }
  }, [shouldRun, formRef, compute]);
}
