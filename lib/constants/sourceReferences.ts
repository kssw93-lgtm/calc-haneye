export interface SourceReference {
  effectiveDate: string;
  lastReviewedAt: string;
  sourceName: string;
  sourceUrl: string;
  scope: string;
  excludedConditions: readonly string[];
  notes: string;
}

export const PHASE_2_REVIEW_DATE = "2026-09-02";

