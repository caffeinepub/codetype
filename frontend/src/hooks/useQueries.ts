import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { TestMode } from '../backend';

export function useAllTestResults() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['testResults'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestResults();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBestWPM() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['bestWPM'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBestWPM();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAverageWPM() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['averageWPM'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAverageWPM();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAverageAccuracy() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['averageAccuracy'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAverageAccuracy();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTotalTests() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['totalTests'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalTests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDailyStreaks() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['dailyStreaks'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getDailyStreaks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStreakCalendar() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ['streakCalendar'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStreakCalendar();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitTestResult() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      wpm,
      accuracy,
      testMode,
      language,
      difficulty,
      duration,
    }: {
      wpm: number;
      accuracy: number;
      testMode: TestMode;
      language: string;
      difficulty: string;
      duration: number;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitTestResult(
        BigInt(wpm),
        accuracy,
        testMode,
        language,
        difficulty,
        BigInt(duration)
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testResults'] });
      queryClient.invalidateQueries({ queryKey: ['bestWPM'] });
      queryClient.invalidateQueries({ queryKey: ['averageWPM'] });
      queryClient.invalidateQueries({ queryKey: ['averageAccuracy'] });
      queryClient.invalidateQueries({ queryKey: ['totalTests'] });
      queryClient.invalidateQueries({ queryKey: ['dailyStreaks'] });
      queryClient.invalidateQueries({ queryKey: ['streakCalendar'] });
    },
  });
}
